import { tag, updateMeasureBar, calculateHoldMax } from './utils';
import { events as storyEvents } from './events';

export function makeMarket() {
    return `<wrapper>`+
        +`<leftSection><choice></choice><choice></choice><choice></choice></leftSection>`
        +`<rightSection><choice></choice><choice></choice><choice></choice></rightSection>`
        +`</wrapper>`;
}

export function getStandardChoiceElement(
    playerState: PlayerState,
    choice: StoryChoice,
    jsDom: {[key: string]: HTMLElement} | undefined,
    updateCoinsElem: (coinsElem: HTMLElement, playerState: PlayerState) => void,
    updateCrewList: (crewInnerWrapperElem: HTMLElement, playerState: PlayerState) => void,
    displayEvent: (
        storyEvent: StoryEvent, playerState: PlayerState,
        jsDom: {[key: string]: HTMLElement} | undefined
    ) => void,
    choicesWrapperElem: HTMLElement
): HTMLElement {
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
    return choiceElem;
}