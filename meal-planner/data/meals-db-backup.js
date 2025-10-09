// Simple meal database with tags for restrictions
// Each item: { name, type, calories, protein, carbs, fat, tags, ingredients: [{name, qty, unit}] }
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
    tips: "For meal prep, keep granola separate until serving to maintain crunch. Try different berry combinations for variety.",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop"
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
      "Cook in microwave for 2-3 minutes or on stovetop until creamy",
      "Stir in peanut butter while oats are hot",
      "Top with fresh or frozen berries",
      "Add chia seeds for extra nutrition if desired",
      "Serve immediately while warm"
    ],
    tips: "For overnight oats version, mix ingredients and refrigerate overnight. Add honey or maple syrup for extra sweetness.",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop"
  },
  {name:"Tofu Scramble Wrap", type:"breakfast", calories:440, protein:32, carbs:46, fat:14, tags:["vegan","vegetarian","dairy_free","halal","kosher"], 
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
      "Crumble tofu into small pieces with your hands",
      "Heat olive oil in a pan over medium heat",
      "Add tofu, turmeric, and nutritional yeast, cook for 3-4 minutes",
      "Add bell pepper and cook for 2 minutes",
      "Add spinach and cook until wilted",
      "Warm tortilla and fill with tofu scramble, then wrap tightly"
    ],
    tips: "Press tofu beforehand to remove excess water. Nutritional yeast adds a cheesy flavor that's perfect for this vegan scramble.",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop"
  },
  {name:"Egg & Avocado Toast", type:"breakfast", calories:410, protein:20, carbs:35, fat:18, tags:["vegetarian"], 
    ingredients:[
      {name:"Eggs", qty:2, unit:"pcs"},
      {name:"Whole-grain bread", qty:2, unit:"slices"},
      {name:"Avocado", qty:0.5, unit:"pcs"},
      {name:"Salt and pepper", qty:1, unit:"pinch"},
      {name:"Olive oil", qty:1, unit:"tsp"}
    ],
    instructions:[
      "Toast the bread slices until golden brown",
      "Heat olive oil in a non-stick pan over medium heat",
      "Crack eggs into the pan and cook to your preference",
      "Mash avocado with salt and pepper",
      "Spread mashed avocado on toast",
      "Top with cooked eggs and season with salt and pepper"
    ],
    tips: "For perfectly runny eggs, cook for 2-3 minutes. Add red pepper flakes for extra flavor.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop"
  },
  {name:"Chia Pudding", type:"snack", calories:220, protein:8, carbs:22, fat:12, tags:["vegan","vegetarian","gluten_free","dairy_free","halal","kosher"], 
    ingredients:[
      {name:"Chia seeds", qty:3, unit:"tbsp"},
      {name:"Almond milk (or milk of choice)", qty:1, unit:"cup"},
      {name:"Vanilla extract", qty:0.5, unit:"tsp"},
      {name:"Maple syrup or honey", qty:1, unit:"tbsp"},
      {name:"Fresh berries", qty:0.25, unit:"cup"}
    ],
    instructions:[
      "In a bowl or jar, whisk together chia seeds, milk, vanilla, and sweetener",
      "Let sit for 5 minutes, then whisk again to prevent clumping",
      "Cover and refrigerate for at least 2 hours or overnight",
      "The mixture will thicken to a pudding-like consistency",
      "Stir before serving and top with fresh berries if desired",
      "Can be stored in the refrigerator for up to 3 days"
    ],
    tips: "For best results, let it sit overnight. Try adding cocoa powder for chocolate version or fruit puree for different flavors.",
    image: "https://images.unsplash.com/photo-1623428454614-abaf00244e52?w=400&h=300&fit=crop"
  },
  {name:"Apple & Almonds", type:"snack", calories:200, protein:6, carbs:18, fat:12, tags:["vegan","vegetarian","gluten_free","dairy_free","halal","kosher"], 
    ingredients:[
      {name:"Medium apple", qty:1, unit:"pcs"},
      {name:"Raw almonds", qty:28, unit:"g"}
    ],
    instructions:[
      "Wash and slice the apple into wedges (optional)",
      "Measure out 28g (about 20-25) almonds",
      "Enjoy together for a perfect balance of fiber, protein, and healthy fats",
      "Can be prepared in advance and stored in separate containers"
    ],
    tips: "This combination provides sustained energy and helps keep you full. Try different apple varieties for flavor variety.",
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop"
  },
  {name:"Cottage Cheese Cup", type:"snack", calories:180, protein:24, carbs:8, fat:4, tags:["vegetarian","gluten_free"], 
    ingredients:[
      {name:"Low-fat cottage cheese", qty:1, unit:"cup"},
      {name:"Black pepper", qty:1, unit:"pinch"},
      {name:"Fresh herbs or chives", qty:1, unit:"tsp"}
    ],
    instructions:[
      "Scoop cottage cheese into a bowl",
      "Add a pinch of black pepper for flavor",
      "Garnish with fresh herbs or chives if desired",
      "Serve chilled for best taste and texture"
    ],
    tips: "High in protein and low in calories. Try adding fruit like berries or peaches for a sweet version.",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=300&fit=crop"
  },
  {name:"Protein Shake (plant)", type:"snack", calories:160, protein:25, carbs:6, fat:3, tags:["vegan","vegetarian","gluten_free","dairy_free","halal","kosher"], 
    ingredients:[
      {name:"Plant protein powder", qty:1, unit:"scoop"},
      {name:"Water/plant milk", qty:350, unit:"ml"}
    ],
    instructions:[
      "Add protein powder to a shaker bottle or blender",
      "Pour in water or plant milk",
      "Shake vigorously or blend until smooth",
      "Serve immediately over ice if desired"
    ],
    tips: "Try different flavors like vanilla, chocolate, or berry. Add frozen fruit for a smoothie consistency.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
  },
  {name:"Grilled Chicken Bowl", type:"lunch", calories:550, protein:45, carbs:60, fat:14, tags:["gluten_free","halal","kosher"], 
    ingredients:[
      {name:"Chicken breast", qty:150, unit:"g"},
      {name:"Jasmine rice", qty:1, unit:"cup"},
      {name:"Broccoli", qty:0.5, unit:"cup"},
      {name:"Bell peppers", qty:0.5, unit:"cup"},
      {name:"Olive oil", qty:1, unit:"tbsp"},
      {name:"Garlic", qty:1, unit:"clove"},
      {name:"Salt and herbs", qty:1, unit:"pinch"}
    ],
    instructions:[
      "Season chicken breast with salt, pepper, and herbs",
      "Grill chicken for 6-7 minutes per side until cooked through",
      "Cook rice according to package directions",
      "Steam broccoli and bell peppers until tender-crisp",
      "Slice chicken and arrange over rice",
      "Add steamed vegetables and drizzle with olive oil"
    ],
    tips: "Let chicken rest 5 minutes before slicing. Add lemon juice for extra flavor and vitamin C.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop"
  },
  {name:"Hummus & Veg Pita", type:"lunch", calories:480, protein:18, carbs:64, fat:14, tags:["vegan","vegetarian","dairy_free","halal","kosher"], 
    ingredients:[
      {name:"Whole wheat pita bread", qty:1, unit:"pcs"},
      {name:"Hummus", qty:0.5, unit:"cup"},
      {name:"Cucumber", qty:0.5, unit:"cup"},
      {name:"Cherry tomatoes", qty:0.5, unit:"cup"},
      {name:"Red onion", qty:2, unit:"tbsp"},
      {name:"Fresh lettuce", qty:0.25, unit:"cup"}
    ],
    instructions:[
      "Warm the pita bread in toaster or oven until soft and pliable",
      "Spread hummus evenly inside the pita pocket",
      "Dice cucumber and tomatoes into small pieces",
      "Thinly slice red onion",
      "Stuff pita with lettuce, cucumber, tomatoes, and onion",
      "Serve immediately while pita is still warm"
    ],
    tips: "For extra flavor, try adding sprouts, olives, or a drizzle of olive oil. Toast the pita lightly for better texture.",
    image: "https://images.unsplash.com/photo-1565299585323-38dd0513d271?w=400&h=300&fit=crop"
  },
  {name:"Buddha Bowl (tofu)", type:"lunch", calories:560, protein:32, carbs:68, fat:18, tags:["vegan","vegetarian","dairy_free","halal","kosher"], 
    ingredients:[
      {name:"Firm tofu", qty:150, unit:"g"},
      {name:"Brown rice", qty:0.75, unit:"cup"},
      {name:"Broccoli", qty:0.5, unit:"cup"},
      {name:"Sweet potato", qty:0.5, unit:"cup"},
      {name:"Carrots", qty:0.5, unit:"cup"},
      {name:"Tahini dressing", qty:2, unit:"tbsp"},
      {name:"Sesame seeds", qty:1, unit:"tsp"}
    ],
    instructions:[
      "Cook brown rice according to package directions",
      "Cut tofu into cubes and pan-fry until golden",
      "Roast sweet potato and carrots at 400°F for 20-25 minutes",
      "Steam broccoli until tender-crisp",
      "Arrange rice in bowl, top with tofu and vegetables",
      "Drizzle with tahini dressing and sprinkle sesame seeds"
    ],
    tips: "Press tofu well before cooking for better texture. Meal prep by cooking components separately and assembling when ready to eat.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop"
  },
  {name:"Shrimp Stir-fry", type:"dinner", calories:520, protein:38, carbs:58, fat:12, tags:["dairy_free","halal","kosher"], 
    ingredients:[
      {name:"Large shrimp", qty:160, unit:"g"},
      {name:"Rice noodles", qty:120, unit:"g"},
      {name:"Bell peppers", qty:1, unit:"cup"},
      {name:"Snap peas", qty:1, unit:"cup"},
      {name:"Soy sauce", qty:2, unit:"tbsp"},
      {name:"Garlic", qty:2, unit:"cloves"},
      {name:"Ginger", qty:1, unit:"tsp"},
      {name:"Sesame oil", qty:1, unit:"tbsp"}
    ],
    instructions:[
      "Cook rice noodles according to package directions, drain",
      "Heat sesame oil in a large wok or skillet over high heat",
      "Add minced garlic and ginger, stir-fry for 30 seconds",
      "Add shrimp and cook for 2-3 minutes until pink",
      "Add vegetables and stir-fry for 2-3 minutes until crisp-tender",
      "Add cooked noodles and soy sauce, toss everything together",
      "Serve immediately while hot"
    ],
    tips: "Don't overcook the shrimp - they should be pink and curled. Add vegetables in order of cooking time needed.",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop"
  },
  {name:"Small Apple", type:"snack", calories:80, protein:0, carbs:21, fat:0, tags:["vegetarian","vegan","gluten_free"], 
    ingredients:[
      {name:"Fresh apple", qty:1, unit:"small"},
      {name:"Cinnamon", qty:1, unit:"pinch"}
    ],
    instructions:[
      "Wash the apple thoroughly under cold water",
      "Cut into slices if preferred, or enjoy whole",
      "Sprinkle with cinnamon for extra flavor (optional)",
      "Enjoy as a refreshing, fiber-rich snack"
    ],
    tips: "Choose crisp varieties like Honeycrisp or Gala for best taste. Leave the skin on for extra fiber and nutrients.",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop"
  },
  {name:"Celery & PB", type:"snack", calories:90, protein:4, carbs:6, fat:6, tags:["vegetarian","vegan","gluten_free"], 
    ingredients:[
      {name:"Fresh celery stalks", qty:3, unit:"pcs"},
      {name:"Natural peanut butter", qty:1, unit:"tsp"},
      {name:"Raisins", qty:1, unit:"tbsp"}
    ],
    instructions:[
      "Wash celery stalks and trim the ends",
      "Cut each stalk into 3-4 inch pieces",
      "Fill the hollow of each celery piece with peanut butter",
      "Top with raisins if desired for 'ants on a log' style",
      "Serve immediately or refrigerate for later"
    ],
    tips: "Choose natural peanut butter without added sugars. This classic combo provides fiber, protein, and healthy fats.",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop"
  },

  // Low-calorie options for better target matching
  {name:"Greek Yogurt (small)", type:"breakfast", calories:150, protein:15, carbs:12, fat:4, tags:["vegetarian"], 
    ingredients:[
      {name:"Greek yogurt", qty:0.5, unit:"cup"},
      {name:"Berries", qty:0.5, unit:"cup"}
    ],
    instructions:[
      "Scoop Greek yogurt into a bowl",
      "Top with fresh or frozen berries",
      "Mix gently and enjoy"
    ],
    tips: "High protein breakfast that's quick and satisfying.",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop"
  },
  {name:"Egg White Scramble", type:"breakfast", calories:120, protein:16, carbs:3, fat:2, tags:["vegetarian"], 
    ingredients:[
      {name:"Egg whites", qty:4, unit:"pcs"},
      {name:"Spinach", qty:1, unit:"cup"}
    ],
    instructions:[
      "Heat a non-stick pan over medium heat",
      "Add spinach and cook until wilted",
      "Pour in egg whites and scramble until cooked",
      "Season with salt and pepper"
    ],
    tips: "Low calorie, high protein option perfect for weight loss goals.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop"
  },
  {name:"Rice Cake & Hummus", type:"snack", calories:110, protein:4, carbs:18, fat:3, tags:["vegetarian","vegan"], 
    ingredients:[
      {name:"Rice cakes", qty:2, unit:"pcs"},
      {name:"Hummus", qty:2, unit:"tbsp"}
    ],
    instructions:[
      "Spread hummus evenly on rice cakes",
      "Enjoy as a crunchy, satisfying snack"
    ],
    tips: "Light snack that provides fiber and plant-based protein.",
    image: "https://images.unsplash.com/photo-1565299585323-38dd0513d271?w=400&h=300&fit=crop"
  }
];