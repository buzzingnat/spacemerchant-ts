import { tag, buildIcon, calculateHoldMax, updateMeasureBar } from './utils';
import { events } from './events';
import { crewDebtStory } from './story-crewDebt';
import { map } from './map';

const COL_BLUE = 'cornflowerblue';
const COL_RED = 'lightcoral';
// const COL_ORANGE = 'sandybrown';
// const COL_LTGRAY = 'silver';
const COL_DKGRAY = 'gray';

/**
 *PLAYER STATE
 **/
const playerState: PlayerState = {
  coins: 100000,
  cargo: [],
  shipStats: {holdMax: 0, health: 0, speed: 0},
  miniEvent: {},
  ship: '',
  passengers: [],
  crew: [],
  costChoice: 0,
  updateUI: false,
  currentLocationId: 'excelsior',
};
/* end PLAYER STATE */

/**
 *GLOBAL OBJECTS
 **/
const storyEvents = [...events, ...crewDebtStory];
// @ts-ignore
window.storyEvents = storyEvents;
// @ts-ignore
window.playerState = playerState;
/* end GLOBAL OBJECTS */

/**
 *GLOBAL DOM ELEMENTS
 **/
const jsDom: {[key: string]: HTMLElement} | undefined = {};
// @ts-ignore
window.jsDom = jsDom;

function getMainGameElem() {
    if (!document) {
        return;
    }
    const mainGameElem: HTMLDivElement = document.querySelector('.mainGame')!;
    if (!mainGameElem) {
        throw new Error('Could not find mainGameElem');
    }
    jsDom.mainGameElem = mainGameElem;
    return mainGameElem;
}
function getIframeWrapperElem() {
    if (!document) {
        return;
    }
    const iframeWrapperElem: HTMLDivElement = document.querySelector('.iframeWrapper')!;
    if (!iframeWrapperElem) {
        throw new Error('Could not find iframeWrapperElem');
    }
    jsDom.iframeWrapperElem = iframeWrapperElem;
    return iframeWrapperElem;
}
function getShowGraphButtonElem() {
    if (!document) {
        return;
    }
    const showGraphButtonElem: HTMLButtonElement = document.querySelector('#showGraph')!;
    if (!showGraphButtonElem) {
        throw new Error('Could not find showGraphButtonElem');
    }
    jsDom.showGraphButtonElem = showGraphButtonElem;
    return showGraphButtonElem;
}
function getHideGraphButtonElem() {
    if (!document) {
        return;
    }
    const hideGraphButtonElem: HTMLButtonElement = document.querySelector('#hideGraph')!;
    if (!hideGraphButtonElem) {
        throw new Error('Could not find getHideGraphButtonElem');
    }
    jsDom.hideGraphButtonElem = hideGraphButtonElem;
    return hideGraphButtonElem;
}

function makeStatsTab(selected: boolean, jsDom: {[key: string]: HTMLElement}): {[key: string]: HTMLElement} {
    // content for tab1
    const explainText1 = 'Base stats like strength, speed, and intellect. Maybe some sort of points or game progress, as well.';
    const strengthBarCollection = makeMeasureBar('strength', 'strength', COL_RED, COL_DKGRAY);
    const tabContentElem = tag('div', `js-tabContent tabContent tabContent1 ${selected ? 'selected' : ''}`);
    tabContentElem.appendChild(tag('p', explainText1));
    tabContentElem.appendChild(strengthBarCollection.barWrapper);
    jsDom.strengthBarElem = strengthBarCollection.bar;
    jsDom.strengthBarLabelElem = strengthBarCollection.barLabel;
    jsDom.strengthBarWrapperElem = strengthBarCollection.barWrapper;
    jsDom.strengthBarNumElem = strengthBarCollection.barNum;
    jsDom.statsTabContentElem = tabContentElem;
    return {tabContentElem};
}

