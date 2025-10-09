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
  }
];
