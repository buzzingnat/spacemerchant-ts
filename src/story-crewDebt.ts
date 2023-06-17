import * as types from './types';
import { map } from './map';
import { randomInt, jobTitleTransform } from './utils';

export const crewDebtStory = [
    {
        id: 'crewDebtA',
        title: 'A debt comes due!',
        getText: function (p: types.PlayerState) {
            // set characters, event path, cost, reward here
            const characterList = [...p.crew, ...p.passengers];
            const newMainCharacter = characterList.splice(randomInt(0, characterList.length-1))[0];
            const locationList = [p.currentLocationId];
            for(let i = 0; i < 2; i++) {
                const location = map.find(loc => loc.connects.includes(locationList[locationList.length-1]) && !locationList.includes(loc.id));
                locationList.push(location.id);
            }
            p.miniEvent = {
                mainCharacter: newMainCharacter,
                locationList,
                cost: 10000
            };
            // ignore next line because we check mainCharacter type in ternary statement so it is safe
            // @ts-ignore
            return `<p>Debt collectors are on the trail of ${p.miniEvent.mainCharacter.name}, your ship's ${jobTitleTransform(p.miniEvent.mainCharacter.hasOwnProperty('jobTitle') ? p.miniEvent.mainCharacter.jobTitle : '')}. They owe them \$${p.miniEvent.cost}.</p>`;
        },
        choices: [
            {
                next: 'crewDebtB',
                getText: function (p: types.PlayerState) {
                    const mainCharacter = p.miniEvent.mainCharacter;
                    const locationList = p.miniEvent.locationList;
                    const lastLocationId = locationList[locationList.length-1];
                    const lastLocation = map.find(place => place.id === lastLocationId);
                    const nextLocationId = locationList[
                        locationList.findIndex(id => id === p.currentLocationId) + 1
                    ];
                    const nextLocation = map.find(place => place.id === nextLocationId);
                    console.log({locationList, currentLocationId: p.currentLocationId, nextLocationId, lastLocationId});
                    return `Hurry towards ${lastLocation.title} via ${nextLocation.title} to meet with a friend who can help ${mainCharacter.name} out of their sticky situation.`
                },
                isActionValid: function (p: types.PlayerState) {
                    const locationList = p.miniEvent.locationList;
                    const lastLocationId = locationList[locationList.length-1];
                    return lastLocationId !== p.currentLocationId;
                },
                performAction: function (p: types.PlayerState) {
                    const nextLocationId = p.miniEvent.locationList[
                        p.miniEvent.locationList.findIndex(id => id === p.currentLocationId) + 1
                    ];
                    p.currentLocationId = nextLocationId;
                }
            },
            {
                next: 'crewDebtC',
                getText: function (playerState: types.PlayerState) {
                    const text = 'Pay the thugs off.';
                        return text;
                },
                isActionValid: function (playerState: types.PlayerState) {
                    return playerState.coins >= playerState.miniEvent.cost;
                },
                performAction: function (playerState: types.PlayerState) {
                    playerState.coins -= playerState.miniEvent.cost;
                }

            }
        ]
    },
    {
        id: 'crewDebtB',
        title: 'Racing to a friend!',
        getText: function (p: types.PlayerState) {
            const keepGoing = `There is no time to waste! Keep going!`
            return keepGoing;
        },
        choices: [
            {
                next: 'crewDebtB',
                getText: function (p: types.PlayerState) {
                    const mainCharacter = p.miniEvent.mainCharacter;
                    const locationList = p.miniEvent.locationList;
                    const lastLocationId = locationList[locationList.length-1];
                    const lastLocation = map.find(place => place.id === lastLocationId);
                    const nextLocationId = locationList[
                        locationList.findIndex(id => id === p.currentLocationId) + 1
                    ];
                    const nextLocation = map.find(place => place.id === nextLocationId);
                    const goNextLocation = `Hurry towards ${lastLocation.title} via ${nextLocation.title} to meet with a friend who can help ${mainCharacter.name} out of their sticky situation.`;
                    const goLastLocation = `Hurry to ${lastLocation.title} to meet with a friend who can help ${mainCharacter.name} out of their sticky situation.`;
                    if (nextLocationId === lastLocationId) {
                        this.next = 'crewDebtD';
                        return goLastLocation;
                    }
                    return goNextLocation;
                },
                isActionValid: function (p: types.PlayerState) {
                    const locationList = p.miniEvent.locationList;
                    const nextLocationId = locationList[
                        locationList.findIndex(id => id === p.currentLocationId) + 1
                    ];
                    return locationList.includes(nextLocationId);
                },
                performAction: function (p: types.PlayerState) {
                    const nextLocationId = p.miniEvent.locationList[
                        p.miniEvent.locationList.findIndex(id => id === p.currentLocationId) + 1
                    ];
                    p.currentLocationId = nextLocationId;
                }
            },
            {
                next: 'crewDebtC',
                getText: function (playerState: types.PlayerState) {
                    const text = 'Pay the thugs off.';
                        return text;
                },
                isActionValid: function (playerState: types.PlayerState) {
                    return playerState.coins >= playerState.miniEvent.cost;
                },
                performAction: function (playerState: types.PlayerState) {
                    playerState.coins -= playerState.miniEvent.cost;
                }

            }
        ]
    },
    {
        id: 'crewDebtC',
        title: 'Pay the thugs off.',
        getText: function (p: types.PlayerState) {
            return `You had the money to make this problem go away. Thank goodness! Now back to your safer everyday life.`;
        },
        createChoices: function(p: types.PlayerState) {
            const locId = p.currentLocationId;
            const firstLetterCap = locId.charAt(0).toUpperCase();
            const restOfWord = locId.slice(1);
            const nameOfStation = map.find(loc => loc.id === locId).title;
            this.choices = [
                {
                    next: `market${firstLetterCap}${restOfWord}`,
                    text: `Go to market at ${nameOfStation}.`
                },
                ...this.choices
            ];
        },
        choices: []
    },
    {
        id: 'crewDebtD',
        title: 'A friend helps you out of a bind.',
        getText: function (p: types.PlayerState) {
            const mainCharacter = p.miniEvent.mainCharacter;
            const arrive = `You made it! You find ${mainCharacter.name}'s friend. They are disappionted to have to bail them out, but willing to give them one more chance.`;
            return arrive;
        },
        createChoices: function(p: types.PlayerState) {
            const locId = p.currentLocationId;
            const firstLetterCap = locId.charAt(0).toUpperCase();
            const restOfWord = locId.slice(1);
            const nameOfStation = map.find(loc => loc.id === locId).title;
            this.choices = [
                {
                    next: `market${firstLetterCap}${restOfWord}`,
                    text: `Go to market at ${nameOfStation}.`
                },
                ...this.choices
            ];
        },
        choices: []
    }
];
