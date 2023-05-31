import * as types from './types';
import { tag, buildIcon, calculateCargo } from './utils';
import { events } from './events';
import { map } from './map';

const COL_BLUE = 'cornflowerblue';
const COL_RED = 'lightcoral';
// const COL_ORANGE = 'sandybrown';
// const COL_LTGRAY = 'silver';
const COL_DKGRAY = 'gray';

/**
 *PLAYER STATE
 **/
const playerState: types.PlayerState = {
  'coins': 100000,
  'cargo': {
    'holdMax': 10,
    'shipSupplies': 0,
    'tradeLuxury': 0,
    'tradeMedicine': 0,
    'tradeFood': 0
  },
  'ship': '',
  'passengers': [],
  'crew': [],
  'costChoice': 0,
  'updateUI': false,
};
/* end PLAYER STATE */

/**
 *GLOBAL OBJECTS
 **/
// @ts-ignore
window.storyEvents = events;
// @ts-ignore
window.playerState = playerState;
/* end GLOBAL OBJECTS */

/**
 *GLOBAL DOM ELEMENTS
 **/
const jsDom: {[key: string]: HTMLElement} | undefined = {};

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
    jsDom.statsTabContentElem = tabContentElem;
    return {tabContentElem, strengthBarElem: strengthBarCollection.bar};
}

