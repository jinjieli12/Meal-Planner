// Basic, privacy-friendly app. No backend required. All logic runs locally and saves to localStorage.
const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>Array.from(root.querySelectorAll(s));

// Activity multipliers (roughly Harris-Benedict style)
const ACTIVITY = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  athlete: 1.9,
};

// Goal calorie adjustments
const GOAL = {
  lose: -0.20,      // 20% deficit
  recomp: 0.00,     // maintenance
  gain: 0.12,       // 12% surplus
};

// Macro presets (grams per kg bodyweight) – then normalized to calories
const MACROS = {
  lose:   { protein_g_per_kg: 2.0, fat_min_pct: 0.25 },
  recomp: { protein_g_per_kg: 1.8, fat_min_pct: 0.28 },
  gain:   { protein_g_per_kg: 1.6, fat_min_pct: 0.30 },
};

const storeKey = "pf_nc_state_v1";

// Clear any cached meal plans that might have old meal names
function clearCachedPlans() {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.includes('meal_plan') || key.includes('nutrition_plan')) {
      localStorage.removeItem(key);
    }
  });
}

function mifflinStJeor({ sex, age, height, weight }){
  // height cm, weight kg
  const s = sex === "male" ? 5 : -161;
  return (10*weight) + (6.25*height) - (5*age) + s;
}

function calcTDEE(profile){
  const bmr = mifflinStJeor(profile);
  return bmr * ACTIVITY[profile.activity];
}

function calcTargets(profile){
  const tdee = calcTDEE(profile);
  const targetCalories = Math.round(tdee * (1 + GOAL[profile.goal]));
  // protein: grams per kg
  const preset = MACROS[profile.goal];
  const proteinG = Math.round(preset.protein_g_per_kg * profile.weight);
  const proteinCals = proteinG * 4;
  // fat: at least preset % of calories
  const fatCalsMin = Math.max(0.25, preset.fat_min_pct) * targetCalories;
  let fatG = Math.round(fatCalsMin / 9);
  let fatCals = fatG * 9;
  // carbs: remainder
  let carbsCals = Math.max(0, targetCalories - proteinCals - fatCals);
  let carbsG = Math.round(carbsCals / 4);

  // Add BMI calculation
  const bmi = profile.weight / Math.pow(profile.height / 100, 2);
  const bmiCategory = getBMICategory(bmi);

  return { 
    tdee: Math.round(tdee), 
    calories: targetCalories, 
    proteinG, 
    fatG, 
    carbsG,
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory
  };
}

function getBMICategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function convertToMetricForCalculation(heightValue, secondValue, weightLbs, isImperial = false) {
  if (isImperial) {
    // heightValue = feet, secondValue = inches
    const heightCm = (heightValue * 12 + secondValue) * 2.54;
    const weightKg = weightLbs * 0.453592;
    return { height: Math.round(heightCm), weight: Math.round(weightKg * 10) / 10 };
  } else {
    // heightValue = height in cm, weightLbs = weight in LB
    const weightKg = weightLbs * 0.453592;
    return { height: heightValue, weight: Math.round(weightKg * 10) / 10 };
  }
}

function loadState(){
  try { return JSON.parse(localStorage.getItem(storeKey) || "null"); } catch { return null; }
}
function saveState(s){
  localStorage.setItem(storeKey, JSON.stringify(s));
}

function restrictionPredicate(restrictions){
  return (item)=>{
    if(!restrictions || restrictions.length===0) return true;
    // For each restriction, the item must be compatible
    return restrictions.every(r => item.tags.includes(r) || !tagsConflict(r, item.tags));
  };
}

function tagsConflict(restriction, itemTags){
  // Simple rules: if restriction says vegan but item is not vegan, block
  const req = restriction;
  const t = new Set(itemTags);
  if(req === "vegan") return !t.has("vegan");
  if(req === "vegetarian") return !(t.has("vegetarian") || t.has("vegan"));
  if(req === "gluten_free") return !t.has("gluten_free");
  if(req === "dairy_free") return !t.has("dairy_free");
  if(req === "nut_free") return !t.has("nut_free");
  if(req === "halal") return !t.has("halal");
  if(req === "kosher") return !t.has("kosher");
  return false;
}