function drawMapCanvas(canvas: HTMLCanvasElement, playerState: PlayerState) {
    const context = canvas.getContext("2d");

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (const station of map) {
        context.fillStyle = "aliceblue";
        context.beginPath();
        context.arc(station.x, station.y, 15, 0, 180);
        context.fill();

        // add green dot to current location
        if (station.id === playerState.currentLocationId) {
            context.fillStyle = "green";
            context.beginPath();
            context.arc(station.x, station.y, 7, 0, 180);
            context.fill();
        }

        for (const id of station.connects) {
            // station is source, destination is target.
            const destination = map.find(dest => dest.id === id);
            const dx = destination.x - station.x, dy = destination.y - station.y;
            const theta = Math.atan2(dy, dx);
            const nx = Math.cos(theta), ny = Math.sin(theta);
            const perpx = Math.cos(theta-Math.PI/2), perpy = Math.sin(theta-Math.PI/2);
            // const mag = Math.sqrt(dx*dx + dy*dy)
            // const nx = dx / mag, ny = dy / mag;

            // line
            context.beginPath();
            context.strokeStyle = "silver";
            context.lineWidth = 3;
            const padding = 10;
            const d = 15 + padding;
            context.moveTo(station.x + (d+2) * nx, station.y + (d+2) * ny);
            context.lineTo(destination.x - (d+2) * nx, destination.y - (d+2) * ny);
            context.stroke();

            // arrow
            const arrowLength = 10;
            const arrowWidth = 12;
            context.beginPath();
            context.fillStyle = "silver";
            context.moveTo(destination.x - d * nx, destination.y - d * ny);
            context.lineTo(destination.x - (d + arrowLength) * nx - arrowWidth * perpx, destination.y - (d + arrowLength) * ny - arrowWidth * perpy);
            context.lineTo(destination.x - (d + arrowLength) * nx + arrowWidth * perpx, destination.y - (d + arrowLength) * ny + arrowWidth * perpy);
            context.lineTo(destination.x - d * nx, destination.y - d * ny);
            context.fill();
        }
        context.beginPath();
        const fontSize = 16;
        context.font = `${fontSize}px sans-serif`;
        context.textAlign = "center";
        context.fillStyle = "aqua";
        context.strokeStyle = "black";
        context.lineWidth = .75;
        context.fillText(station.id, station.x, station.y-fontSize*1.15);
        context.strokeText(station.id, station.x, station.y-fontSize*1.15);
    }
}

function makeMapTab(selected: boolean, jsDom: {[key: string]: HTMLElement}): {[key: string]: HTMLElement} {
    // content for tab 2
    const canvasElem = tag('canvas', 'mapCanvas') as HTMLCanvasElement;
    canvasElem.setAttribute('width', '220');
    canvasElem.setAttribute('height', '400');

    drawMapCanvas(canvasElem, playerState);

    const accordionWrapperElem: HTMLElement = tag('div', 'accordionWrapper');
    const tabContentElem = tag('div', `js-tabContent tabContent tabContent2 ${selected ? 'selected' : ''}`);
    for(let i = 0; i < map.length; i++) {
        displayAccordionLocation(map[i], accordionWrapperElem);
    }
    tabContentElem.appendChild(canvasElem);
    tabContentElem.appendChild(accordionWrapperElem);
    jsDom.mapCanvas = canvasElem;
    jsDom.mapTabContentElem = tabContentElem;
    return {tabContentElem};
}

function makeItemTab(selected: boolean, jsDom: {[key: string]: HTMLElement}): {[key: string]: HTMLElement}  {
// content for tab3
    const explainText3 = 'Your items!';
    const coinsElem = tag('div', 'coins', 'Coins: ' + playerState.coins);
    const cargoBarCollection = makeMeasureBar('cargo', 'cargo', COL_BLUE, COL_DKGRAY);
    const cargoBarWrapper = cargoBarCollection.barWrapper;
    const cargoBar = cargoBarCollection.bar;
    const cargoBarLabel = cargoBarCollection.barLabel;
    const cargoBarNum = cargoBarCollection.barNum;
    const tabContentElem = tag('div', `js-tabContent tabContent tabContent3 ${selected ? 'selected' : ''}`);
    tabContentElem.appendChild(tag('p', '', explainText3));
    tabContentElem.appendChild(coinsElem);
    tabContentElem.appendChild(cargoBarCollection.barWrapper);
    // build CREW INFO section
    const crewWrapperElem = tag('div', 'crewWrapper');
    const crewTitleElem = tag('h3', 'crewTitle', 'Crew');
    crewWrapperElem.appendChild(crewTitleElem);
    const crewInnerWrapperElem = tag('ul', 'crewInnerWrapper');
    updateCrewList(crewInnerWrapperElem, playerState);
    crewWrapperElem.appendChild(crewInnerWrapperElem);
    tabContentElem.appendChild(crewWrapperElem);
    // end CREW INFO SECTION
    jsDom.coinsElem = coinsElem;
    jsDom.cargoBarElem = cargoBar;
    jsDom.cargoBarWrapperElem = cargoBarWrapper;
    jsDom.cargoBarLabelElem = cargoBarLabel;
    jsDom.cargoBarNumElem = cargoBarNum;
    jsDom.itemTabContentElem = tabContentElem;
    jsDom.crewWrapperElem = crewWrapperElem;
    jsDom.crewInnerWrapperElem = crewInnerWrapperElem;
    jsDom.crewTitleElem = crewTitleElem;
    return {coinsElem, tabContentElem, crewWrapperElem, crewInnerWrapperElem, crewTitleElem};
}
function updateCoinsElem(coinsElem: HTMLElement, playerState: PlayerState): void {
    coinsElem.innerText = `Coins: ${playerState.coins}`;
}
function updateCrewList(crewInnerWrapperElem: HTMLElement, playerState: PlayerState): void {
    crewInnerWrapperElem.innerHTML = '';
    const crewList = [];
    if (playerState.crew.length < 1) {
        crewInnerWrapperElem.appendChild(tag('li', 'crew', 'No crew hired on this ship!'));
    } else {
        for(let i = 0; i < playerState.crew.length; i++) {
            const crew = playerState.crew[i];
            const crewElem = tag(
                'li',
                'crew',
                `${crew.jobTitle}: ${crew.name}, \$${crew.salary}/port\n` +
                `${JSON.stringify(crew.bonus)}.`
            );
            crewList.push(crew);
            crewInnerWrapperElem.appendChild(crewElem);
        }
    }
}

