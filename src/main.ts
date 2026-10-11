import './style.css'
import { Arena } from './arena.ts'
import { Beyblade } from './beyblade.ts'
import { applyUpgradeEffect, getUpgradeCost, upgrades } from './upgrades.ts';

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

// Survival Mode Cycle
const currentSurvival = document.querySelector<HTMLSpanElement>('#current')!;
const recordSurvival = document.querySelector<HTMLSpanElement>('#record')!;
const speedText = document.querySelector<HTMLSpanElement>('.gauge-header span:last-child')!;
const speedBarFill = document.querySelector<HTMLDivElement>('.gauge-bar-fill')!;
const ripcordNeedle = document.querySelector<HTMLDivElement>('.ripcord-needle')!;
const ripcordBtn = document.querySelector<HTMLButtonElement>('#ripcord-btn')!;

// Upgrade Sets
const buyBearingBtn = document.querySelector<HTMLButtonElement>('#buy-bearing-btn')!;
const bearingLvl = document.querySelector<HTMLSpanElement>('#bearing-lvl')!;
const bearingCost = document.querySelector<HTMLSpanElement>('#bearing-cost')!;
const bearingDesc = document.querySelector<HTMLSpanElement>('#bearing-desc')!;
const bearingEffect = document.querySelector<HTMLSpanElement>('#bearing-effect')!;


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

  // Reset round state
  survivalTime = 0;
  isSpinning = true;
});

// Resource Earning
const energyAmount = document.querySelector<HTMLSpanElement>('#energy-amount')!;
let spinEnergy = 0;

// Beyblade Upgrades
const tipUpgrade = upgrades[0];
bearingCost.textContent = getUpgradeCost(tipUpgrade).toString();
bearingDesc.textContent = tipUpgrade.description;

buyBearingBtn.addEventListener('click', () => {
  const cost = getUpgradeCost(tipUpgrade);

  if (spinEnergy >= cost) {
    // 1. Spend
    spinEnergy -= cost;
    energyAmount.textContent = Math.floor(spinEnergy).toString();
    
    // 2. Level up
    tipUpgrade.level++;
    energyAmount.textContent = Math.floor(spinEnergy).toString();

    // 3. Apply upgraded physiscs
    applyUpgradeEffect(tipUpgrade, beyblade);

    // 4. Update UI
    bearingLvl.textContent = tipUpgrade.level.toString();
    bearingCost.textContent = getUpgradeCost(tipUpgrade).toString();
    bearingEffect.textContent = tipUpgrade.effectText(tipUpgrade.level);
  }
});

const buyPullcordBtn = document.querySelector<HTMLButtonElement>('#buy-pullcord-btn')!;
const pullcordLvl = document.querySelector<HTMLSpanElement>('#pullcord-lvl')!;
const pullcordCost = document.querySelector<HTMLSpanElement>('#pullcord-cost')!;
const pullcordDesc = document.querySelector<HTMLSpanElement>('#pullcord-desc')!;
const pullcordEffect = document.querySelector<HTMLSpanElement>('#pullcord-effect')!;

const pullcordUpgrade = upgrades[1];
pullcordDesc.textContent = pullcordUpgrade.description;
pullcordCost.textContent = getUpgradeCost(pullcordUpgrade).toString();


buyPullcordBtn.addEventListener('click', () => {
  const cost = getUpgradeCost(pullcordUpgrade);

  if (spinEnergy >= cost) {
    // 1. Spend
    spinEnergy -= cost;
    energyAmount.textContent = Math.floor(spinEnergy).toString();
    
    // 2. Level up
    pullcordUpgrade.level++;
    energyAmount.textContent = Math.floor(spinEnergy).toString();

    // 3. Apply upgraded physiscs
    applyUpgradeEffect(pullcordUpgrade, beyblade);

    // 4. Update UI
    pullcordLvl.textContent = pullcordUpgrade.level.toString();
    pullcordCost.textContent = getUpgradeCost(pullcordUpgrade).toString();
    pullcordEffect.textContent = pullcordUpgrade.effectText(pullcordUpgrade.level);
  }
});

// [ Animation of Canvas ]
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  arena.draw(ctx);

  updateRipcord();

  if (isSpinning) {
    // Physics Simulation
    arena.handleSlope(beyblade);
    beyblade.update();
    arena.handleBoundary(beyblade);
    beyblade.draw(ctx);  

    // Survival Timer
    survivalTime += 1 / 60
    currentSurvival.textContent = `Current: ${survivalTime.toFixed(1)}s`;

    // Update RPM Gauge
    speedText.textContent = `${Math.round(beyblade.rpm)} / 
    ${Math.round(beyblade.maxRpm)}`;
    const rpmPercent  = (beyblade.rpm / beyblade.maxRpm) * 100;
    speedBarFill.style.width = `${rpmPercent}%`;

    // Energy Generation
    spinEnergy += (beyblade.rpm / 60) * 0.02;
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