function chooseMealsForDay(calories, restrictions, usedMeals = new Set()){
  // support predicate or array of restriction tags
  const pred = (typeof restrictions === "function") ? restrictions : restrictionPredicate(restrictions);
  let meals = MEALS_DB.filter(m => pred ? pred(m) : true);
  
  if(meals.length < 8) {
    console.warn("Very restrictive selection; using all available meals.");
    meals = MEALS_DB; // Fallback to all meals
  }

  function pickBestMatch(arr, predFn, target){
    const candidates = arr.filter(predFn).filter(m => !usedMeals.has(m.name));
    if(candidates.length === 0) {
      const fallback = arr.filter(predFn)[0];
      if(!fallback) return null;
      usedMeals.add(fallback.name);
      return scalePortionIfNeeded(fallback, target);
    }

    // Use getMealCalories for sorting to avoid field-name mismatch
    candidates.sort((a, b) => Math.abs((getMealCalories(a) || 0) - target) - Math.abs((getMealCalories(b) || 0) - target));
    const selected = candidates[0];
    usedMeals.add(selected.name);
    return scalePortionIfNeeded(selected, target);
  }

  function scalePortionIfNeeded(meal, target) {
    const kcal = getMealCalories(meal) || 0;
    // If meal is significantly higher than target, scale it down (but not below 0.6)
    if (kcal > target * 1.4) {
      const scale = Math.max(0.6, target / Math.max(1, kcal));
      return cloneWithScaledNutrition(meal, scale);
    }
    // return a shallow clone but normalize name
    return { ...meal, name: baseMealName(meal.name) };
  }

  // Adjust distribution for low-calorie diets
  const isLowCalorie = calories < 1200;
  const targets = isLowCalorie ? {
    breakfast: Math.round(calories * 0.20),
    lunch: Math.round(calories * 0.35),
    dinner: Math.round(calories * 0.35),
    snack1: Math.round(calories * 0.05),
    snack2: Math.round(calories * 0.05),
  } : {
    breakfast: Math.round(calories * 0.25),
    lunch: Math.round(calories * 0.35),
    dinner: Math.round(calories * 0.30),
    snack1: Math.round(calories * 0.05),
    snack2: Math.round(calories * 0.05),
  };

  const day = { items: [] };

  const breakfast = pickBestMatch(meals, m => m.type === "breakfast", targets.breakfast);
  const lunch = pickBestMatch(meals, m => m.type === "lunch", targets.lunch);
  const dinner = pickBestMatch(meals, m => m.type === "dinner", targets.dinner);
  const snack1 = pickBestMatch(meals, m => m.type === "snack", targets.snack1);
  const snack2 = pickBestMatch(meals, m => m.type === "snack", targets.snack2);

  [breakfast, lunch, dinner, snack1, snack2].forEach(meal => { if(meal) day.items.push(meal); });

  // Try to adjust portions to hit the day's target
  try {
    const adjusted = adjustMealPortionsForDay(day.items, calories);
    day.items = adjusted;
  } catch (e) {
    console.warn("Portion adjustment failed, using unadjusted items:", e);
  }

  // Calculate totals using getMealCalories and normalized macro fields
  const totals = day.items.reduce((acc,m)=>{
    acc.cal += getMealCalories(m);
    acc.p += (m.protein ?? m.protein_g ?? m.p ?? 0);
    acc.c += (m.carbs ?? m.carbs_g ?? m.c ?? 0);
    acc.f += (m.fat ?? m.fat_g ?? m.f ?? 0);
    return acc;
  }, {cal:0,p:0,c:0,f:0});

  totals.accuracy = calories ? Math.max(0, Math.round((1 - Math.abs(totals.cal - calories) / Math.max(1, calories)) * 100)) : 0;
  day.totals = totals;

  // Debug: show day target vs produced total (helps investigate low match)
  console.debug(`chooseMealsForDay: target=${calories}, produced=${totals.cal}, accuracy=${totals.accuracy}%`, day.items.map(it=>({name:it.name, kcal:getMealCalories(it)})));

  return day;
}

function buildMealPlan(targets, restrictions, perDayCals, numDays){
  const days = [];
  const usedMeals = new Set(); // Track meals across all days for variety
  
  for(let i=0;i<numDays;i++){
    const cals = perDayCals && perDayCals[i] ? perDayCals[i] : targets.calories;
    days.push(chooseMealsForDay(cals, restrictions, usedMeals));
  }
  return days;
}

function makeWorkoutSplit({ days, experience, equipment, goal }){
  // Simple template generator
  const pool = WORKOUTS_DB.filter(w => 
    (w.minDays <= days && days <= w.maxDays) &&
    (w.levels.includes(experience)) &&
    (w.equipment.includes(equipment) || w.equipment.includes("any"))
  );

  if(pool.length === 0){
    return [{ day: "Full Body", blocks: [{title:"Walking", moves:[{name:"Brisk Walk", sets:"30–45 min"}]}]}];
  }

  // Choose the best-matching template
  const plan = pool[0];
  return plan.days.slice(0, days);
}

function renderNutrition(targets, plan){
  const sum = plan.reduce((acc, d)=>{
    acc.cal += d.totals.cal; acc.p += d.totals.p; acc.c += d.totals.c; acc.f += d.totals.f; 
    return acc;
  }, {cal:0,p:0,c:0,f:0});
  
  // Use actual plan length for averages
  const planLength = plan.length || 1;
  const avgDaily = Math.round(sum.cal / planLength);

  // Better accuracy: average of per-day accuracy values (already computed when day made)
  const avgAccuracy = Math.round(plan.reduce((s,d)=> s + (d.totals?.accuracy || 0), 0) / planLength);

  $("#nutrition-summary").innerHTML = `
    <div class="kpi">
      <span>Target: <b>${targets.calories}</b> kcal/day</span>
      <span>Average: <b>${avgDaily}</b> kcal/day</span>
      <span>Accuracy: <b>${avgAccuracy}%</b></span>
      <span>Protein: <b>${targets.proteinG}</b> g</span>
      <span>Carbs: <b>${targets.carbsG}</b> g</span>
      <span>Fat: <b>${targets.fatG}</b> g</span>
      ${targets.bmi ? `<span>BMI: <b>${targets.bmi}</b> (${targets.bmiCategory})</span>` : ''}
    </div>
  `;

  const container = $("#meal-plan");
  container.innerHTML = "";
  plan.forEach((d, i) => {
    const div = document.createElement("div");
    div.className = "plan-card";
    const accuracy = d.totals.accuracy || Math.round((1 - Math.abs(d.totals.cal - targets.calories) / Math.max(1, targets.calories)) * 100);
    const accuracyColor = accuracy >= 90 ? '#10b981' : accuracy >= 80 ? '#f59e0b' : '#ef4444';
    
    const list = d.items.map(m => `<li class="meal-item clickable" onclick="openRecipeModal('${m.name.replace(/'/g, "\\'").replace(/"/g, '\\"')}')"><span class="meal-name">${m.name}</span><span class="meal-nutrition"> — ${m.calories} kcal · P${m.protein} C${m.carbs} F${m.fat}</span></li>`).join("");
    div.innerHTML = `
      <h3>Day ${i+1} <span style="color: ${accuracyColor}; font-size: 12px;">(${accuracy}% target match)</span></h3>
      <p><b>Daily total:</b> ${d.totals.cal} kcal · P${d.totals.p} C${d.totals.c} F${d.totals.f}</p>
      <ul>${list}</ul>
    `;
    container.appendChild(div);
  });
}

