import './style.css'
import { Arena } from './arena.ts'
import { Beyblade } from './beyblade.ts'
import { Rivals } from './rivals.ts';
import { applyUpgradeEffect, getUpgradeCost, upgrades, renderUpgradeModule } from './upgrades.ts';

// [ Canvas and its Context ]
const canvas = document.querySelector<HTMLCanvasElement>('#arena-canvas')!;
const ctx = canvas.getContext('2d')!;

// [ Arena ]
const arena = new Arena(canvas.width / 2, canvas.height / 2, 250)

// [ Beyblade ]
const beyblade = new Beyblade(
  canvas.width / 2,
  canvas.height / 2,
  6.0,
  3.5,
  500,
  500,
  0.05
);

const bot = new Rivals(
  canvas.width / 2,
  canvas.height / 2,
  6.0,
  3.5,
  500,
  500,
  0.05
);

// Initialization via array
const tops: Beyblade[] = [beyblade, bot];

// Survival Mode Cycle
const currentSurvival = document.querySelector<HTMLSpanElement>('#current')!;
const recordSurvival = document.querySelector<HTMLSpanElement>('#record')!;
const speedText = document.querySelector<HTMLSpanElement>('.gauge-header span:last-child')!;
const speedBarFill = document.querySelector<HTMLDivElement>('.gauge-bar-fill')!;
const ripcordNeedle = document.querySelector<HTMLDivElement>('.ripcord-needle')!;
const ripcordBtn = document.querySelector<HTMLButtonElement>('#ripcord-btn')!;

// Game State
let isSpinning = false;
let survivalTime = 0;
let recordTime = 0;

// Ripcord State
let needlePos = 0;
let needleDirection = 1;
let needleSpeed = 1.5;

function updateRipcord() {
  if (!isSpinning) {
    needlePos += needleDirection * needleSpeed;

    if (needlePos >= 100) needleDirection = -1;
    if (needlePos <= 0) needleDirection = 1;

    ripcordNeedle.style.left = `${needlePos}%`
  }
}

// Ripcord Launch
ripcordBtn.addEventListener('click', () => {
  if (isSpinning) return; // Cannot launch if the beyblade is still active

  const accuracy = Math.abs(needlePos - 50);
  let launchRpm = beyblade.maxRpm;
  let launchSpeed = null;

  if (accuracy <= 5) {
    // Critical Launch
    launchRpm *= 3;
    launchSpeed = 8.0;
  } else {
    // Weak Launch
    launchSpeed = 3.0;
  }

  // Reset beyblade state 
  beyblade.x = canvas.width / 2 + 100;
  beyblade.y = canvas.height / 2;
  beyblade.vx = (Math.random() - 0.5) * 2;
  beyblade.vy = launchSpeed;
  beyblade.rpm = launchRpm;
  beyblade.maxRpm = launchRpm;

  // Reset beyblade(rival) state
  bot.x = canvas.width / 2 - 100;
  bot.y = canvas.height / 2;
  bot.vx = (Math.random() - 0.5) * 2;
  bot.vy = launchSpeed * (-0.8);
  bot.rpm = 100;
  bot.maxRpm = 100;

  // Reset round state
  survivalTime = 0;
  isSpinning = true;
});

// Resource Earning
const energyAmount = document.querySelector<HTMLSpanElement>('#energy-amount')!;
const partAmount = document.querySelector<HTMLSpanElement>('#part-amount')!;
let spinEnergy = 0;
let rivalPart = 0;

// [ Animation of Canvas ]
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  arena.draw(ctx);

  updateRipcord();

  if (isSpinning) {
    // Physics Simulation
    for (const top of tops) {
      arena.handleSlope(top);
      top.update();
      arena.handleBoundary(top);
      top.draw(ctx);  
    }

    arena.handleCollision(beyblade, bot);

    // Rival Elimination Check, Rival Respawn, Rival Part Reward
    if (bot.rpm <= 0) {
      console.log(rivalPart);
      bot.x = canvas.width / 2 - 100;
      bot.y = canvas.height / 2;
      bot.vx = (Math.random() - 0.5) * 4;
      bot.vy = (Math.random() - 0.5) * 4;
      bot.rpm = 100;
      bot.maxRpm = 100;

      // Part Generation
      rivalPart += Math.floor(bot.partsReward * beyblade.partMultiplier);
      partAmount.textContent = Math.floor(rivalPart).toString();
    }

    // Survival Timer
    survivalTime += 1 / 60
    currentSurvival.textContent = `Current: ${survivalTime.toFixed(1)}s`;

    // Update RPM Gauge
    speedText.textContent = `${Math.round(beyblade.rpm)} / 
    ${Math.round(beyblade.maxRpm)}`;
    const rpmPercent  = (beyblade.rpm / beyblade.maxRpm) * 100;
    speedBarFill.style.width = `${rpmPercent}%`;

    // Energy Generation
    spinEnergy += (beyblade.rpm / 60) * 0.02 * beyblade.energyMultiplier;
    energyAmount.textContent = Math.floor(spinEnergy).toString(); 

    // Round End Check
    if (beyblade.rpm <= 0) {
      isSpinning = false;
      // Set record if current time is over the record
      if (survivalTime > recordTime) {
        recordTime = survivalTime;
        recordSurvival.textContent = `Record: ${recordTime.toFixed(1)}s`
      }
    }
  }
    
  requestAnimationFrame(animate);
}

animate();

const upgradesList = document.querySelector<HTMLDivElement>('#upgrades-list')!;
let currentCategory = 'chassis';

function refreshUpgrades() {
  const filtered = upgrades.filter(u => u.category === currentCategory);
  upgradesList.innerHTML = filtered.map(renderUpgradeModule).join('');
}

refreshUpgrades();

upgradesList.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.buy-upgrade-btn');
  if (!btn) return;

  const upgradeId = btn.dataset.id;
  const upgrade = upgrades.find(u => u.id === upgradeId);
  if (!upgrade) return;

  const cost = getUpgradeCost(upgrade);
  if (spinEnergy >= cost) {
    spinEnergy -= cost;
    energyAmount.textContent = Math.floor(spinEnergy).toString();
  

  upgrade.level++;
  applyUpgradeEffect(upgrade, beyblade, bot);

  refreshUpgrades();
  }
});

// Upgrade list refesh according to selected upgrade category
const upgradeCategory = document.querySelector<HTMLDivElement>('.upgrade-category')!;
upgradeCategory.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.category-btn');
  if (!btn) return;
  
  const categoryName = btn.id;

  // Validity check;
  const validCategories = ['chassis', 'ripcord', 'economy', 'rivals'];
  if (!validCategories.includes(categoryName)) return;

  currentCategory = categoryName;

  document.querySelector('.category-btn-active')?.classList.remove('category-btn-active');
  btn.classList.add('category-btn-active');
  refreshUpgrades();
});