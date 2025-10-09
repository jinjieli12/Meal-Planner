# Personalized Fitness/Nutrition Coach (No-backend Web App)

A simple privacy-friendly app that generates a 7‑day workout and meal plan from your inputs. Runs entirely in your browser (no server needed).

## Features
- Calculates TDEE (Mifflin‑St Jeor), applies goal surplus/deficit
- Sets macros (protein per kg, fat minimum %, remaining carbs)
- Filters meal suggestions by dietary restrictions
- Builds a 7‑day meal plan (3 meals + 2 snacks/day) from the local DB
- Generates a workout split based on days/week, experience, and equipment
- Exports meals/workouts to CSV
- Saves state to localStorage

## Run locally (VS Code)
1. **Download and unzip** the project.
2. Open the folder in **Visual Studio Code**.
3. Use one of the options:
   - **Option A (easiest):** Right‑click `index.html` > *Open with Live Server* (install the “Live Server” extension by Ritwick Dey if you don’t have it).
   - **Option B:** Start a simple static server:
     - Python: `python -m http.server 5500` then visit http://localhost:5500
     - Node: `npx serve` then visit the printed URL
   - **Option C:** Just double‑click `index.html` (some browsers restrict local file JS—if the page looks blank, use A or B).

## Customize
- **Meals:** edit `data/meals-db.js`. Add items with proper tags for restrictions.
- **Workouts:** edit `data/workouts-db.js`. Tweak templates, add equipment/levels.
- **Logic/UI:** `app.js` and `styles.css`.

## Notes
- This is **not medical advice**. Consult a professional before starting a diet or training program.
- All data stays on your device. No tracking, no network calls.


## New extras
- **Calorie cycling:** optional ±10% zig-zag across the week.
- **Grocery list:** auto-aggregated from meal plan; export to CSV.
- **Print/PDF:** print-optimized layout via the **Print / Save as PDF** button.