function renderGroceryList(plan){
  // Aggregate ingredients across all days
  const tally = new Map();
  plan.forEach(d => d.items.forEach(m => {
    (m.ingredients||[]).forEach(ing => {
      const key = (ing.name + '|' + (ing.unit||'')).toLowerCase();
      const prev = tally.get(key) || {name: ing.name, qty: 0, unit: ing.unit||''};
      prev.qty += Number(ing.qty) || 0;
      tally.set(key, prev);
    });
  }));
  const items = Array.from(tally.values()).sort((a,b)=>a.name.localeCompare(b.name));
  const box = document.getElementById("grocery-list");
  box.innerHTML = "";
  if(items.length === 0){
    box.innerHTML = "<p class='small'>No ingredients found. Generate a meal plan first.</p>";
    return;
  }
  items.forEach(it => {
    const row = document.createElement("div");
    row.className = "grocery-item";
    row.innerHTML = `
      <span class="grocery-name">${it.name}</span>
      <span class="grocery-qty">${Math.round(it.qty*100)/100} ${it.unit||""}</span>
    `;
    box.appendChild(row);
  });
  return items;
}

function exportGroceryCSV(items){
  const rows = [["Item","Quantity","Unit"]].concat(items.map(i=>[i.name, i.qty, i.unit||""]));
  exportCSV(rows, "grocery-list.csv");
}

function buildCyclingTargets(baseCalories){
  // 7-day zigzag ±10%: +10, -10, +7, -7, +5, -5, base
  const deltas = [0.10, -0.10, 0.07, -0.07, 0.05, -0.05, 0.00];
  return deltas.map(d => Math.round(baseCalories * (1+d)));
}

function renderWorkouts(workouts, profile, targets){
  $("#workout-summary").innerHTML = `
    <div class="kpi">
      <span>Days/week: <b>${profile.days}</b></span>
      <span>Experience: <b>${profile.experience}</b></span>
      <span>Equipment: <b>${profile.equipment}</b></span>
      <span>Goal: <b>${profile.goal}</b></span>
    </div>
  `;

  const container = $("#workout-plan");
  container.innerHTML = "";
  workouts.forEach((day, i) => {
    const div = document.createElement("div");
    div.className = "plan-card";
    const blocks = day.blocks.map(b => `
      <p><b>${b.title}:</b></p>
      <ul>
        ${b.moves.map(m => `<li>${m.name} — ${m.sets}${m.tip ? ` <span class="small">(${m.tip})</span>`: ""}</li>`).join("")}
      </ul>
    `).join("");
    div.innerHTML = `<h3>Day ${i+1}: ${day.day}</h3>${blocks}`;
    container.appendChild(div);
  });
}

