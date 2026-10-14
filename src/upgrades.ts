import { Beyblade } from './beyblade.ts'

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
    //     baseCost: ,
    //     costMultiplier: ,
    //     description: ,
    //     effectText: ,
    // },
];

export function getUpgradeCost (upgrade: Upgrade): number {
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.level))
}

export function applyUpgradeEffect (upgrade: Upgrade, beyblade: Beyblade): void {
    switch (upgrade.id) {
        case 'bearing_tip':
            beyblade.decayRate = 0.05 * Math.pow(0.85, upgrade.level);
            break;
        case 'heavy_pullcord':
            beyblade.maxRpm += 100;
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