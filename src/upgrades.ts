import { Beyblade } from './beyblade.ts'
import { Rivals } from './rivals.ts'

export interface Upgrade {
    id: string;
    name: string;
    category: 'chassis' | 'ripcord' | 'economy' | 'rivals';
    level: number;
    baseEnergyCost: number;
    basePartCost: number,
    costMultiplier: number;
    description: string;
    effectText: (level: number) => string;
}

export const upgrades: Upgrade[] = [
    {
        id: 'bearing_tip',
        name: 'Bearing Tip',
        category: 'chassis',
        level: 0,
        baseEnergyCost: 10,
        basePartCost: 0,
        costMultiplier: 1.5,
        description: 'Reduces spin decay rate so your top spins longer',
        effectText: (lvl) => `${lvl * 15}% Friction Decay`,
    },
    {
        id: 'weight_disc',
        name: 'Weight Disc',
        category: 'chassis',
        level: 0,
        baseEnergyCost: 10,
        basePartCost: 0,
        costMultiplier: 2.75,
        description: `Increase Beyblade's mass, hits rivals harder (knockback)`,
        effectText: (lvl) => `${lvl * 1.5} Mass placed`,
    },
    {
        id: 'dynamo_coil',
        name: 'Kinectic Dynamo Coil',
        category: 'economy',
        level: 0,
        baseEnergyCost: 20,
        basePartCost: 0,
        costMultiplier: 2.5,
        description: 'Harvest more spin energy',
        effectText: (lvl) => `${lvl * 2}% Energy Rate`,
    },
    {
        id: 'scrap_magnet',
        name: 'Scrap Magnet Core',
        category: 'economy',
        level: 0,
        baseEnergyCost: 15,
        basePartCost: 0,
        costMultiplier: 2,
        description: 'Magnetizes and recovers bonus parts whenever a rival is eliminated',
        effectText: (lvl) => `${lvl * 1.2}% More parts obtained`,
    },
    {
        id: 'deployment_frequency',
        name: 'Rival Deployment Frequency',
        category: 'rivals',
        level: 0,
        baseEnergyCost: 12000,
        basePartCost: 0,
        costMultiplier: 1.5,
        description: 'Accelerates minimum rival spawn interval',
        effectText: (lvl) => `${60 - lvl}s spawn`,    
    },
    {
        id: 'rival_overclock',
        name: 'Rival Torque Overclock',
        category: 'rivals',
        level: 0,
        baseEnergyCost: 15,
        basePartCost: 0,
        costMultiplier: 2.5,
        description: `Boosts Rival's RPM and increases bonus parts dropped`,
        effectText: (lvl) => `${lvl * 2.5} Rival RPM; ${lvl} Bonus Part/s dropped`,  
    },
    {
        id: 'heavy_pullcord',
        name: 'Heavy Pullcord',
        category: 'ripcord',
        level: 0,
        baseEnergyCost: 50,
        basePartCost: 0,
        costMultiplier: 2.5,
        description: 'Increases base launch RPM upon Pulling',
        effectText: (lvl) => `${lvl * 100} Launch RPM`,
    },
    {
        id: 'blade_ring',
        name: 'Serrated Blade Ring',
        category: 'chassis',
        level: 0,
        baseEnergyCost: 0,
        basePartCost: 35,
        costMultiplier: 2,
        description: `Test`,
        effectText: (lvl) => `${lvl * 2} More Damage`,
    },
    {
        id: 'arena_capacity',
        name: 'Arena Capacity',
        category: 'rivals',
        level: 0,
        baseEnergyCost: 200,
        basePartCost: 25,
        costMultiplier: 2.75,
        description: 'Increase maximum available rival beyblades insid the arena.',
        effectText: (lvl) => `${lvl + 1} Rivals allowed inside`,
    },
    {
        id: 'homing_thruster',
        name: 'Homing Thrusters',
        category: 'ripcord',
        level: 0,
        baseEnergyCost: 0,
        basePartCost: 200,
        costMultiplier: 1.2,
        description: 'Steers the beyblade to dynamically towards the weakest or nearest rival in the arena',
        effectText: (lvl) => `${lvl * 1.2}% Tendency to home.` ,
    },
    {
        id: 'auto_launch',
        name: 'Auto Ripcord Launcher',
        category: 'ripcord',
        level: 0,
        baseEnergyCost: 5000,
        basePartCost: 1000,
        costMultiplier: 3,
        description: 'Automatically re-launches your beyblade when its RPM reaches 0 after a short amount of time',
        effectText: (lvl) => `${30.5 - lvl}s launch interval` ,
    },
    {
        id: 'rival_erratic',
        name: 'Rival Erratic Drift',
        category: 'rivals',
        level: 0,
        baseEnergyCost: 200,
        basePartCost: 0,
        costMultiplier: 2.5,
        description: 'Enables rivals to move and turn unexpectedly',
        effectText: (lvl) => `${lvl}% to move unexpectedly` ,
    },
    /* Upgrade template for the beyblades */
    // {
    //     id: '',
    //     name: '',
    //     category: '',
    //     level: 0,
    //     baseEnergyCost: ,
    //     basePartCost: ,
    //     costMultiplier: ,
    //     description: '',
    //     effectText: (lvl) => `${lvl}` ,
    // },
];

