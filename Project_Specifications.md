# GAME DESIGN DOCUMENT: [Insert Game Name, e.g., TopSpin Idle]
*Target Stack:* Pure Static HTML5 / CSS3 / Vanilla JavaScript (Netlify-Ready)
*Save Architecture:* Browser `localStorage` + JSON/Base64 Import/Export + Offline Progress

---

## 1. Core Premise & Theme
- **Game Concept / Pitch:** A spinning beyblade incremental game wherein a player launches a singular top to generate energy. Whilst generating energy the beyblade/top has to survive (against time or other rival tops) in a circular shaped arena or stadium within the given time period to progress throughout the game
- The incremental aspect is focused on the points which the player has gained throughout the round being: survival (or time to generate till stopped), and enemy elimination. The said elimination can only be dealt through either loss of speed or out-of-bounds.
    - The said points will be used as upgrades for the game to progress further; resulting in longer survival duration and larger amount of rival top eliminations

- **Visual Aesthetic:** Minimalistic look, sketch-like/outline-focused for testing

- **Primary Viewport:** 2D Top-down HTML5 Canvas showing circular stadium with spinning tops, collision sparks, and RPM gauges

---

## 2. Core Game Loop & Currencies
### A. The Currencies
- **Resource 1 RPM / Rotational Speed:**
  - Dynamic value that peaks upon launch and slowly decays over time from friction. Could be seen as health-points (HP)
- **Resource 2 Spin Energy:** 
  - Generated every second based on active RPM ($\text{Energy/sec} = \text{RPM} \times \text{Multiplier}$). Used for base upgrades such as top-speed,.
- **Resource 3 Parts:**
  - Earned from rival eliminations. Used for specialized upgrades of the beyblade's bodywork such as blades and bumpers.

### B. The Active Action (Launch / Ripcord)
- **Launch Mechanic:** Click/Hold "RIPCORD" button; speed is determined through timing. "Critical-Perfect" is possible.
- **Decay Formula:** 1 RPM loss per second as default; X% RPM loss based on beyblade hits/strikes [e.g., Top loses X% RPM per second based on Tip Friction and Air Drag]

### C. The Spectate Aspect
- **Battle Cam:** The main view for the player to see the beyblade they've upgraded in action.
    - This is where the survival against rival tops is displayed
- **Resource HUD:** All three resources are displayed as integers/floats with the perspective of "Total" and X resource per second.

---

## 3. Top Customization & Upgrades (Modular Parts)
*(Define what upgrades do to stats)*

1. **Tip / Driver (Friction & Movement):**
    - Level 0: Incapable of movement despite its RPM -> Level 20: Capable of movement and interchanging top speed
    - *Stat effect*: X-axis movement rate, Y-axis movement rate, Top-speed change frequency 
    - Level 1: Plastic Flat Tip -> Level 10: Magnetic Bearing Ball
    - *Stat effect:* Reduces RPM decay rate.

2. **Weight Disc / Core (Mass & Inertia):**
    - Level 1: Zinc Ring -> Level 10: Tungsten Heavy Forge
    - *Stat effect:* Increases top mass, makes collisions hit harder for knockback and damage to opponent's RPM.

3. **Launcher & Ripcord (Power & Multipliers):**
    - Level 1: Plastic Pullcord -> Level 10: High-Torque Motorized Bay
    - *Stat effect:* Higher starting RPM, chance for "Critical Launch" (+200% RPM).

4. **AI-Targetting System (Auto-target):**
    - Level 20: Targets the lowest RPM of the opponent to strike
    - *Stat effect:* Targetting/homing
    - *Prerequisite:* Movement upgrade has to be at least level 15 to access this customization.

---

## 4. Technical Requirements & Systems
- **File Structure:**
  - `index.html` (UI layout, canvas, upgrade tabs)
  - `style.css` (Responsive layout, neon/arcade styling, animations)
  - `main.js` (Game loop, physics simulation, upgrade logic, save/load)
- **Save System:**
  - `localStorage` autosave every 5 seconds.
  - Export Save to Clipboard (Base64 string) & Import Save modal.
  - "Hard Reset" button with confirmation prompt.
- **Offline Earnings:**
  - Calculates time elapsed since last save and awards simulated passive spin energy (capped at X hours).
- **Number Formatter:**
  - Compact notation support (e.g., `1,250`, `1.50M`, `2.34B`, `1.00e15`).

---

## 5. Additional Ideas / Notes / Constraints
- [Add any specific features, sound effects preferences, custom minigames, or custom physics behaviors you want]
- This has taken inspiration from the game "Johnny Upgrade" wherein you can only evolve/improve through time and achievements made through given time.
- The physics on the other hand takes inspiration to the beyblade franchise wherein you can almost command the tops to attacks. However, in this game you can only do so once you have access the upgrades. 