if (typeof window !== "object") {
    console.log('this is not a browser, the DOM is not available');
} else {
    const mainGameElem = getMainGameElem()!;
    getIframeWrapperElem();
    const showGraphButtonElem = getShowGraphButtonElem()!;
    showGraphButtonElem.addEventListener('click', showGraph);
    const hideGraphButtonElem = getHideGraphButtonElem()!;
    hideGraphButtonElem.addEventListener('click', hideGraph);
    const statsBoxWrapperElem: HTMLElement = tag('div', 'js-statsBox js-tabbedArea center');
    statsBoxWrapperElem.setAttribute('id', 'open-modal');
    const statsBoxElem: HTMLElement = tag('div', 'statsBoxInner');
    statsBoxWrapperElem.appendChild(statsBoxElem);
    const statsBoxOpenElem: HTMLElement = tag('div', 'modal-open statsBox-open');
    statsBoxOpenElem.innerHTML = '<a href="#open-modal">&#9776;</a>';
    const statsBoxCloseElem: HTMLElement = tag('div', 'modal-close statsBox-close');
    statsBoxCloseElem.innerHTML = '<a href="#close-modal">&#x2715;</a>';
    const controlBoxElem: HTMLElement = tag('div', 'js-controlBox left');
    const storyBoxElem: HTMLElement = tag('div', 'js-storyBox right');
    const scrollBoxElem: HTMLElement = tag('div', 'js-scrollbox');


    mainGameElem.appendChild( storyBoxElem );
    mainGameElem.appendChild( statsBoxWrapperElem );
    mainGameElem.appendChild( statsBoxOpenElem );
    mainGameElem.appendChild( controlBoxElem );
    storyBoxElem.appendChild( scrollBoxElem );
    controlBoxElem.appendChild(buildIcon('play'));
    controlBoxElem.appendChild(buildIcon('save'));
    controlBoxElem.appendChild(buildIcon('settings'));
    controlBoxElem.appendChild(buildIcon('person'));

    const tabsElem: HTMLElement = tag('ul', 'js-tabs');
    jsDom.tabsElem = tabsElem;

    // add three tab heads, 3rd starts selected
    tabsElem.appendChild(tag('li', 'js-tab tab tab1', 'Stats'));
    tabsElem.appendChild(tag('li', 'js-tab tab tab2', 'Map'));
    tabsElem.appendChild(tag('li', 'js-tab tab tab3', 'Items'));
    // add three tab bodies, 3rd starts selected and visible
    makeStatsTab(false, jsDom);
    makeMapTab(false, jsDom);
    makeItemTab(true, jsDom);
    // add them to tab element
    tabsElem.appendChild(jsDom.statsTabContentElem);
    tabsElem.appendChild(jsDom.mapTabContentElem);
    tabsElem.appendChild(jsDom.itemTabContentElem);
    statsBoxElem.appendChild(tabsElem);
    statsBoxElem.appendChild(statsBoxCloseElem);

    const tabsElemAsArray = Array.from(tabsElem.getElementsByClassName('js-tab'));
    const tabsContentElemAsArray = Array.from(tabsElem.getElementsByClassName('js-tabContent'));

    tabsElemAsArray.forEach((elem: Element) => {
        elem.addEventListener('click', (event) => {
            const clickedTab = event.target as HTMLElement;
            tabsElemAsArray.forEach(elem => elem.classList.remove('selected'));
            tabsContentElemAsArray.forEach(elem => elem.classList.remove('selected'));
            clickedTab.classList.add('selected');
            if (clickedTab.classList.contains('tab1')) {
                tabsElem.getElementsByClassName( 'tabContent1' )[0]?.classList.add('selected');
            }
            if (clickedTab.classList.contains('tab2')) {
                tabsElem.getElementsByClassName( 'tabContent2' )[0]?.classList.add('selected');
            }
            if (clickedTab.classList.contains('tab3')) {
                tabsElem.getElementsByClassName( 'tabContent3' )[0]?.classList.add('selected');
            }
        })
    });

    jsDom.statsBoxWrapperElem = statsBoxWrapperElem;
    jsDom.statsBoxElem = statsBoxElem;
    jsDom.statsBoxOpenElem = statsBoxOpenElem;
    jsDom.controlBoxElem = controlBoxElem;
    jsDom.storyBoxElem = storyBoxElem;
    jsDom.scrollBoxElem = scrollBoxElem;

    //CALL THE FUNCTION displayEvent AND USE IT TO CREATE THE FIRST EVENT ON THE SCREEN
    window.onload = () => {
        let limit = 100;
        const checkForCoinElem = () => setTimeout(() => {
            const coinsElem = jsDom.coinsElem;
            if (!coinsElem && limit > 0) {
                limit--;
                checkForCoinElem();
            } else if (!coinsElem) {
                console.log('NO COINS ELEMENT ON PAGE, GAVE UP LOOKING');
            } else {
                console.log('COIN ELEM FOUND!');
                initGame(
                    playerState,
                    scrollBoxElem,
                    storyEvents.find(obj => obj.id === 'firstEvent') as StoryEvent
                );
            }
        }, 50);
        checkForCoinElem();
    };
}