function exportCSV(rows, filename){
  const csv = rows.map(r => r.map(cell => `"${String(cell).replaceAll('"','""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], {type:"text/csv;charset=utf-8;"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(url), 1000);
}

function onGenerate(customTarget) {
  try {
    // Check if required databases are loaded
    if (typeof MEALS_DB === 'undefined' || typeof WORKOUTS_DB === 'undefined') {
      throw new Error("Meal and workout databases not loaded. Please refresh the page.");
    }
    
    const fd = new FormData(document.getElementById("profile-form"));
    const sex = fd.get("sex");
    const age = Number(fd.get("age"));
    const units = fd.get("units");
    const activity = fd.get("activity");
    const goal = fd.get("goal");
    const restrictions = $$("input[name='restrictions']:checked").map(i=>i.value);
    const cycling = !!fd.get('calorie_cycling');
    const experience = fd.get("experience");
    const equipment = fd.get("equipment");
    let days = Number(fd.get("days"));
    if (!Number.isInteger(days) || days < 1) days = 1; // allow single-day plans

    let height, weight;
    
    if (units === "imperial") {
      const feet = Number(fd.get("height-ft")) || 0;
      const inches = Number(fd.get("height-in")) || 0;
      const weightLbs = Number(fd.get("weight-lbs")) || 0;
      
      // allow realistic lower pound values (e.g. ~50 lb)
      if (feet < 4 || weightLbs < 30) {
        throw new Error("Please enter valid height and weight values.");
      }
      
      const converted = convertToMetricForCalculation(feet, inches, weightLbs, true);
      height = converted.height;
      weight = converted.weight;
    } else {
      // Metric system now uses LB for weight, cm for height
      height = Number(fd.get("height"));
      const weightLbs = Number(fd.get("weight"));
      const converted = convertToMetricForCalculation(height, 0, weightLbs, false);
      weight = converted.weight; // Convert LB to kg for calculations
    }

    if (!height || !weight || !age) {
      throw new Error("Please fill in all required fields. Height: " + height + ", Weight: " + weight + ", Age: " + age);
    }

    if (height < 100 || height > 300) {
      throw new Error("Invalid height value: " + height + " cm");
    }

    if (weight < 20 || weight > 300) {
      throw new Error("Invalid weight value: " + weight + " kg");
    }

    console.log("Profile data:", { sex, age, height, weight, activity, goal, units });

    const profile = { sex, age, height, weight, activity, goal, restrictions, experience, equipment, days, units };
    let targets = calcTargets(profile);

    // honor explicit user target if provided (recompute carbs/fat to match)
    const userTarget = Number(fd.get("target_calories")) || 0;
    if (Number.isFinite(userTarget) && userTarget > 0) {
      // keep protein grams per kg from goal preset, recompute fat and carbs to fit calories
      const preset = MACROS[goal] || MACROS.recomp;
      const proteinG = Math.round(preset.protein_g_per_kg * weight);
      const proteinCals = proteinG * 4;
      const fatCalsMin = Math.max(0.25, preset.fat_min_pct) * userTarget;
      const fatG = Math.round(fatCalsMin / 9);
      const fatCals = fatG * 9;
      const carbsCals = Math.max(0, userTarget - proteinCals - fatCals);
      const carbsG = Math.round(carbsCals / 4);
      targets = { ...targets, calories: Math.round(userTarget), proteinG, fatG, carbsG };
    }
    const perDay = cycling ? buildCyclingTargets(targets.calories) : null;
    
    console.log("Calculated targets:", targets);
    
    // Show loading state
    $("#nutrition-summary").innerHTML = "<div class='loading'>Generating your personalized plan...</div>";
    
    setTimeout(() => {
      const mealPlan = buildMealPlan(targets, restrictions, perDay, days);
      const workouts = makeWorkoutSplit({ days, experience, equipment, goal });

      renderNutrition(targets, mealPlan);
      renderWorkouts(workouts, profile, targets);
      const groceryItems = renderGroceryList(mealPlan);
      saveState({ profile, targets, mealPlan, workouts, groceryItems });
      
      // Show success message
      showNotification("✅ Plan generated successfully!", "success");
    }, 500);
    
  } catch (error) {
    console.error("Error generating plan:", error);
    showNotification("❌ Error: " + error.message, "error");
  }
}

function onLoadSample(){
  randomizeProfileAndGenerate();
}

function onReset(){
  localStorage.removeItem(storeKey);
  location.reload();
}

function onExportMeals(){
  const s = loadState();
  if(!s || !s.mealPlan) return alert("Generate a plan first.");
  const rows = [["Day","Item","Calories","Protein(g)","Carbs(g)","Fat(g)"]];
  s.mealPlan.forEach((d,i)=>{
    d.items.forEach(m=> rows.push([i+1, m.name, m.calories, m.protein, m.carbs, m.fat]));
  });
  exportCSV(rows, "meal-plan.csv");
}

function onExportWorkouts(){
  const s = loadState();
  if(!s || !s.workouts) return alert("Generate a plan first.");
  const rows = [["Day","Block","Exercise","Prescription","Tip"]];
  s.workouts.forEach((d,i)=>{
    d.blocks.forEach(b=>{
      b.moves.forEach(m=> rows.push([i+1, b.title, m.name, m.sets, m.tip||""]));
    });
  });
  exportCSV(rows, "workout-plan.csv");
}

function hydrateFromState(){
  const s = loadState();
  if(!s) return;
  renderNutrition(s.targets, s.mealPlan);
  renderWorkouts(s.workouts, s.profile, s.targets);
  if(s.mealPlan) renderGroceryList(s.mealPlan);
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 1000;
    padding: 12px 20px; border-radius: 6px; font-weight: 500;
    background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
    color: white; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transform: translateX(400px); transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Slide in
  setTimeout(() => notification.style.transform = "translateX(0)", 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => document.body.removeChild(notification), 300);
  }, 3000);
}

function openRecipeModal(mealName) {
  console.log("Opening recipe modal for:", mealName);
  
  // Use baseMealName helper to remove any portion tags and normalize
  const cleanedName = baseMealName(mealName);
  console.log("Base meal name after cleanup:", cleanedName);
  
  let meal = MEALS_DB.find(m => baseMealName(m.name) === cleanedName);
  if (!meal) {
    // Try exact match fallback
    meal = MEALS_DB.find(m => m.name === mealName) || MEALS_DB.find(m => m.name.toLowerCase() === cleanedName.toLowerCase());
  }

  if (!meal) {
    console.log("Available meal names:", MEALS_DB.map(m => m.name));
    console.log("Searched for:", mealName, "and", cleanedName);
    showNotification("❌ Recipe not found: " + mealName, "error");
    return;
  }
  
  console.log("Found recipe for:", cleanedName, meal);
  
  // Add default instructions if none exist
  if (!meal.instructions || meal.instructions.length === 0) {
    meal.instructions = [
      "Gather all ingredients listed above",
      "Follow standard preparation methods for each ingredient",
      "Combine ingredients as appropriate for this meal type",
      "Season to taste and serve"
    ];
  }
  
  // Add default image if none exists
  if (!meal.image) {
    const imageMap = {
      breakfast: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop",
      lunch: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      dinner: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
      snack: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop"
    };
    meal.image = imageMap[meal.type] || imageMap.lunch;
  }

  // Populate modal content - show original meal name for scaled portions
  const displayName = mealName.includes('(small portion)') ? `${meal.name} (Small Portion)` : 
                     mealName.includes('(large portion)') ? `${meal.name} (Large Portion)` : meal.name;
  document.getElementById('recipe-title').textContent = displayName;
  document.getElementById('recipe-calories').textContent = `${meal.calories} kcal`;
  document.getElementById('recipe-protein').textContent = `P: ${meal.protein}g`;
  document.getElementById('recipe-carbs').textContent = `C: ${meal.carbs}g`;
  document.getElementById('recipe-fat').textContent = `F: ${meal.fat}g`;
  
  // Set image
  const recipeImage = document.getElementById('recipe-image');
  if (recipeImage) {
    // Attach fallback handler first
    applyImageFallback(recipeImage, meal);
    if (meal.image) {
      console.log('Setting recipe image src to:', meal.image);
      // Set a blank src then assign to ensure onerror will fire if remote is blocked
      recipeImage.src = '';
      recipeImage.style.display = 'block';
      recipeImage.src = meal.image;
    } else {
      recipeImage.style.display = 'none';
    }
  }
  
  // Set tags
  const tagsContainer = document.getElementById('recipe-tags');
  tagsContainer.innerHTML = meal.tags.map(tag => `<span class="recipe-tag">${tag.replace('_', '-')}</span>`).join('');
  
  // Set ingredients
  const ingredientsList = document.getElementById('recipe-ingredients');
  ingredientsList.innerHTML = meal.ingredients.map(ing => 
    `<li>${ing.qty} ${ing.unit} ${ing.name}</li>`
  ).join('');
  
  // Set instructions
  const instructionsList = document.getElementById('recipe-instructions');
  if (meal.instructions && meal.instructions.length > 0) {
    instructionsList.innerHTML = meal.instructions.map(instruction => 
      `<li>${instruction}</li>`
    ).join('');
  } else {
    instructionsList.innerHTML = '<li>Recipe instructions not available</li>';
  }
  
  // Set tips
  const tipsSection = document.getElementById('tips-section');
  const recipeTips = document.getElementById('recipe-tips');
  if (meal.tips) {
    recipeTips.textContent = meal.tips;
    tipsSection.style.display = 'block';
  } else {
    tipsSection.style.display = 'none';
  }
  
  // Show modal
  document.getElementById('recipe-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeRecipeModal() {
  document.getElementById('recipe-modal').style.display = 'none';
  document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById('recipe-modal');
  if (event.target === modal) {
    closeRecipeModal();
  }
}

function updateWeightNote(bmi, category) {
  // ensure there's a visible note element next to the weight input
  const weightInput = $("#weight-input") || $("input[name='weight']");
  if (!weightInput) return;

  let note = document.getElementById("weight-note");
  if (!note) {
    note = document.createElement("div");
    note.id = "weight-note";
    note.style.cssText = "margin-top:6px; font-size:13px; color:#cbd5e1;";
    // insert after the input
    weightInput.parentNode?.insertBefore(note, weightInput.nextSibling);
  }

  // show weight in lbs for clarity
  const lbs = Number(weightInput.value) || 0;
  let text = `${lbs} lb`;
  if (typeof bmi === "number" && !Number.isNaN(bmi)) {
    text += ` — BMI ${ (Math.round(bmi*10)/10).toFixed(1) } (${category})`;
  } else {
    text += ` — ${category || ''}`;
  }

  // color coding based on category
  let color = "#9ca3af"; // default muted
  if (category === "Underweight") color = "#3b82f6";
  else if (category === "Normal weight") color = "#10b981";
  else if (category === "Overweight") color = "#f59e0b";
  else if (category === "Obese") color = "#ef4444";

  note.textContent = text;
  note.style.color = color;

  // update compact status label (separate element)
  setWeightStatus(category);
}

function setWeightStatus(category) {
  const weightInput = $("#weight-input") || $("input[name='weight']");
  if (!weightInput) return;

  let status = document.getElementById("weight-status");
  if (!status) {
    status = document.createElement("div");
    status.id = "weight-status";
    status.style.cssText = "margin-top:4px; font-size:13px; font-weight:600;";
    weightInput.parentNode?.insertBefore(status, weightInput.nextSibling?.nextSibling || weightInput.nextSibling);
  }

  if (!category) {
    status.textContent = "";
    return;
  }

  status.textContent = category;
  let color = "#9ca3af";
  if (category === "Underweight") color = "#3b82f6";
  else if (category === "Normal weight") color = "#10b981";
  else if (category === "Overweight") color = "#f59e0b";
  else if (category === "Obese") color = "#ef4444";
  status.style.color = color;
}

function updateBMI() {
  const units = $("#units-select")?.value || "metric";
  let height, weight;
  
  if (units === "imperial") {
    const feet = Number($("input[name='height-ft']")?.value) || 0;
    const inches = Number($("input[name='height-in']")?.value) || 0;
    const weightLbs = Number($("input[name='weight-lbs']")?.value) || 0;
    
    if (feet > 0 && weightLbs > 0) {
      const converted = convertToMetricForCalculation(feet, inches, weightLbs, true);
      height = converted.height;
      weight = converted.weight;
    }
  } else {
    height = Number($("input[name='height']")?.value) || 0;
    const weightLbs = Number($("input[name='weight']")?.value) || 0;
    
    if (height > 0 && weightLbs > 0) {
      const converted = convertToMetricForCalculation(height, 0, weightLbs, false);
      weight = converted.weight; // Convert LB to kg for BMI calculation
    }
  }
  
  const bmiDisplay = $("#bmi-display");
  const bmiValue = $("#bmi-value");
  const bmiCategory = $("#bmi-category");
  
  if (height > 0 && weight > 0 && bmiDisplay && bmiValue && bmiCategory) {
    const bmi = weight / Math.pow(height / 100, 2);
    const category = getBMICategory(bmi);
    
    bmiValue.textContent = (Math.round(bmi * 10) / 10).toFixed(1);
    bmiCategory.textContent = category;
    bmiDisplay.style.display = "block";
    
    // Color coding
    const color = bmi < 18.5 ? "#3b82f6" : bmi < 25 ? "#10b981" : bmi < 30 ? "#f59e0b" : "#ef4444";
    bmiValue.style.color = color;

    // update the weight note next to input
    updateWeightNote(bmi, category);

    // also update compact weight-status (ensures it updates immediately)
    setWeightStatus(category);
  } else if (bmiDisplay) {
    bmiDisplay.style.display = "none";
    // still update weight note without BMI
    updateWeightNote(undefined, "");
    setWeightStatus("");
  }
}

// Normalize/override meal images so each meal shows a relevant photo based on its name.
function normalizeMealImages() {
  if (!Array.isArray(MEALS_DB)) return;
  MEALS_DB.forEach(meal => {
    try {
      // Only generate a search-based image if the meal doesn't already have a curated image
      if (!meal.image || String(meal.image).trim() === '') {
        // Build a short query from the meal name (remove parenthetical info and special chars)
        let q = meal.name.replace(/\s*\(.*?\)\s*/g, ''); // remove parentheses
        q = q.replace(/&/g, 'and');
        q = q.replace(/[^\w\s,-]/g, ''); // remove punctuation
        // Use first 2-3 meaningful words as query terms
        const parts = q.split(/\s+/).filter(Boolean).slice(0,3);
        const query = parts.join(',');
        // Use Unsplash source to return a relevant image
        meal.image = `https://source.unsplash.com/400x300/?${encodeURIComponent(query)}`;
      }
    } catch (err) {
      console.warn('Could not normalize image for meal', meal && meal.name, err);
    }
  });
}

