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
export function calculateCargo(playerState: types.PlayerState): number {
    const c = playerState.cargo;
    return (c.shipSupplies+c.tradeFood+c.tradeLuxury+c.tradeMedicine);
}
