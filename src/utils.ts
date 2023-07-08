//const COL_BLUE = 'cornflowerblue';
//const COL_RED = 'lightcoral';
// const COL_ORANGE = 'sandybrown';
// const COL_LTGRAY = 'silver';
// const COL_DKGRAY = 'gray';

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