// Category fallback images (used when an image fails to load)
const FALLBACK_IMAGES = {
  breakfast: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
  lunch: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop",
  dinner: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
  snack: "https://images.unsplash.com/photo-1543353071-087092ec393f?w=400&h=300&fit=crop",
  default: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop"
};

function applyImageFallback(imgEl, meal) {
  if (!imgEl) return;
  imgEl.onerror = function() {
    // Prevent infinite loop if fallback also errors
    imgEl.onerror = null;
    const type = (meal && meal.type) ? meal.type : 'default';
    imgEl.src = FALLBACK_IMAGES[type] || FALLBACK_IMAGES.default;
    imgEl.alt = meal && meal.name ? meal.name + ' (image unavailable)' : 'Recipe image';
  };
}

// --- START: helper to normalize meal names and avoid duplicate portion tags ---
function baseMealName(name) {
  if (!name) return "";
  // remove all occurrences of portion/size parentheticals like "(small)", "(small portion)", "(large portion)", etc.
  const cleaned = name.replace(/\s*\((?:small|large|small portion|large portion)\)\s*/gi, '');
  // also remove any remaining empty parentheses and normalize whitespace
  return cleaned.replace(/\(\s*\)/g, '').replace(/\s{2,}/g, ' ').trim();
}
// New helper: add a single portion tag (always cleans first)
function withPortionTag(name, size) {
  const base = baseMealName(name);
  if (size === 'small') return `${base} (small portion)`;
  if (size === 'large') return `${base} (large portion)`;
  return base;
}
// --- END helper ---