function initGame(playerState: PlayerState, scrollBoxElem: HTMLElement, firstEvent: StoryEvent) {
    displayEvent(
        firstEvent,
        playerState,
        jsDom
    );
    updateMeasureBar(
        jsDom.cargoBarElem,
        jsDom.cargoBarNumElem,
        playerState.cargo.length,
        calculateHoldMax(playerState)
    );
}
/* end DOM ELEMENTS */

/**
 *TOGGLE EVENT GRAPH VISIBILITY
 **/
function showGraph() {
    if (!document) {
        return;
    }
    jsDom.mainGameElem.style.display = 'none';
    jsDom.mainGameElem.style.visibility = 'hidden';
    jsDom.iframeWrapperElem.style.visibility = 'visible';
    jsDom.iframeWrapperElem.style.display = 'block';
    jsDom.iframeWrapperElem.style.height = '81vh';
    const iframeElem = jsDom.iframeWrapperElem.firstElementChild as HTMLElement;
    iframeElem.style.height = '100%';
}
function hideGraph() {
    if (!document) {
        return;
    }
    jsDom.mainGameElem.style.display = 'flex';
    jsDom.mainGameElem.style.visibility = 'visible';
    jsDom.iframeWrapperElem.style.visibility = 'hidden';
    jsDom.iframeWrapperElem.style.display = 'none';
    jsDom.iframeWrapperElem.style.height = '0';
    const iframeElem = jsDom.iframeWrapperElem.firstElementChild as HTMLElement;
    iframeElem.style.height = '0';
}
/* end TOGGLE EVENT GRAPH VISIBILITY */

function makeMeasureBar(className: string, label: string, primaryColor: string, secondaryColor: string){
    const barWrapper = tag('div', `barWrapper ${className}-bar`);
    const barLabel = tag('span', 'barLabel', label);
    const barNum = tag('span', 'barNum');
    const bar = tag('div', `bar`);
    bar.setAttribute('style', `box-sizing:content-box;width:auto;border-left: 0px solid ${primaryColor};background-color:${secondaryColor}`);
    barWrapper.appendChild(barLabel);
    bar.appendChild(barNum);
    barWrapper.appendChild(bar);
    return {barWrapper, bar, barLabel, barNum};
}

/**
 *STATS BOX CONTROLS
 **/

