import * as types from './types';

// function to help nest html built in my js
export function tag(tagType: string, classes: string, content?: string | HTMLElement | null): HTMLElement {
    const elem:HTMLElement = document.createElement(tagType);
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
export function calculateHoldMax(playerState: types.PlayerState): number {
    let value = 0;
    value += playerState.shipStats.holdMax;
    for (const person of playerState.crew) {
        value += person.bonus.holdMax;
    }
    return value;
}

export function makeSellEvent(nextId: string, cost: number, playerState: types.PlayerState, itemType: types.Cargo) {
    return {
                next: nextId,
                cost,
                getText: function (playerState: types.PlayerState, itemType: types.Cargo) {
                    return 'Buy "High Density Foodstuffs" at '+ cost +
                        ' coins per unit. (Currently own '
                        + playerState.cargo.filter(s => s === itemType).length + ' units.)';
                },
                isActionValid: function (p: types.PlayerState): boolean {
                    const hasEnoughMoney: () => boolean = () => p.coins >= cost;
                    const hasEnoughCargoSpace: () => boolean = () => p.cargo.length < calculateHoldMax(p);
                    return (hasEnoughMoney() && hasEnoughCargoSpace());
                },
                performAction: function (playerState: types.PlayerState) {
                    playerState.coins -= cost;
                    playerState.cargo.push(itemType);
                }
            };
}

export function makeBuyEvent(nextId: string, cost: number, playerState: types.PlayerState, itemType: types.Cargo) {
    return {
                next: 'marketExcelsior',
                cost: 15,
                getText: function (playerState: types.PlayerState, itemType: types.Cargo) {
                    return 'Sell "High Density Foodstuffs" at '+ cost +
                        ' coins per unit. (Currently own ' + playerState.cargo.filter(s => s === itemType).length
                        + ' units.)';
                },
                isActionValid: function (playerState: types.PlayerState, itemType: types.Cargo) {
                    return playerState.cargo.filter(s => s === itemType).length > 0;
                },
                performAction: function (playerState: types.PlayerState, itemType: types.Cargo) {
                    const index = playerState.cargo.indexOf(itemType);
                    playerState.coins += this.cost;
                    if (index > -1) {
                        playerState.cargo.splice(index, 1);
                    }
                }
            };
}
