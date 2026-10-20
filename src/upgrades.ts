import { Beyblade } from './beyblade.ts'
import { Rivals } from './rivals.ts'

export interface Upgrade {
    id: string;
    name: string;
    category: 'chassis' | 'ripcord' | 'economy' | 'rivals';
    level: number;
    baseCost: number;
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
        baseCost: 10,
        costMultiplier: 1.5,
        description: 'Reduces spin decay rate so your top spins longer',
        effectText: (lvl) => `${lvl * 15}% Friction Decay`,
    },
    {
        id: 'weight_disc',
        name: 'Weight Disc',
        category: 'chassis',
        level: 0,
        baseCost: 10,
        costMultiplier: 2.75,
        description: `Increase Beyblade's mass, hits rivals harder (knockback)`,
        effectText: (lvl) => `${lvl * 1.2} Mass placed`,
    },
    {
        id: 'dynamo_coil',
        name: 'Kinectic Dynamo Coil',
        category: 'economy',
        level: 0,
        baseCost: 20,
        costMultiplier: 2.5,
        description: 'Harvest more spin energy',
        effectText: (lvl) => `${lvl * 2}% Energy Rate`,
    },
    {
        id: 'scrap_magnet',
        name: 'Scrap Magnet Core',
        category: 'economy',
        level: 0,
        baseCost: 15,
        costMultiplier: 2,
        description: 'Magnetizes and recovers bonus parts whenever a rival is eliminated',
        effectText: (lvl) => `${lvl * 1.2}% More parts obtained`,
    },
    {
        id: 'deployment_frequency',
        name: 'Rival Deployment Frequency',
        category: 'rivals',
        level: 0,
        baseCost: 12000,
        costMultiplier: 1.5,
        description: 'Accelerates minimum rival spawn interval',
        effectText: (lvl) => `${60 - lvl}s spawn`,    
    },
    {
        id: 'rival_overclock',
        name: 'Rival Torque Overclock',
        category: 'rivals',
        level: 0,
        baseCost: 15,
        costMultiplier: 2.5,
        description: `Boosts Rival's RPM and increases bonus parts dropped`,
        effectText: (lvl) => `${lvl * 3} Rival RPM`,  
    },
    {
        id: 'heavy_pullcord',
        name: 'Heavy Pullcord',
        category: 'ripcord',
        level: 0,
        baseCost: 50,
        costMultiplier: 2.5,
        description: 'Increases base launch RPM upon Pulling',
        effectText: (lvl) => `${lvl * 100} Launch RPM`,
    },
    
    /* Upgrade template for the beyblades */
    // {
    //     id: ,
    //     name: ,
    //     category: ,
    //     level: 0,
    //     baseCost: ,
    //     costMultiplier: ,
    //     description: ,
    //     effectText: ,
    // },
];

export function getUpgradeCost (upgrade: Upgrade): number {
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.level))
}

export function applyUpgradeEffect (upgrade: Upgrade, beyblade: Beyblade, bot: Rivals): void {
    switch (upgrade.id) {
        case 'bearing_tip':
            beyblade.decayRate = 0.05 * Math.pow(0.85, upgrade.level);
            break;
        case 'weight_disc':
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
            break;
        case 'rival_overclock':
            bot.rpm = 600 + (upgrade.level * 1.5);
            bot.maxRpm = 600 + (upgrade.level * 1.5);
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
                <span>${cost}</span> ⚡
            </button>
            </div>
        </div>
    `
}