function displayAccordionLocation(location: MapLocation, accordionWrapperElem: HTMLElement){
    const itemWrapperElem: HTMLElement = tag('div', 'accordionItemWrapper');
    const buttonElem = tag('button', 'accordion', location.title);
    buttonElem.addEventListener('click', (event) => {
        event.preventDefault();
        const elem = event.target as HTMLElement;
        elem.classList.toggle("active");
        elem.nextElementSibling?.classList.toggle("show");
    });
    const itemListElem = tag('ul', 'itemList');
    const panelElem = tag('div', 'panel')
    panelElem.appendChild(tag('p', '', location.description))
    panelElem.append(itemListElem);
    for (const prop in location.items) {
        const items = location.items;
        const item = tag('li', 'item', prop + ': $' + items[prop].cost);
        itemListElem.append(item);
    }
    itemWrapperElem.appendChild(buttonElem)
    itemWrapperElem.appendChild(panelElem);
    accordionWrapperElem.append(itemWrapperElem);
}

/**
 *end STATS BOX CONTROLS
 **/

/**
 *STORY BOX CONTROLS
 **/

//EVENT OBJECT STORED IN SEPARATE FILE

//FUNCTION TO MAKE BUY CHOICE -- NEED TO MAKE THIS!!!

//MAKE AN EVENT APPEAR ON THE SCREEN
function displayEvent(
    storyEvent: StoryEvent,
    playerState: PlayerState,
    jsDom: {[key: string]: HTMLElement}
    ): void {
    const scrollBoxElem = jsDom.scrollBoxElem;
    scrollBoxElem.innerHTML = '';
    const eventWrapperElem: HTMLElement = tag('div', 'storyContentWrapper');
    // eventWrapperElem.dataset.storyEvent = 'storyEvent', JSON.stringify(storyEvent);
    drawMapCanvas(jsDom.mapCanvas as HTMLCanvasElement, playerState);
    scrollBoxElem.appendChild(eventWrapperElem);
    const eventText = storyEvent.getText ?
        storyEvent.getText(playerState) : storyEvent.text ?
        storyEvent.text : '';
    if (typeof eventText !== 'string') {
        throw new Error(`eventText of ${storyEvent.id} is not a string`);
    }
    eventWrapperElem.appendChild(tag('h3', 'eventTitle', storyEvent.title))
    const eventTextWrapperElem = tag('div', 'eventTextWrapper');
    eventTextWrapperElem.innerHTML = eventText;
    eventWrapperElem.appendChild(eventTextWrapperElem);
    const choicesWrapperElem: HTMLElement = tag('div', 'choicesWrapper');
    eventWrapperElem.appendChild(choicesWrapperElem);
    if (storyEvent.createChoices !== undefined) {
        storyEvent.createChoices(playerState);
    }
    const choiceList = [...storyEvent.choices];
    if (Math.floor(Math.random()*10) > 5 && (playerState.crew.length > 0 || playerState.passengers.length > 0)) {
        choiceList.push({
            next: 'crewDebtA',
            getText: (playerState) => {
                return 'Oh no! Someone runs up to you panicking!'
            }
        });
    }
    for (let i = 0; i < choiceList.length; i++) {
        const choice = choiceList[i];
        // choicesWrapperElem.appendChild(choice.getElement(playerState, choice));
        const choiceElem: HTMLElement = tag('div', 'choice');
        const text = choice.getText ?
            choice.getText(playerState) : choice.text ?
            choice.text : '';
        if (typeof text === 'string') {
            choiceElem.innerHTML = text;
        }
        choiceElem.dataset.nextEvent = choice.next;
        choiceElem.dataset.choice = JSON.stringify(choice);
        if (choice.isActionValid && choice.isActionValid(playerState) === false) {
            choiceElem.classList.add('class', 'notValid');
        }
        if (choice.next && !storyEvents.find(obj => obj.id === choice.next)) {
            choiceElem.classList.add('class', 'notValid');
        }
        choiceElem.addEventListener("click", (event) => {
            if (choice.next && !storyEvents.find(obj => obj.id === choice.next)) {
                return;
            }
            if (choice.isActionValid && !choice.isActionValid(playerState)) {
                return;
            }
            if (choice.hasOwnProperty('performAction') && choice.performAction !== undefined) {
                choice.performAction(playerState);
                updateMeasureBar(
                    jsDom.cargoBarElem,
                    jsDom.cargoBarNumElem,
                    playerState.cargo.length,
                    calculateHoldMax(playerState)
                );
                updateCoinsElem(jsDom.coinsElem, playerState);
                updateCrewList(jsDom.crewInnerWrapperElem, playerState);
            }
            const nextEvent = storyEvents.find(obj => obj.id === choice.next) as StoryEvent;
            displayEvent(nextEvent, playerState, jsDom);
        });
        choicesWrapperElem.appendChild(choiceElem);
    }
}
/**
 *end STORY BOX CONTROLS
 **/