export function getUpgradeCost (upgrade: Upgrade) {
    return {
        energy: Math.floor(upgrade.baseEnergyCost * Math.pow(upgrade.costMultiplier, upgrade.level)),
        part: Math.floor(upgrade.basePartCost * Math.pow(upgrade.costMultiplier, upgrade.level))
    };
}

export function applyUpgradeEffect (upgrade: Upgrade, beyblade: Beyblade, bot: Rivals): void {
    switch (upgrade.id) {
        case 'bearing_tip':
            beyblade.decayRate = 0.05 * Math.pow(0.85, upgrade.level);
            break;
        case 'weight_disc':
            beyblade.mass = 1 + (upgrade.level * 1.5);
            break;
        case 'heavy_pullcord':
            beyblade.baseMaxRpm = 500 + (upgrade.level * 100);
            break;
        case 'dynamo_coil':
            beyblade.energyMultiplier = 1.0 + (upgrade.level * 0.4);
            break;
        case 'scrap_magnet':
            beyblade.partMultiplier = 1.0 + (upgrade.level * 0.2);
            break;
        case 'deployment_frequency':
            bot.spawnDelay = 5.0 - (upgrade.level * 0.5);
            break;
        case 'rival_overclock':
            bot.rpm = 200 + (upgrade.level * 2.5);
            bot.maxRpm = 200 + (upgrade.level * 2.5);
            bot.partsReward = 1 + upgrade.level;
            break;
        case 'blade_ring':
            beyblade.damage = 20 + (upgrade.level * 2);
            break;
        case 'auto_launch':
            beyblade.autoLaunchDelay = 30.5 - (upgrade.level * 0.5);
            break;
        case 'rival_erratic':
            bot.erraticDrift = 0 + (upgrade.level * 5);
            break;
    }
}

// Render Upgrade List
export function renderUpgradeModule(upgrade: Upgrade): string {
    const cost = getUpgradeCost(upgrade);
    const effect = upgrade.effectText(upgrade.level);

    return `
        <div class="upgrade-module">
            <div class="upgrade-module-header">
                <h2>${upgrade.name}</h2>
                <div class="upgrade-module-level">
                    <h2>Lvl <span>${upgrade.level}</span></h2>
                </div>
            </div>
            <div class="upgrade-module-desc">
                <span>${upgrade.description}</span>
            </div>
            <div class="upgrade-module-effect">
                Effect: <span>${effect}</span>
            </div>
            <div class="upgrade-module-footer">
            <button class="buy-upgrade-btn" data-id="${upgrade.id}" type="button">
                <span>${cost.energy > 0 ? `${cost.energy} ⚡` : ''}
                ${cost.part > 0 ? `${cost.part} ⚙️` : ''}</span>
            </button>
            </div>
        </div>
    `
}
