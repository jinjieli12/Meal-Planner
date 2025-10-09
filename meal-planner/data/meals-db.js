// Simple meal database with tags for restrictions
// Each item: { name, type, calories, protein, carbs, fat, tags, ingredients: [{name, qty, unit}], instructions, tips, image }
const MEALS_DB = [
  {name:"Greek Yogurt Parfait", type:"breakfast", calories:380, protein:28, carbs:45, fat:9, tags:["vegetarian"],
    ingredients:[
      {name:"Greek yogurt", qty:1, unit:"cup"},
      {name:"Granola", qty:0.5, unit:"cup"},
      {name:"Mixed berries", qty:1, unit:"cup"},
      {name:"Honey", qty:1, unit:"tbsp"}
    ],
    instructions:[
      "Add half the Greek yogurt to a bowl or glass",
      "Layer with half the berries and granola",
      "Repeat layers with remaining ingredients",
      "Drizzle honey on top and serve immediately"
    ],
    tips: "For meal prep, keep granola separate until serving to maintain crunch.",
    image: "data/images/greek_yogurt_parfait.jpg"
  },

  {name:"Oats + Berries + PB", type:"breakfast", calories:420, protein:17, carbs:58, fat:14, tags:["vegetarian","dairy_free","vegan"],
    ingredients:[
      {name:"Rolled oats", qty:0.75, unit:"cup"},
      {name:"Mixed berries", qty:1, unit:"cup"},
      {name:"Natural peanut butter", qty:1, unit:"tbsp"},
      {name:"Unsweetened almond milk", qty:1, unit:"cup"},
      {name:"Chia seeds", qty:1, unit:"tsp"}
    ],
    instructions:[
      "Combine oats and almond milk in a bowl",
      "Cook until creamy",
      "Stir in peanut butter and top with berries"
    ],
    tips: "For overnight oats mix and refrigerate overnight.",
    image: "data/images/oats_berries_pb.jpg"
  },

  {name:"Tofu Scramble Wrap", type:"breakfast", calories:440, protein:32, carbs:46, fat:14, tags:["vegan","vegetarian","dairy_free","halal","kosher","diabetic_friendly"],
    ingredients:[
      {name:"Firm tofu", qty:200, unit:"g"},
      {name:"Large flour tortilla", qty:1, unit:"pcs"},
      {name:"Fresh spinach", qty:1, unit:"cup"},
      {name:"Bell pepper", qty:0.5, unit:"cup"},
      {name:"Nutritional yeast", qty:2, unit:"tbsp"},
      {name:"Turmeric", qty:0.5, unit:"tsp"},
      {name:"Olive oil", qty:1, unit:"tsp"}
    ],
    instructions:[
      "Crumble tofu and sauté with turmeric and nutritional yeast",
      "Add vegetables until wilted, warm tortilla and assemble"
    ],
    tips: "Press tofu to remove excess water for better texture.",
    image: "data/images/tofu_scramble_wrap.jpg"
  },

  {name:"Egg & Avocado Toast", type:"breakfast", calories:410, protein:20, carbs:35, fat:18, tags:["vegetarian","diabetic_friendly"],
    ingredients:[
      {name:"Eggs", qty:2, unit:"pcs"},
      {name:"Whole-grain bread", qty:2, unit:"slices"},
      {name:"Avocado", qty:0.5, unit:"pcs"},
      {name:"Salt and pepper", qty:1, unit:"pinch"},
      {name:"Olive oil", qty:1, unit:"tsp"}
    ],
    instructions:[
      "Toast bread, cook eggs to preference, mash avocado and assemble",
    ],
    tips: "Add red pepper flakes for extra flavor.",
    image: "data/images/egg_avocado_toast.jpg"
  },

  {name:"Chia Pudding", type:"snack", calories:220, protein:8, carbs:22, fat:12, tags:["vegan","vegetarian","gluten_free","dairy_free","halal","kosher","diabetic_friendly"],
    ingredients:[
      {name:"Chia seeds", qty:3, unit:"tbsp"},
      {name:"Unsweetened almond milk", qty:1, unit:"cup"},
      {name:"Vanilla extract", qty:0.25, unit:"tsp"},
      {name:"Maple syrup or honey (optional)", qty:1, unit:"tsp"},
      {name:"Fresh berries (optional)", qty:0.25, unit:"cup"}
    ],
    instructions:[
      "Combine ingredients, whisk, refrigerate until thickened, top with berries"
    ],
    tips: "Blend milk and chia briefly for creamier texture.",
    image: "data/images/chia_pudding.jpg"
  },

  {name:"Apple & Almonds", type:"snack", calories:200, protein:6, carbs:18, fat:12, tags:["vegan","vegetarian","gluten_free","dairy_free","halal","kosher"],
    ingredients:[
      {name:"Medium apple", qty:1, unit:"pcs"},
      {name:"Raw almonds", qty:28, unit:"g"}
    ],
    instructions:[
      "Wash and slice apple, measure almonds, enjoy"
    ],
    tips: "Keep skin on for extra fiber.",
    image: "data/images/apple_almonds.jpg"
  },

  {name:"Cottage Cheese Cup", type:"snack", calories:180, protein:24, carbs:8, fat:4, tags:["vegetarian","gluten_free","diabetic_friendly"],
    ingredients:[
      {name:"Low-fat cottage cheese", qty:1, unit:"cup"},
      {name:"Black pepper", qty:1, unit:"pinch"},
      {name:"Fresh chives", qty:1, unit:"tsp"}
    ],
    instructions:[
      "Scoop cottage cheese, add pepper and herbs, serve chilled"
    ],
    tips: "Add fruit for a sweet option.",
    image: "data/images/cottage_cheese_cup.jpg"
  },

  {name:"Protein Shake (plant)", type:"snack", calories:160, protein:25, carbs:6, fat:3, tags:["vegan","vegetarian","gluten_free","dairy_free","halal","kosher","diabetic_friendly"],
    ingredients:[
      {name:"Plant protein powder", qty:1, unit:"scoop"},
      {name:"Unsweetened plant milk", qty:350, unit:"ml"},
      {name:"Banana (optional)", qty:0.5, unit:"pcs"},
      {name:"Frozen berries (optional)", qty:0.5, unit:"cup"}
    ],
    instructions:[
      "Blend protein powder with milk and optional add-ins until smooth"
    ],
    tips: "Adjust milk for thinner or thicker texture.",
    image: "data/images/protein_shake_plant.jpg"
  },

  {name:"Grilled Chicken Bowl", type:"lunch", calories:550, protein:45, carbs:60, fat:14, tags:["gluten_free","halal","kosher","diabetic_friendly"],
    ingredients:[
      {name:"Chicken breast", qty:150, unit:"g"},
      {name:"Jasmine rice", qty:1, unit:"cup"},
      {name:"Broccoli", qty:0.5, unit:"cup"},
      {name:"Bell peppers", qty:0.5, unit:"cup"}
    ],
    instructions:[
      "Season and grill chicken, cook rice, steam vegetables and assemble"
    ],
    tips: "Let chicken rest before slicing.",
    image: "data/images/grilled_chicken.jpg"
  },

  {name:"Hummus & Veg Pita", type:"lunch", calories:480, protein:18, carbs:64, fat:14, tags:["vegan","vegetarian","dairy_free","halal","kosher"],
    ingredients:[
      {name:"Whole wheat pita", qty:1, unit:"pcs"},
      {name:"Hummus", qty:0.5, unit:"cup"},
      {name:"Cucumber", qty:0.5, unit:"cup"},
      {name:"Cherry tomatoes", qty:0.5, unit:"cup"}
    ],
    instructions:[
      "Warm pita, spread hummus, stuff with vegetables and serve"
    ],
    image: "data/images/hummus_veg_pita.jpg"
  },

  {name:"Buddha Bowl (tofu)", type:"lunch", calories:560, protein:32, carbs:68, fat:18, tags:["vegan","vegetarian","dairy_free","halal","kosher"],
    ingredients:[
      {name:"Firm tofu", qty:150, unit:"g"},
      {name:"Brown rice", qty:0.75, unit:"cup"},
      {name:"Broccoli", qty:0.5, unit:"cup"},
      {name:"Sweet potato", qty:0.5, unit:"cup"}
    ],
    instructions:[
      "Cook rice, roast vegetables, pan-fry tofu and assemble bowl with dressing"
    ],
    image: "data/images/buddha_bowl_tofu.jpg"
  },

  {name:"Shrimp Stir-fry", type:"dinner", calories:520, protein:38, carbs:58, fat:12, tags:["dairy_free","halal","kosher","diabetic_friendly"],
    ingredients:[
      {name:"Large shrimp", qty:160, unit:"g"},
      {name:"Rice noodles", qty:120, unit:"g"},
      {name:"Bell peppers", qty:1, unit:"cup"},
      {name:"Snap peas", qty:1, unit:"cup"}
    ],
    instructions:[
      "Cook noodles, stir-fry shrimp and vegetables, toss with sauce and serve"
    ],
    image: "data/images/shrimp_stir_fry.jpg"
  },

  {name:"Small Apple", type:"snack", calories:80, protein:0, carbs:21, fat:0, tags:["vegetarian","vegan","gluten_free"],
    ingredients:[
      {name:"Fresh apple", qty:1, unit:"small"},
      {name:"Cinnamon", qty:1, unit:"pinch"}
    ],
    instructions:["Wash and eat or slice and sprinkle cinnamon"],
    image: "data/images/small_apple.jpg"
  },

  {name:"Celery & PB", type:"snack", calories:90, protein:4, carbs:6, fat:6, tags:["vegetarian","vegan","gluten_free","diabetic_friendly"],
    ingredients:[
      {name:"Fresh celery stalks", qty:3, unit:"pcs"},
      {name:"Natural peanut butter", qty:1, unit:"tsp"},
      {name:"Raisins", qty:1, unit:"tbsp"}
    ],
    instructions:[
      "Trim celery, fill with peanut butter and top with raisins"
    ],
    image: "data/images/celery_pb.jpg"
  },

  {name:"Greek Yogurt (small)", type:"breakfast", calories:150, protein:15, carbs:12, fat:4, tags:["vegetarian","diabetic_friendly"],
    ingredients:[
      {name:"Greek yogurt", qty:0.5, unit:"cup"},
      {name:"Berries", qty:0.5, unit:"cup"}
    ],
    instructions:["Scoop yogurt, top with berries and serve"],
    image: "data/images/greek_yogurt_small.jpg"
  },

  {name:"Egg White Scramble", type:"breakfast", calories:120, protein:16, carbs:3, fat:2, tags:["vegetarian","diabetic_friendly"],
    ingredients:[
      {name:"Egg whites", qty:4, unit:"pcs"},
      {name:"Spinach", qty:1, unit:"cup"}
    ],
    instructions:[
      "Cook spinach then add egg whites and scramble until set"
    ],
    image: "data/images/egg_white_scramble.jpg"
  },

  {name:"Rice Cake & Hummus", type:"snack", calories:110, protein:4, carbs:18, fat:3, tags:["vegetarian","vegan"],
    ingredients:[
      {name:"Whole grain rice cakes", qty:2, unit:"pcs"},
      {name:"Hummus", qty:2, unit:"tbsp"},
      {name:"Cucumber (sliced)", qty:0.25, unit:"cup", optional:true},
      {name:"Paprika or za'atar", qty:0.25, unit:"tsp", optional:true}
    ],
    instructions:[
      "Spread hummus on rice cakes and add optional veggies and spices"
    ],
    image: "data/images/rice_cake_hummus.jpg"
  },

  {name:"Pasta Marinara", type:"dinner", calories:480, protein:18, carbs:78, fat:12, tags:["vegetarian"],
    ingredients:[
      {name:"Whole wheat pasta", qty:100, unit:"g"},
      {name:"Marinara sauce", qty:0.5, unit:"cup"},
      {name:"Mozzarella cheese", qty:30, unit:"g"},
      {name:"Fresh basil", qty:5, unit:"leaves"}
    ],
    instructions:[
      "Cook pasta, toss with sauce and cheese, top with basil"
    ],
    image: "data/images/pasta_marinara.jpg"
  },

  {name:"Cottage Cheese (small)", type:"snack", calories:100, protein:12, carbs:4, fat:2, tags:["vegetarian","gluten_free"],
    ingredients:[
      {name:"Low-fat cottage cheese", qty:0.5, unit:"cup"},
      {name:"Chives (optional)", qty:0.5, unit:"tsp"},
      {name:"Fresh berries (optional)", qty:2, unit:"tbsp"}
    ],
    instructions:[
      "Spoon cottage cheese into a bowl and add optional toppings"
    ],
    image: "data/images/cottage_cheese_cup.jpg"
  },

  /* Higher-calorie meals (help matching large daily targets) */
  {name:"Steak & Roasted Potatoes", type:"dinner", calories:820, protein:55, carbs:60, fat:38, tags:["gluten_free"],
    ingredients:[
      {name:"Beef steak (sirloin)", qty:200, unit:"g"},
      {name:"Baby potatoes", qty:250, unit:"g"},
      {name:"Olive oil", qty:1, unit:"tbsp"},
      {name:"Garlic", qty:1, unit:"clove"}
    ],
    instructions:[
      "Roast potatoes and pan-sear steak, rest and serve"
    ],
    image: "data/images/steak_potatoes.jpg"
  },

  {name:"Beef Chili (large)", type:"dinner", calories:780, protein:46, carbs:70, fat:30, tags:["gluten_free"],
    ingredients:[
      {name:"Lean ground beef", qty:300, unit:"g"},
      {name:"Kidney beans", qty:1, unit:"cup"},
      {name:"Tomato passata", qty:1, unit:"cup"},
      {name:"Onion", qty:0.5, unit:"cup"}
    ],
    instructions:[
      "Cook beef with vegetables and simmer with beans and tomato until thick"
    ],
    image: "data/images/beef_chili.jpg"
  },

  {name:"Peanut Butter Banana Smoothie (large)", type:"snack", calories:650, protein:35, carbs:60, fat:30, tags:["vegetarian"],
    ingredients:[
      {name:"Natural peanut butter", qty:3, unit:"tbsp"},
      {name:"Banana", qty:1.5, unit:"pcs"},
      {name:"Whole milk or plant milk", qty:500, unit:"ml"}
    ],
    instructions:[
      "Blend all ingredients until smooth"
    ],
    image: "data/images/peanut_butter_banana_smoothie.jpg"
  },

  {name:"Salmon & Quinoa Power Bowl", type:"lunch", calories:720, protein:48, carbs:62, fat:28, tags:["gluten_free"],
    ingredients:[
      {name:"Salmon fillet", qty:180, unit:"g"},
      {name:"Cooked quinoa", qty:1, unit:"cup"},
      {name:"Avocado", qty:0.5, unit:"pcs"}
    ],
    instructions:[
      "Cook quinoa, cook salmon and assemble bowl with avocado and vegetables"
    ],
    image: "data/images/salmon_quinoa_power_bowl.jpg"
  },

  {name:"Loaded Chicken Pasta", type:"dinner", calories:900, protein:60, carbs:95, fat:32, tags:["vegetarian_optional"],
    ingredients:[
      {name:"Pasta", qty:180, unit:"g"},
      {name:"Grilled chicken", qty:200, unit:"g"},
      {name:"Cream or full-fat sauce", qty:0.5, unit:"cup"}
    ],
    instructions:[
      "Cook pasta, toss with sauce and chicken, top with parmesan"
    ],
    image: "data/images/loaded_chicken_pasta.jpg"
  },

  {name:"Loaded Burrito Bowl", type:"dinner", calories:860, protein:50, carbs:90, fat:30, tags:["gluten_free_optional"],
    ingredients:[
      {name:"Cooked rice", qty:1, unit:"cup"},
      {name:"Seasoned ground meat", qty:150, unit:"g"},
      {name:"Black beans", qty:0.5, unit:"cup"},
      {name:"Guacamole", qty:0.5, unit:"cup"}
    ],
    instructions:[
      "Layer rice, beans, meat and toppings, serve warm"
    ],
    image: "data/images/loaded_burrito_bowl.jpg"
  },

  {name:"Avocado Chickpea Salad", type:"lunch", calories:360, protein:12, carbs:30, fat:20, tags:["vegan","vegetarian","gluten_free","diabetic_friendly"],
    ingredients:[
      {name:"Ripe avocado", qty:0.5, unit:"pcs"},
      {name:"Canned chickpeas (drained)", qty:0.5, unit:"cup"},
      {name:"Cherry tomatoes", qty:0.5, unit:"cup"},
      {name:"Cucumber", qty:0.5, unit:"cup"}
    ],
    instructions:[
      "Combine and dress with lemon and olive oil"
    ],
    image: "data/images/avocado_chickpea_salad.jpg"
  },

  {name:"Quinoa & Black Bean Bowl", type:"lunch", calories:480, protein:16, carbs:64, fat:12, tags:["vegetarian","vegan","gluten_free"],
    ingredients:[
      {name:"Cooked quinoa", qty:1, unit:"cup"},
      {name:"Black beans", qty:0.5, unit:"cup"},
      {name:"Corn", qty:0.25, unit:"cup"},
      {name:"Avocado", qty:0.5, unit:"pcs"}
    ],
    instructions:[
      "Combine ingredients and toss with lime and cumin"
    ],
    image: "data/images/quinoa_black_bean_bowl.jpg"
  },

  {name:"Salmon & Veggie Plate", type:"dinner", calories:520, protein:38, carbs:30, fat:26, tags:["gluten_free","halal","diabetic_friendly"],
    ingredients:[
      {name:"Salmon fillet", qty:150, unit:"g"},
      {name:"Sweet potato (roasted)", qty:0.5, unit:"cup"},
      {name:"Asparagus", qty:0.5, unit:"cup"}
    ],
    instructions:[
      "Roast vegetables and cook salmon, plate and serve"
    ],
    image: "data/images/salmon_veggie_plate.jpg"
  },

  {name:"Veggie Omelette", type:"breakfast", calories:300, protein:22, carbs:6, fat:20, tags:["vegetarian","gluten_free","diabetic_friendly"],
    ingredients:[
      {name:"Whole eggs", qty:2, unit:"pcs"},
      {name:"Egg white", qty:1, unit:"pcs"},
      {name:"Mushrooms", qty:0.25, unit:"cup"},
      {name:"Spinach", qty:0.5, unit:"cup"}
    ],
    instructions:[
      "Whisk eggs, sauté veggies, pour eggs and fold when set"
    ],
    image: "data/images/veggie_omelette.jpg"
  },

  {name:"Banana Oat Energy Bites", type:"snack", calories:140, protein:4, carbs:22, fat:5, tags:["vegetarian","gluten_free"],
    ingredients:[
      {name:"Rolled oats", qty:0.5, unit:"cup"},
      {name:"Ripe banana (mashed)", qty:0.5, unit:"pcs"},
      {name:"Natural peanut butter", qty:1, unit:"tbsp"}
    ],
    instructions:[
      "Mix, roll into balls, chill to set"
    ],
    image: "data/images/banana_oat_energy_bites.jpg"
  },

  {name:"Turkey Wrap (small)", type:"lunch", calories:360, protein:28, carbs:28, fat:12, tags:["gluten_free_optional","diabetic_friendly"],
    ingredients:[
      {name:"Whole-grain wrap", qty:1, unit:"pcs"},
      {name:"Lean turkey breast", qty:80, unit:"g"},
      {name:"Lettuce", qty:0.5, unit:"cup"}
    ],
    instructions:[
      "Assemble wrap with fillings and slice in half"
    ],
    image: "data/images/turkey_wrap_small.jpg"
  },
  {name:"Chicken Caesar Salad", type:"lunch", calories:520, protein:42, carbs:20, fat:30, tags:["gluten_free_optional"],
    ingredients:[
      {name:"Grilled chicken breast", qty:150, unit:"g"},
      {name:"Romaine lettuce", qty:2, unit:"cups"},
      {name:"Parmesan", qty:20, unit:"g"},
      {name:"Caesar dressing (light)", qty:2, unit:"tbsp"},
      {name:"Croutons (optional)", qty:1, unit:"handful", optional:true}
    ],
    instructions:[
      "Toss lettuce with dressing, top with sliced grilled chicken and parmesan.",
      "Add croutons if desired and serve immediately."
    ],
    tips: "Use yogurt-based dressing to reduce fat. Swap chicken for chickpeas to make vegetarian.",
    image: "data/images/chicken_caesar_salad.jpg"
  },
  {name:"Beef & Veg Stir-fry", type:"dinner", calories:680, protein:48, carbs:54, fat:26, tags:["gluten_free_optional"],
    ingredients:[
      {name:"Lean beef strips", qty:200, unit:"g"},
      {name:"Mixed stir-fry vegetables", qty:2, unit:"cups"},
      {name:"Soy sauce or tamari", qty:2, unit:"tbsp"},
      {name:"Sesame oil", qty:1, unit:"tbsp"},
      {name:"Garlic & ginger", qty:1, unit:"tsp"}
    ],
    instructions:[
      "Sear beef strips in hot pan, remove and stir-fry vegetables in sesame oil.",
      "Return beef to pan, add soy, garlic and ginger; toss and serve over rice or noodles."
    ],
    tips: "Use tamari for gluten-free. Add extra veggies to increase fiber and volume.",
    image: "data/images/beef_veg_stir_fry.jpg"
  },
  {name:"Lentil & Spinach Curry", type:"dinner", calories:460, protein:24, carbs:56, fat:12, tags:["vegan","vegetarian","gluten_free"],
    ingredients:[
      {name:"Red lentils", qty:0.75, unit:"cup"},
      {name:"Chopped tomatoes", qty:1, unit:"cup"},
      {name:"Spinach", qty:1, unit:"cup"},
      {name:"Onion & spices", qty:1, unit:"tbsp"},
      {name:"Coconut milk (light)", qty:0.25, unit:"cup", optional:true}
    ],
    instructions:[
      "Sauté onion and spices, add lentils and tomatoes and simmer until tender.",
      "Stir in spinach and coconut milk to finish, serve with rice or flatbread."
    ],
    tips: "Make a big batch — flavors deepen overnight. Good diabetic-friendly option when served with salad.",
    image: "data/images/lentil_spinach_curry.jpg"
  },
  {name:"Protein Pancakes", type:"breakfast", calories:350, protein:28, carbs:30, fat:10, tags:["vegetarian"],
    ingredients:[
      {name:"Protein powder", qty:1, unit:"scoop"},
      {name:"Oats (blended)", qty:0.5, unit:"cup"},
      {name:"Eggs", qty:2, unit:"pcs"},
      {name:"Baking powder", qty:0.5, unit:"tsp"},
      {name:"Milk or water", qty:0.25, unit:"cup"}
    ],
    instructions:[
      "Blend all ingredients into a batter, cook on a non-stick pan until golden on both sides.",
      "Serve with berries or a thin smear of nut butter."
    ],
    tips: "Use water or unsweetened milk for lower carbs. Top with fresh berries for fiber.",
    image: "data/images/protein_pancakes.jpg"
  },
  {name:"Greek Salad with Feta", type:"lunch',", calories:360, protein:12, carbs:14, fat:26, tags:["vegetarian","gluten_free"],
    ingredients:[
      {name:"Cucumber", qty:1, unit:"cup"},
      {name:"Cherry tomatoes", qty:0.5, unit:"cup"},
      {name:"Red onion", qty:0.25, unit:"cup"},
      {name:"Feta cheese", qty:50, unit:"g"},
      {name:"Olive oil & oregano", qty:1, unit:"tbsp"}
    ],
    instructions:[
      "Combine vegetables and feta, dress with olive oil, lemon and oregano and serve chilled."
    ],
    tips: "Add grilled chicken or chickpeas to increase protein.",
    image: "data/images/greek_salad_feta.jpg"
  },
  {name:"Pork Fried Rice", type:"dinner", calories:700, protein:36, carbs:82, fat:22, tags:[],
    ingredients:[
      {name:"Cooked rice (day-old)", qty:1.5, unit:"cups"},
      {name:"Lean pork (diced)", qty:150, unit:"g"},
      {name:"Frozen peas & carrots", qty:0.75, unit:"cup"},
      {name:"Egg", qty:1, unit:"pcs"},
      {name:"Soy sauce", qty:1, unit:"tbsp"}
    ],
    instructions:[
      "Stir-fry pork until cooked, push to side and scramble egg, add rice and vegetables, season and toss to combine."
    ],
    tips: "Use brown rice to increase fiber. Great for using leftovers.",
    image: "data/images/pork_fried_rice.jpg"
  },
  {name:"Trail Mix (handful)", type:"snack", calories:220, protein:6, carbs:20, fat:14, tags:["vegetarian","gluten_free"],
    ingredients:[
      {name:"Mixed nuts", qty:0.25, unit:"cup"},
      {name:"Dried fruit (small)", qty:2, unit:"tbsp"},
      {name:"Pumpkin seeds", qty:1, unit:"tbsp"}
    ],
    instructions:[
      "Combine nuts, seeds and a small amount of dried fruit. Store in airtight container."
    ],
    tips: "Portion control important — high calorie-dense snack.",
    image: "data/images/trail_mix.jpg"
  },
  {name:"Chocolate Avocado Mousse (small)", type:"dessert", calories:190, protein:3, carbs:14, fat:14, tags:["vegan","gluten_free"],
    ingredients:[
      {name:"Ripe avocado", qty:0.5, unit:"pcs"},
      {name:"Unsweetened cocoa powder", qty:1, unit:"tbsp"},
      {name:"Maple syrup or sweetener", qty:1, unit:"tsp", optional:true},
      {name:"Vanilla extract", qty:0.25, unit:"tsp"}
    ],
    instructions:[
      "Blend all ingredients until smooth and chill before serving."
    ],
    tips: "Use a sugar-free sweetener for diabetic-friendly dessert.",
    image: "data/images/chocolate_avocado_mousse.jpg"
  },

  /* Extra high-calorie / energy-dense meals to improve target matching */
  ,
  {name:"Double Cheeseburger & Fries (large)", type:"dinner", calories:1180, protein:64, carbs:78, fat:68, tags:[],
    ingredients:[
      {name:"Beef patties (2)", qty:300, unit:"g"},
      {name:"Cheddar cheese", qty:60, unit:"g"},
      {name:"Burger buns (2)", qty:2, unit:"pcs"},
      {name:"French fries (oven)", qty:250, unit:"g"}
    ],
    instructions:[
      "Cook patties to preferred doneness, melt cheese on top.",
      "Toast buns, assemble burger with desired condiments and serve with fries."
    ],
    tips: "Reduce portion size or choose leaner patties to lower calories if needed.",
    image: "data/images/double_cheeseburger_fries.jpg"
  },

  {name:"Loaded Nachos (shareable)", type:"dinner", calories:1120, protein:48, carbs:96, fat:56, tags:[],
    ingredients:[
      {name:"Tortilla chips", qty:200, unit:"g"},
      {name:"Ground beef or pulled chicken", qty:200, unit:"g"},
      {name:"Refried beans", qty:1, unit:"cup"},
      {name:"Cheddar & Monterey Jack", qty:120, unit:"g"},
      {name:"Sour cream & guacamole", qty:0.5, unit:"cup"}
    ],
    instructions:[
      "Layer chips with beans, meat and cheese; bake until cheese melts.",
      "Top with sour cream, salsa and guacamole before serving."
    ],
    image: "data/images/loaded_nachos.jpg"
  },

  {name:"BBQ Pulled Pork Plate (large)", type:"dinner", calories:1050, protein:72, carbs:80, fat:48, tags:[],
    ingredients:[
      {name:"Pulled pork (slow-cooked)", qty:300, unit:"g"},
      {name:"Mac & cheese", qty:1, unit:"cup"},
      {name:"Coleslaw", qty:1, unit:"cup"},
      {name:"Cornbread", qty:1, unit:"slice"}
    ],
    instructions:[
      "Serve pulled pork with mac & cheese, coleslaw and cornbread.",
      "Warm everything and plate for a hearty meal."
    ],
    image: "data/images/bbq_pulled_pork_plate.jpg"
  },

  {name:"Fettuccine Alfredo (extra large)", type:"dinner", calories:1220, protein:56, carbs:130, fat:54, tags:["vegetarian_optional"],
    ingredients:[
      {name:"Fettuccine pasta", qty:300, unit:"g"},
      {name:"Cream or heavy sauce", qty:1, unit:"cup"},
      {name:"Parmesan cheese", qty:70, unit:"g"},
      {name:"Butter", qty:2, unit:"tbsp"}
    ],
    instructions:[
      "Cook pasta until al dente, make creamy Alfredo sauce, toss with pasta and top with extra parmesan.",
      "Serve warm; add chicken or shrimp for extra protein."
    ],
    image: "data/images/fettuccine_alfredo_xl.jpg"
  },

  {name:"Mass Gainer Smoothie (XL)", type:"snack", calories:900, protein:60, carbs:90, fat:30, tags:[],
    ingredients:[
      {name:"Whole milk", qty:600, unit:"ml"},
      {name:"Peanut butter", qty:4, unit:"tbsp"},
      {name:"Oats", qty:0.75, unit:"cup"},
      {name:"Banana", qty:2, unit:"pcs"},
      {name:"Protein powder", qty:2, unit:"scoops"}
    ],
    instructions:[
      "Blend all ingredients until smooth. Drink as a high-calorie snack or mini-meal.",
      "Can be split into two servings if desired."
    ],
    tips: "Use plant milk and vegan protein to make a dairy-free variant.",
    image: "data/images/mass_gainer_smoothie_xl.jpg"
  },

  {name:"Steak & Mac 'n' Cheese (XL)", type:"dinner", calories:1300, protein:88, carbs:95, fat:60, tags:[],
    ingredients:[
      {name:"Ribeye or sirloin steak", qty:300, unit:"g"},
      {name:"Mac & cheese (rich)", qty:1.5, unit:"cups"},
      {name:"Garlic butter", qty:1, unit:"tbsp"},
      {name:"Steamed veg (side)", qty:1, unit:"cup"}
    ],
    instructions:[
      "Cook steak to preference, prepare rich mac & cheese, serve steak perched on mac & cheese with a veg side.",
      "Rest steak for 5 minutes before slicing."
    ],
    image: "data/images/steak_mac_cheese_xl.jpg"
  },

  {name:"Granola + Nut Butter Bowl (large)", type:"breakfast", calories:880, protein:28, carbs:110, fat:30, tags:["vegetarian"],
    ingredients:[
      {name:"Granola", qty:1, unit:"cup"},
      {name:"Greek yogurt or milk", qty:1, unit:"cup"},
      {name:"Almond or peanut butter", qty:3, unit:"tbsp"},
      {name:"Honey or maple", qty:1, unit:"tbsp"}
    ],
    instructions:[
      "Combine granola with yogurt or milk, swirl in nut butter and drizzle honey. Serve immediately.",
      "Add banana or dried fruit to increase calories and carbs."
    ],
    image: "data/images/granola_nutbutter_bowl_large.jpg"
  }

];

if (typeof module !== "undefined") module.exports = { MEALS_DB };