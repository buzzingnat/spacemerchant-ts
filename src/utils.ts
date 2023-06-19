export function jobTitleTransform(jobTitle: string | undefined) {
    let fixedTitle = '';
    switch (jobTitle) {
        case 'navigator':
            fixedTitle = 'navigator';
            break;
        case 'cargoMaster':
            fixedTitle = 'cargo master';
            break;
        case 'doctor':
            fixedTitle = 'doctor';
            break;
        case 'ai':
            fixedTitle = 'AI';
            break;
        default:
            fixedTitle =  'passenger';
    }
    return fixedTitle;
}

export function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// function to help nest html built in my js
export function tag(tagType: string, classes: string, content?: string | HTMLElement | null): HTMLElement {
    const elem: HTMLElement = document.createElement(tagType);
    elem.setAttribute('class', classes);
    if (!content) {
        return elem;
    }
    if (typeof content === 'string') {
        elem.innerText = content;
    }
    if (typeof content !== 'string') {
        elem.appendChild(content);
    }
    return elem;
}

export function buildIcon(iconName: string): HTMLDivElement {
    const iconWrapper = document.createElement('div');
    iconWrapper.setAttribute('title', iconName);
    iconWrapper.setAttribute('class', 'iconWrapper');
    const svgWrapper = document.createElement('svg');
    svgWrapper.setAttribute('viewbox', '0 0 100 100');
    svgWrapper.setAttribute('class', 'icon');
    const use = document.createElement('use')
    use.setAttribute('class', iconName+'1 iconInner')
    use.setAttribute('xlink:href', '#'+iconName)
    use.setAttribute('x', '0')
    use.setAttribute('y', '0');
    svgWrapper.appendChild(use);
    iconWrapper.appendChild(svgWrapper);
    return iconWrapper;
}

//get a number of total items held in "cargo" to use for buying and carrying trade goods, etc.
export function calculateHoldMax(playerState: PlayerState): number {
    let value = 0;
    value += playerState.shipStats.holdMax;
    for (const person of playerState.crew) {
        value += person.bonus.holdMax;
    }
    return value;
}

export function hasEnoughMoney(playerState: PlayerState, cost: number): boolean {
    return playerState.coins >= cost;
}

export function hasEnoughCargoSpace(
    playerState: PlayerState,
    calculateHoldMax: (playerState: PlayerState) => number
): boolean {
    return playerState.cargo.length < calculateHoldMax(playerState);
}

export const getItemTitle = (itemType: Cargo) => {
    const FOOD_STRING = 'High Density Foodstuffs';
    const MEDICINE_STRING = 'Medicine';
    const LUXURY_STRING = 'Luxury Items';
    const SUPPLIES_STRING = 'Food and Repair Supplies';
    return itemType === 'food' ? FOOD_STRING
        : itemType === 'medicine' ? MEDICINE_STRING
        : itemType === 'luxury' ? LUXURY_STRING
        : SUPPLIES_STRING;
}

export function makeSellChoice(
    next: string, cost: number,
    playerState: PlayerState, itemType: Cargo,
    hasEnoughMoney: (playerState: PlayerState, cost: number) => boolean,
    getItemTitle: (itemType: Cargo) => "High Density Foodstuffs" | "Medicine" | "Luxury Items" | "Food and Repair Supplies"
): StoryChoice {
    const itemTitle = getItemTitle(itemType);
    return {
        next,
        cost,
        getText: function (playerState: PlayerState) {
            return `Sell ${itemTitle} at ${cost}` +
                ' coins per unit. (Currently own '
                + playerState.cargo.filter(s => s === itemType).length + ' units.)';
        },
        isActionValid: function (playerState: PlayerState) {
            return playerState.cargo.indexOf(itemType) > -1;
        },
        performAction: function (playerState: PlayerState) {
            const index = playerState.cargo.indexOf(itemType);
            if (index > -1) {
                playerState.cargo.splice(index, 1);
                playerState.coins += cost;
            }
        }
    };
}

export function makeBuyChoice(
    next: string, cost: number,
    playerState: PlayerState, itemType: Cargo,
    getItemTitle: (itemType: Cargo) => "High Density Foodstuffs" | "Medicine" | "Luxury Items" | "Food and Repair Supplies"
): StoryChoice {
    const itemTitle = getItemTitle(itemType);
    return {
        next,
        cost,
        getText: function (playerState: PlayerState) {
            return `Buy ${itemTitle} at ${cost}`
                + ' coins per unit. (Currently own '
                + playerState.cargo.filter(s => s === itemType).length
                + ' units.)';
        },
        isActionValid: function (p: PlayerState): boolean {
            const hasEnoughMoney: () => boolean = () => p.coins >= this.cost;
            const hasEnoughCargoSpace: () => boolean = () => p.cargo.length < calculateHoldMax(p);
            return (hasEnoughMoney() && hasEnoughCargoSpace());
        },
        performAction: function (playerState: PlayerState) {
            playerState.coins -= cost;
            playerState.cargo.push(itemType);
        }
    };
}

export function makePurchaseChoices(
    next: string,
    sellPrices = {food: 10, medicine: 10, luxury: 10, shipSupplies: 10},
    buyPrices = {food: 10, medicine: 10, luxury: 10, shipSupplies: 10},
    makeSellChoice: (
        next: string, cost: number,
        playerState: PlayerState, itemType: Cargo,
        hasEnoughMoney: (playerState: PlayerState, cost: number) => boolean,
        getItemTitle: (itemType: Cargo) => "High Density Foodstuffs"
            | "Medicine"
            | "Luxury Items"
            | "Food and Repair Supplies"
    ) => StoryChoice,
    makeBuyChoice: (
        next: string, cost: number,
        playerState: PlayerState, itemType: Cargo,
        getItemTitle: (itemType: Cargo) => "High Density Foodstuffs"
            | "Medicine"
            | "Luxury Items"
            | "Food and Repair Supplies"
    ) => StoryChoice,
    playerState: PlayerState,
    hasEnoughMoney: (playerState: PlayerState, cost: number) => boolean,
    getItemTitle: (itemType: Cargo) => "High Density Foodstuffs"
            | "Medicine"
            | "Luxury Items"
            | "Food and Repair Supplies"
) {
    const choiceArray = [];
    const cargoTypes: Cargo[] = ['food', 'medicine', 'luxury', 'shipSupplies'];
    for (const itemName of cargoTypes) {
        choiceArray.push(
            makeBuyChoice(next, buyPrices[itemName], playerState, itemName, getItemTitle)
        );
        choiceArray.push(
            makeSellChoice(next, sellPrices[itemName], playerState, itemName, hasEnoughMoney, getItemTitle)
        );
    }
    return choiceArray;
}