// --- START: new helpers to support user-provided daily target and portion scaling ---
function getMealCalories(meal) {
  return meal.kcal ?? meal.calories ?? meal.cal ?? meal.calories_kcal ?? 0;
}

function cloneWithScaledNutrition(meal, scale) {
  // clone meal and scale calories + macros if present
  const scaled = { ...meal };
  const kcal = getMealCalories(meal);
  if (kcal) scaled.kcal = Math.max(0, Math.round(kcal * scale));
  if (meal.protein || meal.protein_g || meal.p) {
    const p = meal.protein ?? meal.protein_g ?? meal.p;
    scaled.protein = Math.max(0, Math.round(p * scale));
  }
  if (meal.carbs || meal.carbs_g || meal.c) {
    const c = meal.carbs ?? meal.carbs_g ?? meal.c;
    scaled.carbs = Math.max(0, Math.round(c * scale));
  }
  if (meal.fat || meal.fat_g || meal.f) {
    const f = meal.fat ?? meal.fat_g ?? meal.f;
    scaled.fat = Math.max(0, Math.round(f * scale));
  }

  // annotate name to show portion change, but avoid duplicating tags
  if (scale < 0.96) {
    scaled.name = withPortionTag(meal.name, 'small');
  } else if (scale > 1.04) {
    scaled.name = withPortionTag(meal.name, 'large');
  } else {
    scaled.name = baseMealName(meal.name);
  }

  // preserve original image & recipe keys
  return scaled;
}

/**
 * Adjust portions for a day's meals so the total calories get close to target.
 * - Uses proportional scaling with min/max caps to avoid unrealistic tiny portions.
 * - Falls back to simple proportional scaling if needed.
 */
function adjustMealPortionsForDay(dayMeals, targetCalories) {
  const MIN_SCALE = 0.6; // don't scale below 60% of original
  const MAX_SCALE = 1.6; // increased limit (was 1.4) so high-target plans can scale up more

  const currentTotal = dayMeals.reduce((sum, m) => sum + getMealCalories(m), 0);
  if (!currentTotal || !targetCalories) return dayMeals.map(m => ({ ...m }));

  // desired scale (proportional)
  let scale = targetCalories / currentTotal;

  // clamp scale
  if (scale < MIN_SCALE) scale = MIN_SCALE;
  if (scale > MAX_SCALE) scale = MAX_SCALE;

  // Apply proportional scale as first attempt
  let scaledMeals = dayMeals.map(m => cloneWithScaledNutrition(m, scale));

  // If proportional scaling didn't meet target (because we clamped), try greedy adjust...
  const scaledTotal = scaledMeals.reduce((s, m) => s + getMealCalories(m), 0);
  if (Math.abs(scaledTotal - targetCalories) / targetCalories <= 0.06) {
    return scaledMeals;
  }

  // Greedy adjust: tweak the largest meals within min/max to close the gap
  const mealsBySize = scaledMeals.slice().sort((a, b) => getMealCalories(b) - getMealCalories(a));
  let remainingDiff = targetCalories - scaledTotal;

  for (let i = 0; i < mealsBySize.length && Math.abs(remainingDiff) > 5; i++) {
    const meal = mealsBySize[i];
    const orig = dayMeals.find(m => baseMealName(m.name) === baseMealName(meal.name)) || dayMeals[i];
    const origKcal = getMealCalories(orig);
    if (!origKcal) continue;

    const currentKcal = getMealCalories(meal);
    const minKcal = Math.round(origKcal * MIN_SCALE);
    const maxKcal = Math.round(origKcal * MAX_SCALE);

    let desiredKcal = currentKcal + remainingDiff;
    if (desiredKcal < minKcal) desiredKcal = minKcal;
    if (desiredKcal > maxKcal) desiredKcal = maxKcal;

    const newScale = desiredKcal / origKcal;
    const updated = cloneWithScaledNutrition(orig, newScale);

    const idx = scaledMeals.findIndex(m => baseMealName(m.name) === baseMealName(orig.name));
    if (idx >= 0) scaledMeals[idx] = updated;

    remainingDiff = targetCalories - scaledMeals.reduce((s, m) => s + getMealCalories(m), 0);
  }

  return scaledMeals;
}
// --- END: new helpers ---


