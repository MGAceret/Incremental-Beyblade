# Incremental-Beyblade — Upgrade Catalog-List

## Cost Formula
$$\text{Cost}(\text{Level}) = \lfloor \text{BaseCost} \times (\text{CostMultiplier})^\text{Level} \rfloor$$

---

## 1. Chassis/Beyblade Upgrades
| ID | Upgrade Name | Tier | Base Cost | Multiplier | Effect Description | Formula / Stat Binding |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| `bearing_tip` | **Magnetic Bearing Tip** | 1 | 10 ⚡ | 1.45 | Reduces RPM decay from surface friction | `decayRate = baseDecay * (0.88 ^ lvl)` |
| `weight_disc` | **Tungsten Weight Disc** | 1 | 10 ⚡ | 2.75 | Increase Top mass, hits rivals harder (knockback) | `TBA` |
| `blade_ring` | **Serrated Blade Ring** | 1 | 5 Parts | 1.5 | Sharp perimeter blades that drain the rival's RPM on collision | `TBA` |
| `erratic_movement` | **[TBA]** | 1 | 5 Parts | 1.5 | Forcefully alters the frequency of the beyblade's movement on random intervals | `TBA` |
| `shock_bumper` | **Shock-Absorbing Bumnper** | 1 | 5 Parts | 1.5 | Reduces RPM damage received upon colliding with the arena's boundary | `TBA` |
| `armor_core` | **Adamantium Armor Core** | 1 | 5 Parts | 1.5 | Small chance to negate damage from rival collision to 0  | `TBA` |

---

## 2. Ripcord Upgrades
| ID | Upgrade Name | Tier | Base Cost | Multiplier | Effect Description | Formula / Stat Binding |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| `ripcord_launch` | **Ripcord Launcher** | 2 | 100 ⚡ & 50 parts | 2.5 | Increase base launch for higher max RPM and energy generation | `TBA` |
| `homing_thruster` | **Homing Thruster** | 3 | 200 parts | 1.2 | Steers the beyblade dynamically towards the weakest or nearest rival in the arena | `TBA` |
| `auto_launch` | **Auto Launcher** | 5 | 5000⚡ 1000 parts | 3 | Automatically re-launches your beyblade when its RPM reaches 0 after a short amount of time | `TBA` |
| `crit_overdrive` | **Critical Overdrive** | 1 | 5 Parts | 1.5 | Increases multiplier upon successful critical launch | `TBA` |
| `proto_stablizer` | **Prototype Stabilizer** | 1 | 5 Parts | 1.5 | Chance to widen critical launch window/range by n% | `TBA` |

---

## 3. Economy Upgrades
| ID | Upgrade Name | Tier | Base Cost | Multiplier | Effect Description | Formula / Stat Binding |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| `dynamo_coil` | **Kinetic Dyamo Coil** | 4 | 20 | 2.5 | Harvest more spin energy | `TBA` |
| `scrap_magnet` | **Scrap Magnet Core** | 5 | 15 | 2 | Magentizes and recovers bonus parts whenever a rival is eliminated | `TBA` |
| `endurance_overclock` | **Endurance Overclock** | 1 | 5 Parts | 1.5 | Increase energy generation according to surival time. The longer the higher generation | `TBA` |
| `end_bonus` | **Endyrance Bonus** | 1 | 5 Parts | 1.5 | Doubles Energy gain by nx for every minute has elapsed| `TBA` |
| `elim_streak` | **Elimination Streak** | 1 | 5 Parts | 1.5 | Doubles parts dropped after eliminating a minimum of n rivals in a row | `TBA` |



---

## 4. Rival Upgrades
| ID | Upgrade Name | Tier | Base Cost | Multiplier | Effect Description | Formula / Stat Binding |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| `deployment_frequency` | **Rival Deployment Frequency** | 6 | 12000 ⚡ | 1.5 | Accelerates minimum rival spawn interval | `TBA` |
| `rival_overclock` | **Rival Torque Overclock** | 5 | 15 | 2.5 | Boosts Rival's RPM and increases bonus parts dropped | `TBA` |
| `arena_capacity` | **Rival Arena Capacity** | 6 | 2000 parts | 2 | Increases maximum available rival beyblades inside the arena | `TBA` |
| `rival_erratic` | **Rival Erratic Vector Drif** | 5 | 200 ⚡ & 25 parts | 2.75 | Enables rivals to move and turn unexpectedly | `TBA` |
| `bounty_rival` | **Bounty Protocol** | 1 | 5 Parts | 1.5 | Chance to deploy a rival with higher RPMs and damage in exchange for better part rewards | `TBA` |
