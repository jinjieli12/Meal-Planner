// Templates keyed by equipment, experience, and day ranges
// Days are arrays of day objects, each with blocks->moves
const WORKOUTS_DB = [
  {
    name:"Beginner Dumbbells 3-5d",
    minDays:3, maxDays:5,
    levels:["beginner","intermediate"],
    equipment:["dumbbells","any"],
    days:[
      { day:"Upper A",
        blocks:[
          {title:"Warm-up", moves:[{name:"Row/Jump Rope",sets:"5–8 min"},{name:"Arm Circles",sets:"2x30s"}]},
          {title:"Strength", moves:[
            {name:"DB Bench Press", sets:"3x8–10", tip:"2–3 reps in reserve"},
            {name:"One-arm DB Row", sets:"3x10/side"},
            {name:"DB Shoulder Press", sets:"3x8–10"},
            {name:"DB Curl", sets:"3x12"},
          ]},
          {title:"Finisher", moves:[{name:"Plank", sets:"3x30–45s"}]}
        ]},
      { day:"Lower A",
        blocks:[
          {title:"Warm-up", moves:[{name:"Bike/Walk", sets:"5–8 min"}]},
          {title:"Strength", moves:[
            {name:"Goblet Squat", sets:"4x8–10"},
            {name:"DB RDL", sets:"3x10"},
            {name:"Reverse Lunge", sets:"3x10/side"},
            {name:"Glute Bridge", sets:"3x12"},
          ]},
          {title:"Finisher", moves:[{name:"Farmer Carry", sets:"3x40m"}]}
        ]},
      { day:"Full Body",
        blocks:[
          {title:"Strength", moves:[
            {name:"DB Incline Press", sets:"3x10"},
            {name:"DB Split Squat", sets:"3x8/side"},
            {name:"DB Row", sets:"3x10"},
            {name:"Hollow Hold", sets:"3x30s"},
          ]}
        ]},
      { day:"Upper B",
        blocks:[
          {title:"Strength", moves:[
            {name:"Push-ups", sets:"3xAMRAP"},
            {name:"Lat Pulldown (or band)", sets:"3x10"},
            {name:"DB Lateral Raise", sets:"3x12–15"},
            {name:"Triceps Pressdown (band)", sets:"3x12–15"},
          ]}
        ]},
      { day:"Lower B + Conditioning",
        blocks:[
          {title:"Strength", moves:[
            {name:"DB Front Squat", sets:"3x8"},
            {name:"Hip Hinge (KB swing or DB RDL)", sets:"3x12"},
            {name:"Step-ups", sets:"3x10/side"},
          ]},
          {title:"Conditioning", moves:[{name:"Intervals", sets:"10x:30 on/:30 off"}]}
        ]},
    ]
  },
  {
    name:"No-Equipment 3–4d",
    minDays:3, maxDays:4, levels:["beginner","intermediate"], equipment:["none","any"],
    days:[
      {day:"Full Body A", blocks:[
        {title:"Circuit 3–4 rounds", moves:[
          {name:"Bodyweight Squats", sets:"15"},
          {name:"Incline Push-ups (table)", sets:"12"},
          {name:"Hip Hinge Good Mornings", sets:"15"},
          {name:"Reverse Lunges", sets:"10/side"},
          {name:"Dead Bugs", sets:"12/side"},
        ]}
      ]},
      {day:"Cardio + Core", blocks:[
        {title:"Zone 2", moves:[{name:"Brisk Walk/Jog", sets:"25–35 min"}]},
        {title:"Core", moves:[
          {name:"Plank", sets:"3x30–45s"},
          {name:"Side Plank", sets:"3x20–30s/side"},
          {name:"Glute Bridge", sets:"3x12"},
        ]}
      ]},
      {day:"Full Body B", blocks:[
        {title:"EMOM 20", moves:[
          {name:"Alt. Reverse Lunge", sets:"12 total"},
          {name:"Elevated Push-ups", sets:"10"},
          {name:"Air Squats", sets:"20"},
          {name:"Hollow Rocks", sets:"10"},
        ]}
      ]},
      {day:"Mobility + Steps", blocks:[
        {title:"Mobility", moves:[
          {name:"World’s Greatest Stretch", sets:"2x/side"},
          {name:"T-Spine Openers", sets:"2x10"},
          {name:"90/90 Hips", sets:"2x/side"},
        ]},
        {title:"NEAT", moves:[{name:"8–10k Steps", sets:"easy pace"}]}
      ]}
    ]
  },
  {
    name:"Full Gym 4–6d Hypertrophy",
    minDays:4, maxDays:6, levels:["intermediate","advanced"], equipment:["gym","any"],
    days:[
      {day:"Push (Chest/Shoulders/Tris)", blocks:[
        {title:"Strength", moves:[
          {name:"Barbell Bench Press", sets:"4x5–8"},
          {name:"Incline DB Press", sets:"3x8–10"},
          {name:"Cable Fly", sets:"3x12–15"},
          {name:"Overhead Press", sets:"3x6–8"},
          {name:"Lateral Raise", sets:"3x12–20"},
          {name:"Triceps Rope", sets:"3x12–15"},
        ]}
      ]},
      {day:"Pull (Back/Bis)", blocks:[
        {title:"Strength", moves:[
          {name:"Deadlift or RDL", sets:"3x5–6"},
          {name:"Lat Pulldown/Pull-up", sets:"4x6–10"},
          {name:"Seated Row", sets:"3x8–12"},
          {name:"Face Pull", sets:"3x12–15"},
          {name:"EZ Curl", sets:"3x10–12"},
        ]}
      ]},
      {day:"Legs (Quad‑dominant)", blocks:[
        {title:"Strength", moves:[
          {name:"Back Squat", sets:"4x5–8"},
          {name:"Leg Press", sets:"3x10"},
          {name:"Walking Lunge", sets:"3x12/side"},
          {name:"Leg Extensions", sets:"3x12–15"},
          {name:"Calf Raises", sets:"3x12–20"},
        ]}
      ]},
      {day:"Upper (Volume)", blocks:[
        {title:"Hypertrophy", moves:[
          {name:"Incline Bench", sets:"3x8–10"},
          {name:"Chest Supported Row", sets:"3x8–12"},
          {name:"DB Shoulder Press", sets:"3x8–10"},
          {name:"Lat Pulldown", sets:"3x8–12"},
          {name:"Cable Lateral Raise", sets:"3x12–20"},
        ]}
      ]},
      {day:"Legs (Posterior)", blocks:[
        {title:"Strength", moves:[
          {name:"RDL", sets:"4x6–8"},
          {name:"Bulgarian Split Squat", sets:"3x8/side"},
          {name:"Hamstring Curl", sets:"3x10–12"},
          {name:"Glute Bridge/Hip Thrust", sets:"3x10–12"},
        ]}
      ]},
      {day:"Conditioning", blocks:[
        {title:"Intervals", moves:[{name:"Bike/Row", sets:"10x:40 on/:20 off"}]},
        {title:"Core", moves:[{name:"Plank Variations", sets:"10–12 min practice"}]}
      ]},
    ]
  },
  {
    name:"Kettlebell Full Body 3-4d",
    minDays:3, maxDays:4, levels:["intermediate","advanced"], equipment:["kettlebell","any"],
    days:[
      {day:"Power & Strength", blocks:[
        {title:"Warm-up", moves:[
          {name:"KB Halos", sets:"2x5/direction"},
          {name:"Goblet Squats (light)", sets:"2x10"},
          {name:"KB Deadlifts (light)", sets:"2x8"}
        ]},
        {title:"Strength", moves:[
          {name:"KB Swings", sets:"5x15", tip:"Focus on hip drive"},
          {name:"KB Turkish Get-up", sets:"3x3/side"},
          {name:"KB Goblet Squat", sets:"4x8-10"},
          {name:"KB Single-arm Press", sets:"3x6/side"},
          {name:"KB Bent-over Row", sets:"3x8/side"},
        ]},
        {title:"Finisher", moves:[{name:"KB Farmer Carry", sets:"3x50m"}]}
      ]},
      {day:"Flow & Conditioning", blocks:[
        {title:"KB Flow Circuit", moves:[
          {name:"KB Clean & Press", sets:"4x5/side"},
          {name:"KB Snatches", sets:"4x8/side"},
          {name:"KB Windmill", sets:"3x5/side"},
          {name:"KB Bottom-up Carry", sets:"3x25m/side"},
        ]},
        {title:"Conditioning", moves:[
          {name:"KB Swing Intervals", sets:"8x:30 on/:30 off"},
        ]}
      ]},
      {day:"Strength Focus", blocks:[
        {title:"Strength", moves:[
          {name:"Double KB Front Squat", sets:"4x6"},
          {name:"Single KB Deadlift", sets:"3x8/side"},
          {name:"KB Push Press", sets:"3x6/side"},
          {name:"KB Renegade Row", sets:"3x8 total"},
          {name:"KB Reverse Lunge", sets:"3x8/side"},
        ]},
        {title:"Core", moves:[
          {name:"KB Around-the-World", sets:"3x8/direction"},
          {name:"KB Russian Twist", sets:"3x20"},
        ]}
      ]},
      {day:"Recovery & Mobility", blocks:[
        {title:"Active Recovery", moves:[
          {name:"Light KB Swings", sets:"3x20"},
          {name:"KB Goblet Squat Hold", sets:"3x30s"},
          {name:"KB Overhead Carry", sets:"3x30m/side"},
        ]},
        {title:"Mobility", moves:[
          {name:"KB Armbar", sets:"2x30s/side"},
          {name:"90/90 Hip Stretch", sets:"2x60s/side"},
          {name:"Thoracic Spine Rotation", sets:"2x10/side"},
        ]}
      ]}
    ]
  },
  {
    name:"Powerlifting Strength 4d",
    minDays:4, maxDays:4, levels:["intermediate","advanced"], equipment:["gym","any"],
    days:[
      {day:"Squat Focus", blocks:[
        {title:"Warm-up", moves:[
          {name:"Light Cardio", sets:"5 min"},
          {name:"Bodyweight Squats", sets:"2x10"},
          {name:"Leg Swings", sets:"2x10/side"}
        ]},
        {title:"Main Lift", moves:[
          {name:"Back Squat", sets:"5x3-5", tip:"80-90% 1RM"},
          {name:"Pause Squat", sets:"3x3", tip:"2 sec pause"},
        ]},
        {title:"Accessory", moves:[
          {name:"Romanian Deadlift", sets:"4x6-8"},
          {name:"Bulgarian Split Squat", sets:"3x8/side"},
          {name:"Leg Curls", sets:"3x10-12"},
          {name:"Abs Circuit", sets:"3 rounds"},
        ]}
      ]},
      {day:"Bench Focus", blocks:[
        {title:"Warm-up", moves:[
          {name:"Arm Circles", sets:"2x10"},
          {name:"Band Pull-aparts", sets:"2x15"},
          {name:"Light Bench", sets:"2x8"}
        ]},
        {title:"Main Lift", moves:[
          {name:"Bench Press", sets:"5x3-5", tip:"80-90% 1RM"},
          {name:"Close-grip Bench", sets:"3x5"},
        ]},
        {title:"Accessory", moves:[
          {name:"Barbell Row", sets:"4x6-8"},
          {name:"Incline DB Press", sets:"3x8-10"},
          {name:"Weighted Dips", sets:"3x8-12"},
          {name:"Barbell Curls", sets:"3x10"},
        ]}
      ]},
      {day:"Deadlift Focus", blocks:[
        {title:"Warm-up", moves:[
          {name:"Light Cardio", sets:"5 min"},
          {name:"Hip Circles", sets:"2x10"},
          {name:"Light RDLs", sets:"2x8"}
        ]},
        {title:"Main Lift", moves:[
          {name:"Deadlift", sets:"5x3-5", tip:"80-90% 1RM"},
          {name:"Deficit Deadlift", sets:"3x5", tip:"2-inch deficit"},
        ]},
        {title:"Accessory", moves:[
          {name:"Front Squat", sets:"4x6-8"},
          {name:"Good Mornings", sets:"3x8-10"},
          {name:"Leg Press", sets:"3x12-15"},
          {name:"Plank Variations", sets:"3x45s"},
        ]}
      ]},
      {day:"Overhead Press Focus", blocks:[
        {title:"Warm-up", moves:[
          {name:"Shoulder Dislocations", sets:"2x10"},
          {name:"Wall Slides", sets:"2x10"},
          {name:"Light OHP", sets:"2x5"}
        ]},
        {title:"Main Lift", moves:[
          {name:"Overhead Press", sets:"5x3-5", tip:"Focus on form"},
          {name:"Push Press", sets:"3x5"},
        ]},
        {title:"Accessory", moves:[
          {name:"Weighted Pull-ups", sets:"4x5-8"},
          {name:"DB Shoulder Press", sets:"3x8-10"},
          {name:"Lateral Raises", sets:"3x12-15"},
          {name:"Face Pulls", sets:"3x15-20"},
          {name:"Tricep Extensions", sets:"3x10-12"},
        ]}
      ]}
    ]
  },
  {
    name:"Gym Upper/Lower 4d Beginner",
    minDays:4, maxDays:4, levels:["beginner","intermediate"], equipment:["gym","any"],
    days:[
      {day:"Upper Body A", blocks:[
        {title:"Warm-up", moves:[
          {name:"Treadmill Walk", sets:"5 min"},
          {name:"Arm Circles", sets:"2x10"},
          {name:"Band Pull-aparts", sets:"2x15"}
        ]},
        {title:"Compound", moves:[
          {name:"Bench Press (DB or Barbell)", sets:"3x8-10"},
          {name:"Seated Cable Row", sets:"3x8-10"},
          {name:"Shoulder Press Machine", sets:"3x8-10"},
        ]},
        {title:"Isolation", moves:[
          {name:"Lat Pulldown", sets:"3x10-12"},
          {name:"Chest Fly Machine", sets:"3x10-12"},
          {name:"Bicep Curls", sets:"3x10-12"},
          {name:"Tricep Pushdowns", sets:"3x10-12"},
        ]}
      ]},
      {day:"Lower Body A", blocks:[
        {title:"Warm-up", moves:[
          {name:"Stationary Bike", sets:"5 min"},
          {name:"Bodyweight Squats", sets:"2x10"},
          {name:"Leg Swings", sets:"2x10/side"}
        ]},
        {title:"Compound", moves:[
          {name:"Leg Press", sets:"3x10-12"},
          {name:"Leg Curls", sets:"3x10-12"},
          {name:"Calf Press", sets:"3x12-15"},
        ]},
        {title:"Unilateral", moves:[
          {name:"Lunges (bodyweight)", sets:"3x8/side"},
          {name:"Step-ups", sets:"3x8/side"},
          {name:"Glute Bridges", sets:"3x12-15"},
        ]},
        {title:"Core", moves:[
          {name:"Plank", sets:"3x30s"},
          {name:"Bicycle Crunches", sets:"3x15/side"},
        ]}
      ]},
      {day:"Upper Body B", blocks:[
        {title:"Warm-up", moves:[
          {name:"Elliptical", sets:"5 min"},
          {name:"Shoulder Rolls", sets:"2x10"},
          {name:"Light Rowing", sets:"2x10"}
        ]},
        {title:"Compound", moves:[
          {name:"Incline DB Press", sets:"3x8-10"},
          {name:"Lat Pulldown Wide", sets:"3x8-10"},
          {name:"DB Shoulder Press", sets:"3x8-10"},
        ]},
        {title:"Isolation", moves:[
          {name:"Cable Row", sets:"3x10-12"},
          {name:"Pec Deck", sets:"3x10-12"},
          {name:"Hammer Curls", sets:"3x10-12"},
          {name:"Overhead Tricep Extension", sets:"3x10-12"},
          {name:"Lateral Raises", sets:"3x12-15"},
        ]}
      ]},
      {day:"Lower Body B", blocks:[
        {title:"Warm-up", moves:[
          {name:"Recumbent Bike", sets:"5 min"},
          {name:"Hip Circles", sets:"2x10"},
          {name:"Glute Bridges", sets:"2x10"}
        ]},
        {title:"Compound", moves:[
          {name:"Goblet Squats", sets:"3x10-12"},
          {name:"Romanian Deadlifts (DB)", sets:"3x8-10"},
          {name:"Leg Extensions", sets:"3x10-12"},
        ]},
        {title:"Unilateral", moves:[
          {name:"Split Squats", sets:"3x8/side"},
          {name:"Single-leg RDL", sets:"3x6/side"},
          {name:"Hip Thrusts", sets:"3x10-12"},
        ]},
        {title:"Core", moves:[
          {name:"Dead Bug", sets:"3x8/side"},
          {name:"Side Plank", sets:"3x20s/side"},
        ]}
      ]}
    ]
  },
  {
    name:"Full Body Gym Athlete 5d",
    minDays:5, maxDays:5, levels:["advanced"], equipment:["gym","any"],
    days:[
      {day:"Power & Explosiveness", blocks:[
        {title:"Dynamic Warm-up", moves:[
          {name:"Jump Rope", sets:"3 min"},
          {name:"Dynamic Stretching", sets:"5 min"},
          {name:"Activation Drills", sets:"5 min"}
        ]},
        {title:"Power", moves:[
          {name:"Box Jumps", sets:"5x3"},
          {name:"Medicine Ball Slams", sets:"4x6"},
          {name:"Broad Jumps", sets:"4x3"},
          {name:"Battle Ropes", sets:"4x30s"},
        ]},
        {title:"Strength", moves:[
          {name:"Power Clean", sets:"5x3"},
          {name:"Push Jerk", sets:"4x3"},
          {name:"Back Squat (speed)", sets:"6x3", tip:"60% 1RM, explosive"},
        ]}
      ]},
      {day:"Upper Power", blocks:[
        {title:"Power", moves:[
          {name:"Plyometric Push-ups", sets:"4x5"},
          {name:"Medicine Ball Chest Pass", sets:"4x8"},
          {name:"Band-assisted Jump Pull-ups", sets:"4x5"},
        ]},
        {title:"Strength", moves:[
          {name:"Bench Press", sets:"5x5"},
          {name:"Weighted Pull-ups", sets:"4x6-8"},
          {name:"Barbell Rows", sets:"4x6"},
          {name:"Overhead Press", sets:"4x6"},
        ]},
        {title:"Volume", moves:[
          {name:"DB Flyes", sets:"3x10"},
          {name:"Cable Curls", sets:"3x12"},
          {name:"Close-grip Bench", sets:"3x8"},
        ]}
      ]},
      {day:"Lower Power", blocks:[
        {title:"Power", moves:[
          {name:"Jump Squats", sets:"5x5"},
          {name:"Single-leg Bounds", sets:"4x6/side"},
          {name:"Depth Jumps", sets:"4x3"},
        ]},
        {title:"Strength", moves:[
          {name:"Front Squat", sets:"5x5"},
          {name:"Romanian Deadlift", sets:"4x6"},
          {name:"Walking Lunges", sets:"3x12/side"},
          {name:"Hip Thrusts", sets:"4x8"},
        ]},
        {title:"Unilateral", moves:[
          {name:"Bulgarian Split Squats", sets:"3x8/side"},
          {name:"Single-leg RDL", sets:"3x6/side"},
        ]}
      ]},
      {day:"Conditioning & Core", blocks:[
        {title:"Metabolic Circuit", moves:[
          {name:"Assault Bike", sets:"5x1 min on/1 min off"},
          {name:"Rowing Machine", sets:"4x250m/90s rest"},
          {name:"Ski Erg", sets:"3x30s/60s rest"},
        ]},
        {title:"Core Strength", moves:[
          {name:"Weighted Planks", sets:"4x45s"},
          {name:"Hanging Leg Raises", sets:"3x10"},
          {name:"Russian Twists (weighted)", sets:"3x20"},
          {name:"Pallof Press", sets:"3x12/side"},
        ]}
      ]},
      {day:"Recovery & Mobility", blocks:[
        {title:"Active Recovery", moves:[
          {name:"Light Swimming/Walking", sets:"20-30 min"},
          {name:"Yoga Flow", sets:"15 min"},
        ]},
        {title:"Mobility", moves:[
          {name:"Hip 90/90 Stretch", sets:"3x60s/side"},
          {name:"Thoracic Spine Mobility", sets:"3x10"},
          {name:"Shoulder Dislocations", sets:"3x15"},
          {name:"Pigeon Pose", sets:"2x90s/side"},
        ]},
        {title:"Soft Tissue", moves:[
          {name:"Foam Rolling", sets:"15 min full body"},
          {name:"Lacrosse Ball Work", sets:"Focus on tight areas"},
        ]}
      ]}
    ]
  },
  {
    name:"Dumbbell Upper/Lower 4d",
    minDays:4, maxDays:4, levels:["beginner","intermediate"], equipment:["dumbbells","any"],
    days:[
      {day:"Upper Body Power", blocks:[
        {title:"Warm-up", moves:[
          {name:"Arm Swings", sets:"2x10"},
          {name:"Shoulder Rolls", sets:"2x10"},
          {name:"Light DB Press", sets:"2x8"}
        ]},
        {title:"Compound", moves:[
          {name:"DB Bench Press", sets:"4x6-8"},
          {name:"DB Bent-over Row", sets:"4x6-8"},
          {name:"DB Shoulder Press", sets:"3x8-10"},
          {name:"DB Renegade Rows", sets:"3x8 total"},
        ]},
        {title:"Isolation", moves:[
          {name:"DB Flyes", sets:"3x10-12"},
          {name:"DB Pullovers", sets:"3x10-12"},
          {name:"DB Bicep Curls", sets:"3x10-12"},
          {name:"DB Tricep Extensions", sets:"3x10-12"},
        ]}
      ]},
      {day:"Lower Body Strength", blocks:[
        {title:"Warm-up", moves:[
          {name:"Bodyweight Squats", sets:"2x10"},
          {name:"Hip Circles", sets:"2x10"},
          {name:"Leg Swings", sets:"2x10/side"}
        ]},
        {title:"Compound", moves:[
          {name:"DB Goblet Squats", sets:"4x8-10"},
          {name:"DB Romanian Deadlift", sets:"4x8-10"},
          {name:"DB Step-ups", sets:"3x10/side"},
          {name:"DB Calf Raises", sets:"3x12-15"},
        ]},
        {title:"Unilateral", moves:[
          {name:"DB Lunges", sets:"3x10/side"},
          {name:"Single DB Deadlift", sets:"3x8/side"},
          {name:"DB Bulgarian Split Squat", sets:"3x8/side"},
        ]},
        {title:"Core", moves:[
          {name:"DB Russian Twists", sets:"3x20"},
          {name:"DB Woodchoppers", sets:"3x12/side"},
        ]}
      ]},
      {day:"Upper Body Volume", blocks:[
        {title:"Chest Focus", moves:[
          {name:"Incline DB Press", sets:"4x8-10"},
          {name:"DB Chest Press Floor", sets:"3x10-12"},
          {name:"DB Flyes (multiple angles)", sets:"3x12"},
        ]},
        {title:"Back & Arms", moves:[
          {name:"Single-arm DB Row", sets:"4x10/side"},
          {name:"DB Reverse Flyes", sets:"3x12-15"},
          {name:"DB Hammer Curls", sets:"3x10-12"},
          {name:"DB Overhead Tricep Press", sets:"3x10-12"},
          {name:"DB Lateral Raises", sets:"3x12-15"},
        ]}
      ]},
      {day:"Lower Body & Conditioning", blocks:[
        {title:"Strength", moves:[
          {name:"DB Front Squats", sets:"4x8-10"},
          {name:"DB Stiff-leg Deadlift", sets:"3x10"},
          {name:"DB Reverse Lunges", sets:"3x10/side"},
        ]},
        {title:"Conditioning Circuit", moves:[
          {name:"DB Thrusters", sets:"4x12"},
          {name:"DB Man Makers", sets:"3x8"},
          {name:"DB Farmer Walks", sets:"3x50m"},
          {name:"DB Swings (two-handed)", sets:"3x15"},
        ]},
        {title:"Core Finisher", moves:[
          {name:"DB Plank Drags", sets:"3x10"},
          {name:"DB Dead Bugs", sets:"3x8/side"},
        ]}
      ]}
    ]
  },
  {
    name:"Advanced Dumbbell 5d Split",
    minDays:5, maxDays:5, levels:["intermediate","advanced"], equipment:["dumbbells","any"],
    days:[
      {day:"Chest & Triceps", blocks:[
        {title:"Chest", moves:[
          {name:"DB Bench Press", sets:"4x6-8"},
          {name:"Incline DB Press", sets:"4x8-10"},
          {name:"DB Flyes", sets:"3x10-12"},
          {name:"Decline DB Press", sets:"3x8-10"},
          {name:"DB Pullovers", sets:"3x10-12"},
        ]},
        {title:"Triceps", moves:[
          {name:"DB Close-grip Press", sets:"3x8-10"},
          {name:"DB Overhead Extension", sets:"3x10-12"},
          {name:"DB Tricep Kickbacks", sets:"3x12-15"},
          {name:"Diamond Push-ups", sets:"3xAMRAP"},
        ]}
      ]},
      {day:"Back & Biceps", blocks:[
        {title:"Back", moves:[
          {name:"Single-arm DB Row", sets:"4x8-10/side"},
          {name:"DB Bent-over Row", sets:"4x8-10"},
          {name:"DB Reverse Flyes", sets:"3x12-15"},
          {name:"DB Deadlifts", sets:"4x8-10"},
          {name:"DB Shrugs", sets:"3x12-15"},
        ]},
        {title:"Biceps", moves:[
          {name:"DB Bicep Curls", sets:"4x10-12"},
          {name:"DB Hammer Curls", sets:"3x10-12"},
          {name:"DB Concentration Curls", sets:"3x10/side"},
          {name:"DB 21s", sets:"2 rounds"},
        ]}
      ]},
      {day:"Shoulders", blocks:[
        {title:"Compound", moves:[
          {name:"DB Shoulder Press", sets:"4x8-10"},
          {name:"DB Arnold Press", sets:"3x10-12"},
          {name:"DB Push Press", sets:"3x6-8"},
        ]},
        {title:"Isolation", moves:[
          {name:"DB Lateral Raises", sets:"4x12-15"},
          {name:"DB Rear Delt Flyes", sets:"4x12-15"},
          {name:"DB Front Raises", sets:"3x10-12"},
          {name:"DB Upright Rows", sets:"3x10-12"},
        ]},
        {title:"Rotator Cuff", moves:[
          {name:"DB External Rotations", sets:"3x15/side"},
          {name:"DB Cuban Press", sets:"2x12"},
        ]}
      ]},
      {day:"Legs", blocks:[
        {title:"Quads", moves:[
          {name:"DB Goblet Squats", sets:"4x10-12"},
          {name:"DB Front Squats", sets:"4x8-10"},
          {name:"DB Step-ups", sets:"3x10/side"},
          {name:"DB Lunges", sets:"3x12/side"},
        ]},
        {title:"Posterior Chain", moves:[
          {name:"DB Romanian Deadlift", sets:"4x8-10"},
          {name:"Single-leg DB Deadlift", sets:"3x8/side"},
          {name:"DB Bulgarian Split Squats", sets:"3x10/side"},
          {name:"DB Calf Raises", sets:"4x15-20"},
        ]}
      ]},
      {day:"Full Body & Core", blocks:[
        {title:"Compound", moves:[
          {name:"DB Thrusters", sets:"4x8-10"},
          {name:"DB Clean & Press", sets:"3x6/side"},
          {name:"DB Squat to Press", sets:"3x10"},
          {name:"DB Renegade Rows", sets:"3x8"},
        ]},
        {title:"Core", moves:[
          {name:"DB Russian Twists", sets:"4x20"},
          {name:"DB Woodchoppers", sets:"3x12/side"},
          {name:"DB Side Bends", sets:"3x15/side"},
          {name:"DB Plank Rows", sets:"3x10"},
        ]},
        {title:"Conditioning", moves:[
          {name:"DB Complex Circuit", sets:"3 rounds x 45s/15s rest"},
        ]}
      ]}
    ]
  },
  {
    name:"Bench Press Specialization 4d",
    minDays:4, maxDays:4, levels:["intermediate","advanced"], equipment:["gym","any"],
    days:[
      {day:"Heavy Bench Day", blocks:[
        {title:"Warm-up", moves:[
          {name:"Band Pull-aparts", sets:"3x15"},
          {name:"Scapular Wall Slides", sets:"2x10"},
          {name:"Empty Bar Bench", sets:"2x10"},
          {name:"Progressive Warm-up Sets", sets:"50%, 70%, 85%"}
        ]},
        {title:"Main Bench", moves:[
          {name:"Bench Press", sets:"5x3-5", tip:"85-95% 1RM"},
          {name:"Pause Bench Press", sets:"3x3", tip:"3-second pause"},
          {name:"Close-grip Bench", sets:"3x5-6"},
        ]},
        {title:"Accessory", moves:[
          {name:"Barbell Rows", sets:"4x6-8"},
          {name:"Weighted Dips", sets:"3x8-10"},
          {name:"Face Pulls", sets:"3x15-20"},
        ]}
      ]},
      {day:"Volume Bench Day", blocks:[
        {title:"Bench Variations", moves:[
          {name:"Bench Press", sets:"6x6", tip:"75-80% 1RM"},
          {name:"Incline Barbell Press", sets:"4x8-10"},
          {name:"Dumbbell Bench Press", sets:"3x10-12"},
          {name:"Incline DB Press", sets:"3x10-12"},
        ]},
        {title:"Supporting Muscles", moves:[
          {name:"Seated Cable Row", sets:"4x8-10"},
          {name:"DB Flyes", sets:"3x12-15"},
          {name:"Overhead Press", sets:"3x8-10"},
          {name:"Tricep Close-grip Press", sets:"3x10-12"},
        ]}
      ]},
      {day:"Speed & Power Bench", blocks:[
        {title:"Dynamic Warm-up", moves:[
          {name:"Band Chest Press", sets:"2x15"},
          {name:"Med Ball Chest Pass", sets:"2x10"},
          {name:"Plyometric Push-ups", sets:"2x5"}
        ]},
        {title:"Speed Work", moves:[
          {name:"Speed Bench Press", sets:"8x3", tip:"50-60% 1RM + bands"},
          {name:"Floor Press", sets:"4x5"},
          {name:"DB Speed Press", sets:"5x5"},
        ]},
        {title:"Power Accessories", moves:[
          {name:"Medicine Ball Slams", sets:"4x8"},
          {name:"Explosive Push-ups", sets:"4x6"},
          {name:"Band-resisted Bench", sets:"3x8"},
          {name:"T-Bar Rows", sets:"4x8"},
        ]}
      ]},
      {day:"Bench Technique & Recovery", blocks:[
        {title:"Technique Work", moves:[
          {name:"Pin Press (various heights)", sets:"4x5"},
          {name:"Spoto Press", sets:"3x6", tip:"1-inch pause off chest"},
          {name:"Tempo Bench", sets:"3x5", tip:"3 sec down, 1 sec pause"},
        ]},
        {title:"Weak Point Training", moves:[
          {name:"Board Press", sets:"3x5"},
          {name:"Slingshot Bench", sets:"3x8"},
          {name:"Chain/Band Bench", sets:"3x6"},
        ]},
        {title:"Prehab & Mobility", moves:[
          {name:"Band External Rotations", sets:"3x15/side"},
          {name:"Shoulder Dislocations", sets:"3x10"},
          {name:"Chest Stretches", sets:"3x30s"},
          {name:"Thoracic Spine Mobility", sets:"2x10"},
        ]}
      ]}
    ]
  },
  {
    name:"Gym Bench & Upper Focus 3d",
    minDays:3, maxDays:3, levels:["beginner","intermediate"], equipment:["gym","any"],
    days:[
      {day:"Bench & Chest Focus", blocks:[
        {title:"Warm-up", moves:[
          {name:"Treadmill", sets:"5 min"},
          {name:"Arm Circles", sets:"2x10"},
          {name:"Band Pull-aparts", sets:"2x15"}
        ]},
        {title:"Bench Progression", moves:[
          {name:"Barbell Bench Press", sets:"4x8-10"},
          {name:"Incline DB Press", sets:"3x8-10"},
          {name:"Machine Chest Press", sets:"3x10-12"},
          {name:"Pec Deck Flyes", sets:"3x12-15"},
        ]},
        {title:"Supporting", moves:[
          {name:"Seated Cable Row", sets:"3x10"},
          {name:"Lat Pulldown", sets:"3x10"},
          {name:"Tricep Pushdowns", sets:"3x12"},
        ]}
      ]},
      {day:"Back & Pulling", blocks:[
        {title:"Back Development", moves:[
          {name:"Bent-over Barbell Row", sets:"4x8-10"},
          {name:"T-Bar Row", sets:"3x10"},
          {name:"Cable Rows (various grips)", sets:"3x10-12"},
          {name:"Lat Pulldown Wide", sets:"3x10-12"},
          {name:"Face Pulls", sets:"3x15"},
        ]},
        {title:"Biceps", moves:[
          {name:"Barbell Curls", sets:"3x10"},
          {name:"Hammer Curls", sets:"3x12"},
          {name:"Cable Curls", sets:"3x12"},
        ]}
      ]},
      {day:"Shoulders & Arms", blocks:[
        {title:"Shoulder Development", moves:[
          {name:"Military Press", sets:"4x8-10"},
          {name:"DB Shoulder Press", sets:"3x10"},
          {name:"Lateral Raise Machine", sets:"3x12-15"},
          {name:"Rear Delt Machine", sets:"3x12-15"},
          {name:"Cable Lateral Raises", sets:"3x15"},
        ]},
        {title:"Arms Superset", moves:[
          {name:"Close-grip Bench Press", sets:"3x10"},
          {name:"Preacher Curls", sets:"3x10"},
          {name:"Overhead Tricep Extension", sets:"3x12"},
          {name:"Cable Hammer Curls", sets:"3x12"},
        ]}
      ]}
    ]
  },

  // === BEGINNER-FOCUSED WORKOUTS ===

  {
    name:"Complete Beginner Bodyweight 2-3d",
    minDays:2, maxDays:3, levels:["beginner"], equipment:["none","any"],
    days:[
      { day:"Full Body A",
        blocks:[
          {title:"Warm-up", moves:[
            {name:"March in Place", sets:"2 min", tip:"Get your heart rate up gently"},
            {name:"Arm Circles", sets:"10 forward + 10 back"},
            {name:"Leg Swings", sets:"10 each leg"},
            {name:"Torso Twists", sets:"10 each side"}
          ]},
          {title:"Basic Strength", moves:[
            {name:"Wall Push-ups", sets:"2x5-8", tip:"Stand arm's length from wall, push against it"},
            {name:"Chair-Assisted Squats", sets:"2x5-8", tip:"Use chair for support, focus on form"},
            {name:"Modified Plank (knees)", sets:"2x15-30s", tip:"Start on knees, progress to full plank"},
            {name:"Standing Marches", sets:"2x10 each leg", tip:"Lift knees to hip height"},
            {name:"Seated Leg Extensions", sets:"2x8 each leg", tip:"Sit in chair, extend leg straight"}
          ]},
          {title:"Cool Down", moves:[
            {name:"Deep Breathing", sets:"2 min"},
            {name:"Gentle Stretching", sets:"5 min", tip:"Hold each stretch 20-30 seconds"}
          ]}
        ]},
      { day:"Full Body B",
        blocks:[
          {title:"Warm-up", moves:[
            {name:"Light Walking", sets:"3 min"},
            {name:"Shoulder Rolls", sets:"10 forward + 10 back"},
            {name:"Hip Circles", sets:"5 each direction"}
          ]},
          {title:"Progressive Movements", moves:[
            {name:"Incline Push-ups", sets:"2x5-10", tip:"Use stairs or bench, higher = easier"},
            {name:"Glute Bridges", sets:"2x8-12", tip:"Squeeze glutes at top"},
            {name:"Assisted Lunges", sets:"2x5 each leg", tip:"Hold wall or chair for balance"},
            {name:"Side Plank (modified)", sets:"2x10-20s each", tip:"On knees if needed"},
            {name:"Calf Raises", sets:"2x10-15", tip:"Hold chair for balance"}
          ]},
          {title:"Flexibility", moves:[
            {name:"Cat-Cow Stretch", sets:"10 reps"},
            {name:"Child's Pose", sets:"30s"},
            {name:"Simple Spinal Twist", sets:"30s each side"}
          ]}
        ]},
      { day:"Active Recovery",
        blocks:[
          {title:"Gentle Movement", moves:[
            {name:"Easy Walking", sets:"10-15 min", tip:"Focus on breathing and posture"},
            {name:"Basic Stretching Routine", sets:"10 min", tip:"All major muscle groups"},
            {name:"Balance Practice", sets:"Stand on one foot 10s each", tip:"Use wall for support"}
          ]}
        ]}
    ]
  },

  {
    name:"Starter Home Gym 2-3d",
    minDays:2, maxDays:3, levels:["beginner"], equipment:["dumbbells","any"],
    days:[
      { day:"Upper Body Focus",
        blocks:[
          {title:"Warm-up", moves:[
            {name:"Arm Swings", sets:"10 each direction"},
            {name:"Light DB Raises", sets:"Use 2-5 lb weights, 10 reps"},
            {name:"Shoulder Shrugs", sets:"10 reps"}
          ]},
          {title:"Basic Upper Body", moves:[
            {name:"Seated DB Press", sets:"2x6-10", tip:"Sit in chair with back support"},
            {name:"Bent-over DB Row", sets:"2x6-10", tip:"Bend at hips, keep back straight"},
            {name:"DB Chest Press (floor)", sets:"2x8-12", tip:"Lie on floor, press up"},
            {name:"Seated DB Curls", sets:"2x8-12", tip:"Control the weight, no swinging"},
            {name:"DB Tricep Extensions", sets:"2x8-12", tip:"Overhead, behind head"}
          ]},
          {title:"Cool Down", moves:[
            {name:"Arm Stretches", sets:"30s each"},
            {name:"Chest Doorway Stretch", sets:"30s"}
          ]}
        ]},
      { day:"Lower Body Focus",
        blocks:[
          {title:"Warm-up", moves:[
            {name:"Bodyweight Squats", sets:"10 reps", tip:"Practice form first"},
            {name:"Leg Swings", sets:"10 each leg"},
            {name:"Hip Circles", sets:"5 each direction"}
          ]},
          {title:"Basic Lower Body", moves:[
            {name:"Goblet Squats", sets:"2x8-12", tip:"Hold light DB at chest"},
            {name:"DB Deadlifts", sets:"2x8-10", tip:"Start light, focus on hip hinge"},
            {name:"Stationary Lunges", sets:"2x6 each leg", tip:"Hold DBs for balance"},
            {name:"Calf Raises (weighted)", sets:"2x12-15", tip:"Hold DB for resistance"},
            {name:"Wall Sits", sets:"2x20-45s", tip:"Back against wall, slide down"}
          ]},
          {title:"Stretching", moves:[
            {name:"Quad Stretch", sets:"30s each leg"},
            {name:"Hamstring Stretch", sets:"30s each leg"},
            {name:"Hip Flexor Stretch", sets:"30s each side"}
          ]}
        ]},
      { day:"Full Body Light",
        blocks:[
          {title:"Movement Prep", moves:[
            {name:"Gentle Movement", sets:"5 min", tip:"Walk, march, or bike easy"}
          ]},
          {title:"Light Circuit", moves:[
            {name:"DB Step-ups", sets:"2x5 each leg", tip:"Use sturdy step or box"},
            {name:"Standing DB Press", sets:"2x8-10", tip:"Light weight, focus on form"},
            {name:"DB High Pulls", sets:"2x8-10", tip:"Pull from hips to chest level"},
            {name:"Plank Hold", sets:"2x15-30s", tip:"On knees if needed"},
            {name:"DB Farmer Walks", sets:"2x20 steps", tip:"Walk with DBs at sides"}
          ]}
        ]}
    ]
  },

  {
    name:"First-Timer Gym Program 2-3d",
    minDays:2, maxDays:3, levels:["beginner"], equipment:["gym","any"],
    days:[
      { day:"Machine Introduction A",
        blocks:[
          {title:"Cardio Warm-up", moves:[
            {name:"Treadmill Walk", sets:"5-8 min", tip:"3.0-3.5 mph, slight incline"},
            {name:"Dynamic Stretching", sets:"5 min", tip:"Leg swings, arm circles"}
          ]},
          {title:"Machine Basics", moves:[
            {name:"Chest Press Machine", sets:"2x8-12", tip:"Start with light weight"},
            {name:"Lat Pulldown Machine", sets:"2x8-12", tip:"Pull to upper chest"},
            {name:"Leg Press Machine", sets:"2x10-15", tip:"Don't lock knees fully"},
            {name:"Seated Row Machine", sets:"2x8-12", tip:"Squeeze shoulder blades"},
            {name:"Leg Curl Machine", sets:"2x10-12", tip:"Control both up and down"}
          ]},
          {title:"Core & Stretch", moves:[
            {name:"Assisted Plank", sets:"2x15-30s", tip:"Use knees if needed"},
            {name:"Machine Stretching", sets:"5-8 min", tip:"Use guided stretch machines"}
          ]}
        ]},
      { day:"Machine Introduction B",
        blocks:[
          {title:"Warm-up", moves:[
            {name:"Stationary Bike", sets:"5-8 min", tip:"Easy pace, get familiar"},
            {name:"Arm/Leg Swings", sets:"2 min"}
          ]},
          {title:"Different Machines", moves:[
            {name:"Shoulder Press Machine", sets:"2x8-12", tip:"Adjust seat height properly"},
            {name:"Cable Row (seated)", sets:"2x8-12", tip:"Keep torso upright"},
            {name:"Leg Extension Machine", sets:"2x10-12", tip:"Controlled movement"},
            {name:"Pec Fly Machine", sets:"2x10-12", tip:"Slight bend in elbows"},
            {name:"Calf Raise Machine", sets:"2x12-15", tip:"Full range of motion"}
          ]},
          {title:"Cardio Finish", moves:[
            {name:"Elliptical", sets:"10-15 min", tip:"Low resistance, steady pace"},
            {name:"Cool-down Stretches", sets:"5 min"}
          ]}
        ]},
      { day:"Light Free Weights",
        blocks:[
          {title:"Preparation", moves:[
            {name:"Treadmill", sets:"5 min", tip:"Warm up thoroughly"},
            {name:"Bodyweight Movements", sets:"Squats, push-ups (wall), 5 each"}
          ]},
          {title:"Basic Free Weights", moves:[
            {name:"Goblet Squats", sets:"2x8-10", tip:"Light dumbbell, focus on form"},
            {name:"Dumbbell Rows", sets:"2x8 each arm", tip:"Use bench for support"},
            {name:"Dumbbell Press (seated)", sets:"2x8-10", tip:"Back supported"},
            {name:"Dumbbell Deadlifts", sets:"2x8-10", tip:"Very light weight first"},
            {name:"Plank", sets:"2x20-30s", tip:"Modify as needed"}
          ]},
          {title:"Recovery", moves:[
            {name:"Walking", sets:"5 min cool-down"},
            {name:"Full Body Stretch", sets:"8-10 min"}
          ]}
        ]}
    ]
  },

  {
    name:"Senior-Friendly Strength 2-3d",
    minDays:2, maxDays:3, levels:["beginner"], equipment:["dumbbells","none","any"],
    days:[
      { day:"Seated Strength",
        blocks:[
          {title:"Gentle Warm-up", moves:[
            {name:"Seated Marching", sets:"2 min", tip:"Lift knees alternately"},
            {name:"Arm Circles (seated)", sets:"10 each direction"},
            {name:"Ankle Circles", sets:"10 each direction, both feet"},
            {name:"Neck Rolls", sets:"5 slow rolls each direction"}
          ]},
          {title:"Chair Exercises", moves:[
            {name:"Seated Chest Press", sets:"2x8-12", tip:"Light DBs or resistance band"},
            {name:"Seated Rows", sets:"2x8-12", tip:"Pull elbows back, squeeze shoulder blades"},
            {name:"Seated Leg Extensions", sets:"2x8 each leg", tip:"Extend leg straight out"},
            {name:"Seated Bicep Curls", sets:"2x10-12", tip:"Light weights, control movement"},
            {name:"Chair Stands", sets:"2x5-8", tip:"Stand up and sit down without hands"}
          ]},
          {title:"Balance & Flexibility", moves:[
            {name:"Standing Balance", sets:"30s each leg", tip:"Hold chair for support"},
            {name:"Seated Spinal Twist", sets:"5 each direction"},
            {name:"Shoulder/Neck Stretches", sets:"30s each"}
          ]}
        ]},
      { day:"Standing Strength",
        blocks:[
          {title:"Movement Prep", moves:[
            {name:"Gentle Walking", sets:"3-5 min", tip:"Around house or in place"},
            {name:"Joint Mobility", sets:"Move all joints gently, 30s each"}
          ]},
          {title:"Standing Exercises", moves:[
            {name:"Wall Push-ups", sets:"2x5-10", tip:"Stand arm's length from wall"},
            {name:"Counter Squats", sets:"2x5-8", tip:"Hold counter/table for support"},
            {name:"Standing Side Bends", sets:"2x8 each side", tip:"Light DB or no weight"},
            {name:"Heel-to-Toe Walk", sets:"10 steps forward, 10 back", tip:"Use wall for balance"},
            {name:"Standing Calf Raises", sets:"2x10-15", tip:"Hold something for balance"}
          ]},
          {title:"Relaxation", moves:[
            {name:"Deep Breathing", sets:"3 min", tip:"4 counts in, 4 counts out"},
            {name:"Gentle Stretching", sets:"8 min", tip:"Hold stretches 30 seconds"}
          ]}
        ]},
      { day:"Flexibility Focus",
        blocks:[
          {title:"Gentle Movement", moves:[
            {name:"Slow Walking", sets:"5-10 min", tip:"Indoor or outdoor, your pace"}
          ]},
          {title:"Range of Motion", moves:[
            {name:"Shoulder Rolls & Shrugs", sets:"10 each"},
            {name:"Hip Circles", sets:"5 each direction"},
            {name:"Seated Forward Bend", sets:"Hold 30s", tip:"Reach toward toes gently"},
            {name:"Seated Side Stretch", sets:"30s each side"},
            {name:"Ankle Pumps", sets:"20 reps", tip:"Point and flex feet"}
          ]},
          {title:"Balance Training", moves:[
            {name:"Single Leg Stands", sets:"15-30s each", tip:"Progress gradually"},
            {name:"Heel-to-Toe Walking", sets:"10 steps each direction"},
            {name:"Standing on Tiptoes", sets:"5-10 reps", tip:"Hold for 2 seconds"}
          ]}
        ]}
    ]
  },

  // === ADVANCED TRAINING PROGRAMS ===

  {
    name:"Advanced Push/Pull/Legs 6d",
    minDays:6, maxDays:6, levels:["advanced"], equipment:["gym","any"],
    days:[
      { day:"Push (Chest Focus)",
        blocks:[
          {title:"Dynamic Warm-up", moves:[
            {name:"Band Pull-aparts", sets:"2x20"},
            {name:"Arm Circles & Shoulder Dislocations", sets:"2x15 each"},
            {name:"Light Chest Flies", sets:"1x15", tip:"Activation set"}
          ]},
          {title:"Heavy Compound", moves:[
            {name:"Barbell Bench Press", sets:"4x3-5", tip:"85-90% 1RM, rest 3-4 min"},
            {name:"Incline Dumbbell Press", sets:"4x6-8", tip:"Heavy, controlled tempo"},
            {name:"Weighted Dips", sets:"3x8-12", tip:"Add weight as needed"}
          ]},
          {title:"Volume Work", moves:[
            {name:"Cable Crossovers", sets:"4x12-15", tip:"Focus on squeeze"},
            {name:"Overhead Press", sets:"4x8-10", tip:"Strict form"},
            {name:"Lateral Raises (mechanical drop set)", sets:"3x12/10/8", tip:"Decrease weight each mini-set"},
            {name:"Close-grip Bench Press", sets:"3x10-12", tip:"Tricep emphasis"}
          ]},
          {title:"Finisher", moves:[
            {name:"Tricep Pushdowns", sets:"3x15-20", tip:"Pump work"},
            {name:"Diamond Push-ups", sets:"2xAMRAP", tip:"Burnout set"}
          ]}
        ]},
      { day:"Pull (Back Width)",
        blocks:[
          {title:"Activation", moves:[
            {name:"Band Pull-aparts", sets:"2x20"},
            {name:"Scapular Wall Slides", sets:"2x15"},
            {name:"Light Lat Pulldowns", sets:"1x15", tip:"Activation"}
          ]},
          {title:"Heavy Pulling", moves:[
            {name:"Weighted Pull-ups", sets:"4x4-6", tip:"Add weight, full ROM"},
            {name:"Barbell Rows", sets:"4x6-8", tip:"Heavy, strict form"},
            {name:"T-Bar Rows", sets:"4x8-10", tip:"Chest supported if available"}
          ]},
          {title:"Width & Volume", moves:[
            {name:"Wide-grip Lat Pulldowns", sets:"4x10-12", tip:"Focus on width"},
            {name:"Cable Rows (various grips)", sets:"3x12-15", tip:"Rotate grips each set"},
            {name:"Face Pulls", sets:"4x15-20", tip:"Rear delt focus"},
            {name:"Hammer Curls", sets:"3x12-15", tip:"Heavy, controlled"}
          ]},
          {title:"Bicep Finisher", moves:[
            {name:"Barbell Curls", sets:"3x10-12", tip:"Strict form"},
            {name:"Cable 21s", sets:"2 sets", tip:"7 bottom half + 7 top half + 7 full ROM"}
          ]}
        ]},
      { day:"Legs (Quad Focus)",
        blocks:[
          {title:"Mobility Prep", moves:[
            {name:"Leg Swings", sets:"10 each direction, each leg"},
            {name:"Walking Lunges", sets:"2x10 each leg", tip:"Bodyweight only"},
            {name:"Goblet Squats", sets:"2x15", tip:"Light weight, full ROM"}
          ]},
          {title:"Heavy Squats", moves:[
            {name:"Back Squats", sets:"5x3-5", tip:"85-92% 1RM, full depth"},
            {name:"Front Squats", sets:"4x6-8", tip:"Focus on core stability"},
            {name:"Bulgarian Split Squats", sets:"3x10 each leg", tip:"Weighted, rear foot elevated"}
          ]},
          {title:"Quad Volume", moves:[
            {name:"Leg Press", sets:"4x15-20", tip:"High rep, full ROM"},
            {name:"Walking Lunges", sets:"3x12 each leg", tip:"Weighted"},
            {name:"Leg Extensions", sets:"4x12-15", tip:"Slow negatives"},
            {name:"Sissy Squats", sets:"3x8-12", tip:"Bodyweight or assisted"}
          ]},
          {title:"Posterior Chain", moves:[
            {name:"Romanian Deadlifts", sets:"4x10-12", tip:"Focus on hamstring stretch"},
            {name:"Leg Curls", sets:"3x12-15", tip:"Controlled tempo"},
            {name:"Calf Raises", sets:"4x15-20", tip:"Full ROM, pause at top"}
          ]}
        ]},
      { day:"Push (Shoulder Focus)",
        blocks:[
          {title:"Shoulder Prep", moves:[
            {name:"Band Dislocations", sets:"2x15"},
            {name:"Arm Circles", sets:"10 forward/back each direction"},
            {name:"Light Lateral Raises", sets:"2x15", tip:"Activation"}
          ]},
          {title:"Heavy Pressing", moves:[
            {name:"Overhead Press", sets:"4x4-6", tip:"Standing, strict form"},
            {name:"Dumbbell Shoulder Press", sets:"4x8-10", tip:"Seated, heavy"},
            {name:"Push Press", sets:"3x5-6", tip:"Use leg drive, heavier load"}
          ]},
          {title:"Shoulder Development", moves:[
            {name:"Lateral Raise Tri-set", sets:"3 rounds", tip:"Front/Side/Rear raises, 12 each"},
            {name:"Arnold Press", sets:"3x10-12", tip:"Full ROM rotation"},
            {name:"Upright Rows", sets:"3x12-15", tip:"Wide grip, to chest level"},
            {name:"Shrugs", sets:"4x12-15", tip:"Heavy weight, hold squeeze"}
          ]},
          {title:"Tricep Emphasis", moves:[
            {name:"Close-grip Bench Press", sets:"4x8-10", tip:"Focus on triceps"},
            {name:"Overhead Tricep Extension", sets:"3x12-15", tip:"Stretch emphasis"},
            {name:"Tricep Dips", sets:"3x12-15", tip:"Weighted if possible"}
          ]}
        ]},
      { day:"Pull (Back Thickness)",
        blocks:[
          {title:"Movement Prep", moves:[
            {name:"Rowing Machine", sets:"5 min", tip:"Dynamic warm-up"},
            {name:"Band Pull-aparts", sets:"2x20"},
            {name:"Scapular Retractions", sets:"2x15"}
          ]},
          {title:"Heavy Deadlifts", moves:[
            {name:"Conventional Deadlifts", sets:"4x3-5", tip:"85-90% 1RM, perfect form"},
            {name:"Rack Pulls", sets:"3x5-6", tip:"Above knee, heavier than conventional"},
            {name:"Chest-supported Rows", sets:"4x8-10", tip:"Heavy, strict form"}
          ]},
          {title:"Thickness Work", moves:[
            {name:"Cable Rows (close grip)", sets:"4x10-12", tip:"Squeeze shoulder blades"},
            {name:"One-arm Dumbbell Rows", sets:"3x10 each arm", tip:"Heavy, full ROM"},
            {name:"Reverse Flies", sets:"4x15-18", tip:"Rear delt focus"},
            {name:"Hyperextensions", sets:"3x12-15", tip:"Weighted if available"}
          ]},
          {title:"Arm Specialization", moves:[
            {name:"Preacher Curls", sets:"4x8-12", tip:"Strict form, full ROM"},
            {name:"Hammer Curls", sets:"3x10-12", tip:"Heavy"},
            {name:"Cable Curls", sets:"3x12-15", tip:"Constant tension"}
          ]}
        ]},
      { day:"Legs (Hamstring/Glute Focus)",
        blocks:[
          {title:"Hip Activation", moves:[
            {name:"Glute Bridges", sets:"2x15", tip:"Bodyweight, squeeze glutes"},
            {name:"Clamshells", sets:"2x15 each side"},
            {name:"Leg Swings", sets:"10 each direction, each leg"}
          ]},
          {title:"Heavy Posterior", moves:[
            {name:"Romanian Deadlifts", sets:"4x5-6", tip:"Heavy, full hip hinge"},
            {name:"Stiff Leg Deadlifts", sets:"4x8-10", tip:"Focus on hamstring stretch"},
            {name:"Good Mornings", sets:"3x8-10", tip:"Moderate weight, perfect form"}
          ]},
          {title:"Glute Development", moves:[
            {name:"Hip Thrusts", sets:"4x10-12", tip:"Heavy barbell, full ROM"},
            {name:"Single-leg RDLs", sets:"3x8 each leg", tip:"Balance and stretch"},
            {name:"Reverse Lunges", sets:"3x12 each leg", tip:"Focus on glute activation"},
            {name:"Leg Curls", sets:"4x12-15", tip:"Various foot positions"}
          ]},
          {title:"Quad Maintenance", moves:[
            {name:"Front Squats", sets:"3x10-12", tip:"Lighter than Monday"},
            {name:"Leg Press", sets:"3x15-18", tip:"Higher rep maintenance"},
            {name:"Calf Raises", sets:"4x18-20", tip:"Both straight and bent knee"}
          ]}
        ]}
    ]
  },

  {
    name:"Advanced Upper/Lower Power 4d",
    minDays:4, maxDays:4, levels:["advanced"], equipment:["gym","any"],
    days:[
      { day:"Upper Power",
        blocks:[
          {title:"Neural Activation", moves:[
            {name:"Medicine Ball Slams", sets:"3x8", tip:"Explosive, full body"},
            {name:"Clapping Push-ups", sets:"3x5", tip:"Focus on speed"},
            {name:"Band Pull-aparts", sets:"2x20", tip:"Fast tempo"}
          ]},
          {title:"Power Development", moves:[
            {name:"Speed Bench Press", sets:"6x3", tip:"50-60% 1RM, explosive up"},
            {name:"Plyometric Push-ups", sets:"4x5", tip:"Various hand positions"},
            {name:"Power Rows", sets:"5x5", tip:"Explosive pull, controlled return"},
            {name:"Push Press", sets:"5x3", tip:"Leg drive, overhead explosion"}
          ]},
          {title:"Strength-Speed", moves:[
            {name:"Close-grip Bench Press", sets:"4x6", tip:"70-75% 1RM, fast concentric"},
            {name:"Weighted Pull-ups", sets:"4x5", tip:"Explosive up"},
            {name:"Dumbbell Power Clean", sets:"4x6 each arm", tip:"Hip extension focus"}
          ]},
          {title:"Volume Finish", moves:[
            {name:"Cable Flies", sets:"3x12-15", tip:"Constant tension"},
            {name:"Face Pulls", sets:"3x15-20", tip:"Rear delt focus"},
            {name:"Barbell Curls", sets:"3x10-12", tip:"Moderate weight"}
          ]}
        ]},
      { day:"Lower Power", 
        blocks:[
          {title:"Dynamic Prep", moves:[
            {name:"Jump Rope", sets:"3 min", tip:"Increase intensity"},
            {name:"Bodyweight Jump Squats", sets:"3x8", tip:"Land softly"},
            {name:"High Knees", sets:"3x20 steps", tip:"Fast turnover"}
          ]},
          {title:"Explosive Power", moves:[
            {name:"Box Jumps", sets:"5x3", tip:"Focus on landing mechanics"},
            {name:"Depth Jumps", sets:"4x3", tip:"18-24 inch drop, immediate jump"},
            {name:"Broad Jumps", sets:"5x3", tip:"Stick the landing"},
            {name:"Single-leg Bounds", sets:"3x5 each leg", tip:"Distance and height"}
          ]},
          {title:"Speed-Strength", moves:[
            {name:"Jump Squats", sets:"6x3", tip:"30-40% 1RM, explosive"},
            {name:"Speed Deadlifts", sets:"5x3", tip:"50-60% 1RM, fast off floor"},
            {name:"Split Jump Lunges", sets:"4x6 each leg", tip:"Switch legs in air"}
          ]},
          {title:"Strength Finish", moves:[
            {name:"Back Squats", sets:"3x8", tip:"Moderate weight, controlled"},
            {name:"Romanian Deadlifts", sets:"3x10", tip:"Hamstring focus"},
            {name:"Bulgarian Split Squats", sets:"3x10 each leg", tip:"Bodyweight"}
          ]}
        ]},
      { day:"Upper Hypertrophy",
        blocks:[
          {title:"Warm-up", moves:[
            {name:"Rowing Machine", sets:"5 min", tip:"Moderate pace"},
            {name:"Arm Circles", sets:"2x15 each direction"},
            {name:"Band Pull-aparts", sets:"2x15"}
          ]},
          {title:"Heavy Compounds", moves:[
            {name:"Incline Barbell Press", sets:"4x6-8", tip:"75-80% 1RM"},
            {name:"Weighted Pull-ups", sets:"4x6-8", tip:"Add weight"},
            {name:"Overhead Press", sets:"4x8-10", tip:"Standing, strict"},
            {name:"Barbell Rows", sets:"4x8-10", tip:"Heavy, controlled"}
          ]},
          {title:"Volume Work", moves:[
            {name:"Dumbbell Bench Press", sets:"3x10-12", tip:"Squeeze at top"},
            {name:"Cable Rows", sets:"3x12-15", tip:"Various grips"},
            {name:"Lateral Raises", sets:"4x12-15", tip:"Control the weight"},
            {name:"Dips", sets:"3x12-15", tip:"Lean forward for chest"},
            {name:"Barbell Curls", sets:"3x10-12", tip:"Strict form"},
            {name:"Close-grip Push-ups", sets:"3xAMRAP", tip:"Tricep focus"}
          ]}
        ]},
      { day:"Lower Hypertrophy",
        blocks:[
          {title:"Movement Prep", moves:[
            {name:"Stationary Bike", sets:"5 min", tip:"Gradual increase"},
            {name:"Leg Swings", sets:"10 each direction, each leg"},
            {name:"Bodyweight Squats", sets:"2x15", tip:"Full ROM"}
          ]},
          {title:"Compound Strength", moves:[
            {name:"Back Squats", sets:"4x8-10", tip:"Control tempo, full depth"},
            {name:"Romanian Deadlifts", sets:"4x8-10", tip:"Hip hinge focus"},
            {name:"Front Squats", sets:"3x10-12", tip:"Core emphasis"},
            {name:"Sumo Deadlifts", sets:"3x8-10", tip:"Wide stance"}
          ]},
          {title:"Isolation Volume", moves:[
            {name:"Leg Press", sets:"4x15-18", tip:"Full ROM"},
            {name:"Leg Curls", sets:"4x12-15", tip:"Slow negatives"},
            {name:"Leg Extensions", sets:"4x15-18", tip:"Peak contraction"},
            {name:"Walking Lunges", sets:"3x12 each leg", tip:"Controlled pace"},
            {name:"Calf Raises", sets:"4x15-20", tip:"Straight and bent knee"},
            {name:"Glute Ham Raises", sets:"3x10-15", tip:"Eccentric emphasis"}
          ]}
        ]}
    ]
  },

  {
    name:"Advanced Conjugate Method 4d",
    minDays:4, maxDays:4, levels:["advanced"], equipment:["gym","any"],
    days:[
      { day:"Max Effort Upper",
        blocks:[
          {title:"CNS Activation", moves:[
            {name:"Medicine Ball Throws", sets:"3x5", tip:"Explosive, various angles"},
            {name:"Band Pull-aparts", sets:"2x20", tip:"Fast tempo"},
            {name:"Light Bench Press", sets:"2x8", tip:"50% 1RM, speed focus"}
          ]},
          {title:"Max Effort Work", moves:[
            {name:"1RM Bench Variation", sets:"Work up to 1-3RM", tip:"Pin press, floor press, or close-grip"},
            {name:"Max Effort Row", sets:"Work up to 3-5RM", tip:"Chest supported or Pendlay row"}
          ]},
          {title:"Supplemental Work", moves:[
            {name:"Close-grip Bench Press", sets:"3x6-8", tip:"75-85% effort level"},
            {name:"Weighted Pull-ups", sets:"3x6-8", tip:"Heavy"},
            {name:"Overhead Press", sets:"3x8-10", tip:"Strict form"}
          ]},
          {title:"Volume Accessories", moves:[
            {name:"Dumbbell Rows", sets:"3x10-12 each arm"},
            {name:"Dips", sets:"3x12-15"},
            {name:"Face Pulls", sets:"3x15-20"},
            {name:"Barbell Curls", sets:"3x10-12"},
            {name:"Tricep Extensions", sets:"3x12-15"}
          ]}
        ]},
      { day:"Max Effort Lower",
        blocks:[
          {title:"Movement Prep", moves:[
            {name:"Box Jumps", sets:"3x5", tip:"Sub-maximal, landing focus"},
            {name:"Leg Swings", sets:"10 each direction, each leg"},
            {name:"Goblet Squats", sets:"2x10", tip:"Mobility focus"}
          ]},
          {title:"Max Effort Work", moves:[
            {name:"1RM Squat Variation", sets:"Work up to 1-3RM", tip:"Box squat, pin squat, or front squat"},
            {name:"Max Effort Deadlift", sets:"Work up to 1-3RM", tip:"Deficit, rack pull, or sumo variation"}
          ]},
          {title:"Supplemental Strength", moves:[
            {name:"Good Mornings", sets:"3x6-8", tip:"Heavy, perfect form"},
            {name:"Romanian Deadlifts", sets:"3x8-10", tip:"Focus on posterior chain"}
          ]},
          {title:"Accessory Volume", moves:[
            {name:"Leg Press", sets:"3x15-20"},
            {name:"Leg Curls", sets:"3x12-15"},
            {name:"Walking Lunges", sets:"3x12 each leg"},
            {name:"Glute Ham Raises", sets:"3x10-15"},
            {name:"Calf Raises", sets:"4x15-20"}
          ]}
        ]},
      { day:"Dynamic Effort Upper",
        blocks:[
          {title:"CNS Prep", moves:[
            {name:"Medicine Ball Slams", sets:"3x8", tip:"Explosive"},
            {name:"Clapping Push-ups", sets:"3x5"},
            {name:"Band Pull-aparts", sets:"2x20", tip:"Fast"}
          ]},
          {title:"Speed Work", moves:[
            {name:"Speed Bench Press", sets:"8x3", tip:"50-60% + bands/chains"},
            {name:"Speed Rows", sets:"8x3", tip:"Explosive pull, pause"},
            {name:"Speed Overhead Press", sets:"6x3", tip:"45-55% 1RM"}
          ]},
          {title:"Repetition Method", moves:[
            {name:"Dumbbell Bench Press", sets:"3x12-15", tip:"Moderate weight, high reps"},
            {name:"Cable Rows", sets:"3x15-20", tip:"Various grips"},
            {name:"Lateral Raises", sets:"4x15-20", tip:"Light weight, perfect form"}
          ]},
          {title:"High Volume Finish", moves:[
            {name:"Push-ups", sets:"3xAMRAP", tip:"Various hand positions"},
            {name:"Band Pull-aparts", sets:"3x25-30"},
            {name:"Hammer Curls", sets:"3x15-20"},
            {name:"Tricep Pushdowns", sets:"3x20-25"}
          ]}
        ]},
      { day:"Dynamic Effort Lower",
        blocks:[
          {title:"Jump Training", moves:[
            {name:"Depth Jumps", sets:"4x3", tip:"20-30 inch drop"},
            {name:"Broad Jumps", sets:"4x3", tip:"Maximum distance"},
            {name:"Vertical Jumps", sets:"4x3", tip:"Maximum height"}
          ]},
          {title:"Speed Squats", moves:[
            {name:"Box Squats w/ Bands", sets:"10x2", tip:"50-60% + 25% band tension"},
            {name:"Speed Deadlifts", sets:"8x1", tip:"60-70% 1RM, fast off floor"}
          ]},
          {title:"Posterior Chain", moves:[
            {name:"Romanian Deadlifts", sets:"4x10-12", tip:"Moderate weight"},
            {name:"Glute Ham Raises", sets:"3x12-15", tip:"Slow eccentric"},
            {name:"Reverse Hyperextensions", sets:"3x15-20", tip:"If available"}
          ]},
          {title:"Volume Work", moves:[
            {name:"Split Squats", sets:"3x12 each leg"},
            {name:"Leg Curls", sets:"3x15-20"},
            {name:"Leg Extensions", sets:"3x20-25", tip:"Light weight, pump"},
            {name:"Calf Raises", sets:"4x20-25", tip:"Various foot positions"}
          ]}
        ]}
    ]
  },

  {
    name:"Advanced Athletic Performance 5d",
    minDays:5, maxDays:5, levels:["advanced"], equipment:["gym","any"],
    days:[
      { day:"Power & Explosiveness",
        blocks:[
          {title:"Neural Activation", moves:[
            {name:"Jump Rope", sets:"5 min", tip:"Increase intensity gradually"},
            {name:"Dynamic Stretching", sets:"10 min", tip:"Sport-specific movements"},
            {name:"Medicine Ball Throws", sets:"3x8 each direction", tip:"Explosive"}
          ]},
          {title:"Olympic Lifts", moves:[
            {name:"Power Clean", sets:"5x3", tip:"75-85% 1RM, perfect form"},
            {name:"Push Press", sets:"5x3", tip:"Focus on leg drive"},
            {name:"High Pulls", sets:"4x5", tip:"Explosive hip extension"}
          ]},
          {title:"Plyometric Circuit", moves:[
            {name:"Depth Jumps", sets:"4x3", tip:"24-30 inch drop"},
            {name:"Lateral Bounds", sets:"3x5 each direction", tip:"Stick landing"},
            {name:"Medicine Ball Slam", sets:"3x8", tip:"Full body explosion"},
            {name:"Clapping Push-ups", sets:"3x5", tip:"Maximum height"}
          ]},
          {title:"Speed-Strength", moves:[
            {name:"Jump Squats", sets:"5x3", tip:"30% 1RM + jump"},
            {name:"Speed Bench", sets:"6x3", tip:"50% 1RM, explosive"},
            {name:"Kettlebell Swings", sets:"4x15", tip:"Hip snap focus"}
          ]}
        ]},
      { day:"Max Strength Upper",
        blocks:[
          {title:"Preparation", moves:[
            {name:"Rowing Machine", sets:"8 min", tip:"Build to moderate intensity"},
            {name:"Shoulder Mobility", sets:"5 min", tip:"Band dislocations, circles"},
            {name:"Activation Sets", sets:"3 sets ascending weight", tip:"Build to working weight"}
          ]},
          {title:"Maximum Strength", moves:[
            {name:"Bench Press", sets:"5x2-3", tip:"87-95% 1RM, 3-4 min rest"},
            {name:"Weighted Pull-ups", sets:"4x3-5", tip:"Heavy, full ROM"},
            {name:"Overhead Press", sets:"4x3-5", tip:"Standing, no leg drive"}
          ]},
          {title:"Supplemental Work", moves:[
            {name:"Close-grip Bench Press", sets:"3x6-8", tip:"80% of regular bench"},
            {name:"Barbell Rows", sets:"4x6-8", tip:"Heavy, strict"},
            {name:"Weighted Dips", sets:"3x8-10", tip:"Add weight as needed"}
          ]},
          {title:"Volume Accessories", moves:[
            {name:"Incline Dumbbell Press", sets:"3x10-12"},
            {name:"Cable Rows", sets:"3x12-15", tip:"Squeeze shoulder blades"},
            {name:"Lateral Raises", sets:"4x12-15", tip:"Control eccentric"},
            {name:"Barbell Curls", sets:"3x10-12"},
            {name:"Close-grip Push-ups", sets:"2xAMRAP"}
          ]}
        ]},
      { day:"Max Strength Lower",
        blocks:[
          {title:"Movement Preparation", moves:[
            {name:"Bike or Row", sets:"8 min", tip:"Increase intensity"},
            {name:"Hip Mobility Circuit", sets:"8 min", tip:"90/90, hip flexor stretch"},
            {name:"Glute Activation", sets:"Clamshells, bridges, 2x15 each"}
          ]},
          {title:"Maximum Strength", moves:[
            {name:"Back Squat", sets:"5x2-3", tip:"87-95% 1RM, full depth"},
            {name:"Deadlift", sets:"4x2-3", tip:"90-97% 1RM, perfect form"},
            {name:"Front Squat", sets:"4x3-5", tip:"Heavy, core stability"}
          ]},
          {title:"Posterior Development", moves:[
            {name:"Romanian Deadlift", sets:"4x6-8", tip:"Heavy, hip hinge"},
            {name:"Good Mornings", sets:"3x8-10", tip:"Perfect spine position"},
            {name:"Glute Ham Raises", sets:"3x10-12", tip:"Slow eccentric"}
          ]},
          {title:"Unilateral & Volume", moves:[
            {name:"Bulgarian Split Squats", sets:"3x10 each leg", tip:"Weighted"},
            {name:"Single-leg RDL", sets:"3x8 each leg", tip:"Balance and stretch"},
            {name:"Leg Curls", sets:"3x12-15", tip:"Various foot positions"},
            {name:"Calf Raises", sets:"4x15-20", tip:"Full ROM"}
          ]}
        ]},
      { day:"Conditioning & Work Capacity",
        blocks:[
          {title:"Aerobic Base", moves:[
            {name:"Steady State Cardio", sets:"20-30 min", tip:"65-75% max HR, nasal breathing"}
          ]},
          {title:"Anaerobic Power", moves:[
            {name:"Assault Bike Intervals", sets:"6x30s on, 90s off", tip:"All-out effort"},
            {name:"Rowing Intervals", sets:"5x250m, 1 min rest", tip:"Sub-maximal pace"},
            {name:"Prowler Push", sets:"4x40m", tip:"Heavy sled, walk back recovery"}
          ]},
          {title:"Metabolic Circuit", moves:[
            {name:"Kettlebell Complex", sets:"4 rounds, 45s work, 15s rest", tip:"Swing, clean, press, squat"},
            {name:"Battle Ropes", sets:"4x30s, 30s rest", tip:"Various patterns"},
            {name:"Box Step-ups", sets:"3x20 each leg", tip:"Weighted, controlled"}
          ]},
          {title:"Recovery Work", moves:[
            {name:"Easy Walk/Bike", sets:"10-15 min", tip:"Active recovery pace"},
            {name:"Mobility Flow", sets:"15 min", tip:"Full body stretching"}
          ]}
        ]},
      { day:"Hypertrophy & Volume",
        blocks:[
          {title:"Pre-fatigue", moves:[
            {name:"Cable Flies", sets:"3x15", tip:"Pre-exhaust chest"},
            {name:"Lateral Raises", sets:"3x15", tip:"Pre-fatigue delts"},
            {name:"Leg Extensions", sets:"3x15", tip:"Pre-exhaust quads"}
          ]},
          {title:"Compound Movements", moves:[
            {name:"Incline Dumbbell Press", sets:"4x10-12", tip:"Slow eccentric"},
            {name:"Weighted Pull-ups", sets:"4x8-10", tip:"Full ROM"},
            {name:"Front Squats", sets:"4x10-12", tip:"Tempo: 3 sec down"},
            {name:"Romanian Deadlift", sets:"4x12-15", tip:"Stretch emphasis"}
          ]},
          {title:"High Volume Isolation", moves:[
            {name:"Dumbbell Flies", sets:"4x12-15", tip:"Stretch and squeeze"},
            {name:"Cable Rows", sets:"4x15-18", tip:"Various grips"},
            {name:"Leg Press", sets:"4x20-25", tip:"Full ROM"},
            {name:"Leg Curls", sets:"4x15-20", tip:"Slow negatives"},
            {name:"Calf Raises", sets:"5x20-25", tip:"Peak contraction"}
          ]},
          {title:"Pump Finish", moves:[
            {name:"Push-up to Failure", sets:"3 sets"},
            {name:"Band Pull-aparts", sets:"3x30"},
            {name:"Bodyweight Squats", sets:"2x25"},
            {name:"Plank Hold", sets:"2x45-60s"}
          ]}
        ]}
    ]
  }
];