// --- START: Randomized "Load Sample" generator ---
function randomizeProfileAndGenerate() {
  const profileForm = document.getElementById('profile-form');
  if (!profileForm) return;

  // helpers
  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Random demographics
  const sex = randChoice(['female','male']);
  const age = randInt(18, 65);

  // Force imperial units for clearer weight display (lbs)
  const units = 'imperial';

  // generate a realistic height in cm and weight in kg, then convert
  const heightCm = randInt(150, 195);
  const weightKg = Math.round((randInt(50, 100) + Math.random()) * 10) / 10;

  // convert to imperial
  const totalInches = Math.round(heightCm / 2.54);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches - feet * 12;
  const weightLbs = Math.round(weightKg * 2.20462);

  // Set values robustly (support both name and id selectors)
  function setInput(selector, value) {
    const el = document.querySelector(selector);
    if (!el) return;
    if (el.type === 'checkbox') {
      el.checked = !!value;
    } else {
      el.value = value;
    }
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // Fill basic fields
  setInput("select[name='sex']", sex);
  setInput("#sex-select", sex);
  setInput("input[name='age']", age);
  setInput("#age-input", age);

  // Force units to imperial so weight shows as lbs
  setInput("select[name='units']", units);
  setInput("#units-select", units);

  // Populate imperial height/weight fields
  setInput("input[name='height-ft']", feet);
  setInput("input[name='height-in']", inches);
  setInput("input[name='weight-lbs']", weightLbs);

  // Also set the main visible weight input to lbs so users see pounds
  setInput("input[name='weight']", weightLbs);
  setInput("#weight-input", weightLbs);

  // Set metric height field too (keeps internal logic safe)
  setInput("input[name='height']", heightCm);
  setInput("#height-input", heightCm);

  // Activity, goal, experience, equipment
  setInput("select[name='activity']", randChoice(['sedentary','light','moderate','active','athlete']));
  setInput("#activity-select", document.querySelector("select[name='activity']")?.value);
  setInput("select[name='goal']", randChoice(['lose','recomp','gain']));
  setInput("#goal-select", document.querySelector("select[name='goal']")?.value);
  setInput("select[name='experience']", randChoice(['beginner','intermediate','advanced']));
  setInput("#experience-select", document.querySelector("select[name='experience']")?.value);
  setInput("select[name='equipment']", randChoice(['none','dumbbells','gym']));
  setInput("#equipment-select", document.querySelector("select[name='equipment']")?.value);

  // Days and target calories
  // allow 1-day sample plans
  const days = randInt(1, 7);
  setInput("input[name='days']", days);
  setInput("#days-input", days);

  // 50% chance to set a custom calorie target
  if (Math.random() < 0.5) {
    const goal = document.querySelector("select[name='goal']")?.value || 'recomp';
    let min = 1400, max = 3200;
    if (goal === 'lose') { min = 1200; max = 2200; }
    if (goal === 'gain') { min = 2000; max = 3600; }
    setInput("input[name='target_calories']", randInt(min, max));
    setInput("#target-calories-input", document.querySelector("input[name='target_calories']")?.value || document.querySelector("#target-calories-input")?.value);
  } else {
    setInput("input[name='target_calories']", "");
    setInput("#target-calories-input", "");
  }

  // Random restrictions: pick 0-3
  const restrictionBoxes = Array.from(document.querySelectorAll("input[name='restrictions']"));
  restrictionBoxes.forEach(b => { b.checked = false; b.dispatchEvent(new Event('change',{bubbles:true})); });
  const count = randInt(0, Math.min(3, restrictionBoxes.length));
  for (let i = 0; i < count; i++) {
    const choices = restrictionBoxes.filter(b => !b.checked);
    if (!choices.length) break;
    const pick = choices[Math.floor(Math.random()*choices.length)];
    pick.checked = true;
    pick.dispatchEvent(new Event('change',{bubbles:true}));
  }

  // Calorie cycling random
  const cycling = Math.random() < 0.3;
  setInput("input[name='calorie_cycling']", cycling);
  setInput("#calorie-cycling-checkbox", cycling);

  // Ensure units change handler runs so imperial inputs become visible
  const unitsSelect = document.querySelector("select[name='units']") || document.getElementById("units-select");
  if (unitsSelect) unitsSelect.dispatchEvent(new Event('change', { bubbles: true }));

  // Update BMI/weight note immediately for clarity
  setTimeout(() => updateBMI(), 80);

  // Small delay then submit to allow UI update
  setTimeout(() => {
    if (typeof profileForm.requestSubmit === 'function') profileForm.requestSubmit();
    else profileForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  }, 220);
}
// ...existing code...
document.addEventListener("DOMContentLoaded", ()=>{
  console.log("DOM loaded, attaching event listeners...");

  // remove restrictive max on weight input (show lbs)
  const weightEl = document.querySelector("#weight-input, input[name='weight']");
  if (weightEl) {
    weightEl.removeAttribute("max");              // allow >200 lbs
    weightEl.setAttribute("placeholder", "lbs");  // clarify units
  }

  // Normalize weight label/unit text to pounds (lb) so UI reflects weight input in lbs
  try {
    // Replace explicit label text like "Weight (kg)" -> "Weight (lb)"
    const weightLabels = Array.from(document.querySelectorAll('label')).filter(l => /\bweight\b/i.test(l.textContent) && /\(kg\)/i.test(l.textContent));
    weightLabels.forEach(l => l.textContent = l.textContent.replace(/\(kg\)/ig, "(lb)"));

    // Replace any other text nodes showing "(kg)" with "(lb)" (safe, lightweight: only leaf nodes)
    const leafNodes = Array.from(document.querySelectorAll('body *')).filter(n => n.children.length === 0 && /\(kg\)/i.test(n.textContent || ""));
    leafNodes.forEach(n => n.textContent = n.textContent.replace(/\(kg\)/ig, "(lb)"));
  } catch (e) {
    console.warn("Could not update weight unit labels:", e);
  }

  // Normalize meal images on load so visuals match names
  normalizeMealImages();
  
  // Clear any cached meal plans that might have outdated meal names
  clearCachedPlans();

  const form = $("#profile-form");
  if (form) {
    console.log("Form found, attaching submit listener");
    // ensure we grab the new input once DOM is ready
    const targetCaloriesInput = $("#target-calories-input"); // or document.getElementById if $ helper not present

    // Update submit handler to pass custom calories into generation
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const custom = parseInt(targetCaloriesInput.value, 10);
      const customTarget = Number.isInteger(custom) && custom > 0 ? custom : undefined;
      onGenerate(customTarget);
    });
  } else {
    console.error("Profile form not found!");
  }
  $("#load-sample").addEventListener("click", onLoadSample);
  $("#reset").addEventListener("click", onReset);
  $("#export-meals").addEventListener("click", onExportMeals);
  $("#export-workouts").addEventListener("click", onExportWorkouts);
  const exportG = document.getElementById("export-grocery");
  if(exportG){ exportG.addEventListener("click", ()=>{
    const s = loadState();
    const items = s && s.groceryItems ? s.groceryItems : renderGroceryList(s?.mealPlan || []);
    if(!items || items.length===0) return alert("Generate a plan first.");
    exportGroceryCSV(items);
  }); }
  const printBtn = document.getElementById("print-plans");
  if(printBtn){ printBtn.addEventListener("click", ()=>window.print()); }
  
  // Units toggle handler
  const unitsSelect = $("#units-select");
  if(unitsSelect) {
    unitsSelect.addEventListener("change", (e) => {
      const isImperial = e.target.value === "imperial";
      const metricInputs = $("#metric-inputs");
      const imperialInputs = $("#imperial-inputs");
      if(metricInputs) metricInputs.style.display = isImperial ? "none" : "flex";
      if(imperialInputs) imperialInputs.style.display = isImperial ? "flex" : "none";
      updateBMI();
    });
  }
  
  // BMI calculation on input change
  ["height", "weight", "height-ft", "height-in", "weight-lbs"].forEach(name => {
    const input = $("input[name='" + name + "']");
    if(input) input.addEventListener("input", updateBMI);
  });
  
  updateBMI(); // Initial calculation
  hydrateFromState();
  normalizeMealImages(); // Ensure meal images are set
});