function makeMapTab(selected: boolean, jsDom: {[key: string]: HTMLElement}): {[key: string]: HTMLElement} {
    // content for tab 2
    const accordionWrapperElem: HTMLElement = tag('div', 'accordionWrapper');
    const tabContentElem = tag('div', `js-tabContent tabContent tabContent2 ${selected ? 'selected' : ''}`);
    for(let i = 0; i < map.length; i++) {
        displayAccordionLocation(map[i], accordionWrapperElem);
    }
    tabContentElem.appendChild(accordionWrapperElem);
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
    const tabContentElem = tag('div', `js-tabContent tabContent tabContent3 ${selected ? 'selected' : ''}`);
    tabContentElem.appendChild(tag('p', '', explainText3));
    tabContentElem.appendChild(coinsElem);
    tabContentElem.appendChild(cargoBarCollection.barWrapper);
    // build CREW INFO section
    const crewWrapperElem = tag('div', 'crewWrapper');
    const crewTitleElem = tag('h3', 'crewTitle', 'Crew');
    crewWrapperElem.appendChild(crewTitleElem);
    const crewInnerWrapperElem = tag('ul', 'crewInnerWrapper');
    const crewList = [];
    if (playerState.crew.length < 1) {
        crewInnerWrapperElem.appendChild(tag('li', 'crew', 'No crew hired on this ship!'));
    } else {
        for(let i = 0; i < playerState.crew.length; i++) {
            const crew = playerState.crew[i];
            const crewElem = tag(
                'li',
                'crew',
                `${crew.jobTitle} named ${crew.name} with a salary of ` +
                `${crew.salary} and bonus of ${JSON.stringify(crew.bonus)}.`
            );
            crewList.push(crew);
            crewInnerWrapperElem.appendChild(crewElem);
        }
    }
    crewWrapperElem.appendChild(crewInnerWrapperElem);
    tabContentElem.appendChild(crewWrapperElem);
    // end CREW INFO SECTION
    jsDom.coinsElem = coinsElem;
    jsDom.cargoBarElem = cargoBar;
    jsDom.cargoBarWrapperElem = cargoBarWrapper;
    jsDom.cargoBarLabelElem = cargoBarLabel;
    jsDom.itemTabContentElem = tabContentElem;
    jsDom.crewWrapperElem = crewWrapperElem;
    jsDom.crewInnerWrapperElem = crewInnerWrapperElem;
    jsDom.crewTitleElem = crewTitleElem;
    return {coinsElem, tabContentElem, crewWrapperElem, crewInnerWrapperElem, crewTitleElem};
}
function updateCoinsElem(coinsElem: HTMLElement, playerState: types.PlayerState): void {
    coinsElem.innerText = `Coins: ${playerState.coins}`;
}
function updateCrewList(crewInnerWrapperElem: HTMLElement, playerState: types.PlayerState): void {
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
                `${crew.jobTitle} named ${crew.name} with a salary of ` +
                `${crew.salary} and bonus of ${JSON.stringify(crew.bonus)}.`
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
    const statsBoxElem: HTMLElement = tag('div', 'js-statsBox js-tabbedArea center');
    const controlBoxElem: HTMLElement = tag('div', 'js-controlBox left');
    const storyBoxElem: HTMLElement = tag('div', 'js-storyBox right');
    const scrollBoxElem: HTMLElement = tag('div', 'js-scrollbox');

    mainGameElem.appendChild( statsBoxElem );
    mainGameElem.appendChild( controlBoxElem );
    mainGameElem.appendChild( storyBoxElem );
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

    const tabsElemAsArray = Array.from(tabsElem.getElementsByClassName('js-tab'));
    const tabsContentElemAsArray = Array.from(tabsElem.getElementsByClassName('js-tabContent'));

    tabsElemAsArray.forEach((elem: Element) => {
        elem.addEventListener('click', (event) => {
            const clickedTab = event.target as HTMLElement;
            console.log({clickedTab});
            tabsElemAsArray.forEach(elem => elem.classList.remove('selected'));
            tabsContentElemAsArray.forEach(elem => elem.classList.remove('selected'));
            console.log({unselected: clickedTab.classList});
            clickedTab.classList.add('selected');
            console.log({selectedAgain: clickedTab.classList});
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

    //create scroll buttons that hover in the top right corner
    const arrowWrapperElem = tag('div', 'arrowWrapper');
    const arrowUpElem = tag('div', 'arrow-up');
    const arrowDownElem = tag('div', 'arrow-down');
    arrowWrapperElem.appendChild(arrowUpElem);
    arrowWrapperElem.appendChild(arrowDownElem);
    mainGameElem.appendChild(arrowWrapperElem);
    clickAndHold(() => scrollUpStory(storyBoxElem), arrowUpElem);
    clickAndHold(() => scrollDownStory(storyBoxElem), arrowDownElem);

    jsDom.statsBoxElem = statsBoxElem;
    jsDom.controlBoxElem = controlBoxElem;
    jsDom.storyBoxElem = storyBoxElem;
    jsDom.scrollBoxElem = scrollBoxElem;
    jsDom.arrowWrapperElem = arrowWrapperElem;
    jsDom.arrowUpElem = arrowUpElem;
    jsDom.arrowDownElem = arrowDownElem;

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
                    events.find(obj => obj.id === 'firstEvent') as types.StoryEvent
                );
            }
        }, 50);
        checkForCoinElem();
    };
}

function initGame(playerState: types.PlayerState, scrollBoxElem: HTMLElement, firstEvent: types.StoryEvent) {
    displayEvent(
        firstEvent,
        playerState,
        jsDom
    );
    updateMeasureBar(jsDom.cargoBarElem, calculateCargo(playerState), playerState.cargo.holdMax);
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
    jsDom.iframeWrapperElem.style.visibility = 'visible';
}
function hideGraph() {
    if (!document) {
        return;
    }
    jsDom.mainGameElem.style.display = 'block';
    jsDom.iframeWrapperElem.style.visibility = 'hidden';
}
/* end TOGGLE EVENT GRAPH VISIBILITY */