// New helper: decide if a meal is suitable when user selects "Diabetes"
function isDiabeticFriendly(meal) {
  // prefer meals with moderate/low carbs per serving
  const carbs = Number(meal.carbs ?? meal.c ?? 0);
  // treat explicit tag 'diabetic_friendly' as safe
  if (meal.tags && meal.tags.includes('diabetic_friendly')) return true;
  // allow most meals under or equal to 50g carbs per serving
  if (carbs > 0 && carbs <= 50) return true;
  // allow some high-protein meals regardless of carbs
  const protein = Number(meal.protein ?? meal.p ?? 0);
  if (protein >= 25 && carbs <= 60) return true;
  // otherwise treat as not ideal
  return false;
}

// Build a predicate from selected restrictions array (keeps existing behavior and adds diabetes rule)
function buildRestrictionsPredicate(selectedRestrictions = []) {
  // return null (no predicate) when none selected
  if (!selectedRestrictions || !selectedRestrictions.length) return null;

  return function predicate(meal) {
    // basic tag-based filtering
    for (const r of selectedRestrictions) {
      if (!r) continue;
      // skip tag checks for 'diabetic' because we apply special rule below
      if (r === 'diabetic') continue;
      if (Array.isArray(meal.tags) && !meal.tags.includes(r)) {
        // allow meal if it's not explicitly incompatible (we assume tags mark suitability);
        // if you prefer strict tagging, invert this logic.
        // continue -- don't block by default
      }
    }

    // extra rule for diabetes: prefer diabetic-friendly meals and avoid sugary/high-carb snacks
    if (selectedRestrictions.includes('diabetic')) {
      return isDiabeticFriendly(meal);
    }

    return true;
  };
}

// Example usage: where generate/buildMealPlan is called, pass the predicate
// ...existing code where you collect restrictions...
// const selectedRestrictions = Array.from(document.querySelectorAll("input[name='restrictions']:checked")).map(i=>i.value);
// const restrictionsPredicate = buildRestrictionsPredicate(selectedRestrictions);
// const plan = buildMealPlan(days, targetCalories, restrictionsPredicate);

// helper: normalize macro fields and round
function getMealMacros(meal){
  const p = meal.protein ?? meal.protein_g ?? meal.p ?? 0;
  const c = meal.carbs   ?? meal.carbs_g   ?? meal.c ?? 0;
  const f = meal.fat     ?? meal.fat_g     ?? meal.f ?? 0;
  return { p: Math.round(Number(p)||0), c: Math.round(Number(c)||0), f: Math.round(Number(f)||0) };
}

// small helper to escape text nodes when injecting HTML
function escapeHtml(str){
  return String(str || "").replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[ch]);
}

// Replace or augment wherever you render the small macro badges for each meal.
// Example: update the function that renders a single meal item/card.
// If your code has a renderMealItem / renderMealCard function, replace the macro block with the snippet below.

function renderMealItem(meal){
  // ...existing code that creates `el` for the meal...
  // assume `el` is the root element for this meal card/list item
  // remove any old macro-only nodes first (defensive)
  const old = el.querySelectorAll('.meal-macros, .meal-name-pill');
  old.forEach(n => n.remove());

  const macros = getMealMacros(meal);
  const html = `
    <div class="meal-meta">
      <div class="meal-name-pill">${escapeHtml(meal.name)}</div>
      <div class="meal-macros">
        <span class="pill">P: ${macros.p}g</span>
        <span class="pill">C: ${macros.c}g</span>
        <span class="pill">F: ${macros.f}g</span>
      </div>
    </div>
  `;
  // append the new block into the meal element (adjust insert location as needed)
  el.insertAdjacentHTML('beforeend', html);

  // ...existing code to attach click handlers, images, etc...
}