function makeMeasureBar(className: string, label: string, primaryColor: string, secondaryColor: string){
    const barWrapper = tag('div', 'barWrapper');
    const barLabel = tag('span', 'barLabel', label);
    const bar = tag('div', `bar ${className}-bar`);
    bar.setAttribute('style', `width:auto;border-right: 0px solid ${secondaryColor};background-color:${primaryColor}`);
    barWrapper.appendChild(barLabel);
    barWrapper.appendChild(bar);
    return {barWrapper, bar, barLabel};
}
function updateMeasureBar(bar: HTMLElement, currentValue: number, maxValue: number){
    if (!bar) {
        return console.log('bar element not found');
    }
    const width = bar.clientWidth;
    bar.style.borderRightWidth = Math.round((1-(currentValue/maxValue))*width)+'px';
    bar.innerText = currentValue + '/' + maxValue;
}

/**
 *STATS BOX CONTROLS
 **/

function displayAccordionLocation(location: types.Location, accordionWrapperElem: HTMLElement){
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
    location.items.forEach((obj) => {
        const item = tag('li', 'item', obj.name + ': ' + obj.quantity);
        itemListElem.append(item);
    });
    itemWrapperElem.appendChild(buttonElem)
    itemWrapperElem.appendChild(panelElem);
    accordionWrapperElem.append(itemWrapperElem);
}

/**
 *end STATS BOX CONTROLS
 **/

/**
 *SCROLL BUTTONS
 **/
//on click scrolling for the scroll buttons
function scrollUpStory(storyBoxElem: HTMLElement): void {
  storyBoxElem.scrollTop -= 3;
}
function scrollDownStory(storyBoxElem: HTMLElement): void {
  storyBoxElem.scrollTop += 3;
}

//when mouse is clicked and held, keep taking an action until mouseup or mouseleave
function clickAndHold(actionToTake: () => void, elementClicked: HTMLElement): void {
  let timeoutId: NodeJS.Timer;
  elementClicked.addEventListener('mousedown', () => {
      timeoutId = setInterval(actionToTake, 10);
  });
  elementClicked.addEventListener('mouseup', () => {
    clearTimeout(timeoutId);
  });
  elementClicked.addEventListener('mouseleave', () => {
    clearTimeout(timeoutId);
  });
}
/* end SCROLL BUTTONS */


/**
 *STORY BOX CONTROLS
 **/

//EVENT OBJECT STORED IN SEPARATE FILE

//FUNCTION TO MAKE BUY CHOICE -- NEED TO MAKE THIS!!!

//MAKE AN EVENT APPEAR ON THE SCREEN
function displayEvent(
    storyEvent: types.StoryEvent,
    playerState: types.PlayerState,
    jsDom: {[key: string]: HTMLElement}
    ) {
    const scrollBoxElem = jsDom.scrollBoxElem;
    scrollBoxElem.innerHTML = '';
    const eventWrapperElem: HTMLElement = tag('div', 'storyContentWrapper');
    eventWrapperElem.dataset.storyEvent = 'storyEvent', JSON.stringify(storyEvent);
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
    for (let i = 0; i < storyEvent.choices.length; i++) {
        const choice = storyEvent.choices[i];
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
        if (choice.next && !events.find(obj => obj.id === choice.next)) {
            choiceElem.classList.add('class', 'notValid');
        }
        choiceElem.addEventListener("click", (event) => {
            if (choice.next && !events.find(obj => obj.id === choice.next)) {
                return;
            }
            if (choice.isActionValid && !choice.isActionValid(playerState)) {
                return;
            }
            if (choice.hasOwnProperty('performAction') && choice.performAction !== undefined) {
                choice.performAction(playerState);
                updateMeasureBar(jsDom.cargoBarElem, calculateCargo(playerState), playerState.cargo.holdMax);
                updateCoinsElem(jsDom.coinsElem, playerState);
                updateCrewList(jsDom.crewInnerWrapperElem, playerState);
            }
            const nextEvent = events.find(obj => obj.id === choice.next) as types.StoryEvent;
            displayEvent(nextEvent, playerState, jsDom);
        });
        choicesWrapperElem.appendChild(choiceElem);
    }
}
/**
 *end STORY BOX CONTROLS
 **/
