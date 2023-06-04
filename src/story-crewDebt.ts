import * as types from './types';
import { map } from './map';
import {} from './utils';

export const crewDebtStory = [
    {
        id: 'crewDebtA',
        title: 'A debt comes due!',
        getText: function (p: types.PlayerState) {
            const mainCharacter = p.crew.find(person => person.id === p.miniEvent.mainCharacter);
            return `<p>Debt collectors are on the trail of ${mainCharacter.name}, your ship's ${mainCharacter.jobTitle}.</p>`;
        },
        choices: [
            {
                next: 'crewDebtB',
                getText: function (p: types.PlayerState) {
                    const mainCharacter = p.crew.find(person => person.id === p.miniEvent.mainCharacter);
                    const locationList = p.miniEvent.locationList;
                    const lastLocationId = locationList[locationList.length-1];
                    const lastLocation = map.find(place => place.id === lastLocationId);
                    return `Hurry towards ${lastLocation.title} via ${nextLocation.title} to meet with a friend who can help ${mainCharacter.name} out of their sticky situation.`
                },
                isActionValid: function (playerState: types.PlayerState) {
                    return !playerState.crew.find(obj => obj.jobTitle === 'cargoMaster');
                }
            },
            {
                next: 'hireDoctor',
                getText: function (playerState: types.PlayerState) {
                    const text = 'There is one doctor in the station who might be willing to join you. He has a reputation for botched operations and poisonings, but some people swear by his dietary advice. You send him a note asking him to join you, full of unspoken reservations.';
                        return text;
                },
                isActionValid: function (playerState: types.PlayerState) {
                    return !playerState.crew.find(obj => obj.jobTitle === 'doctor');
                }
            },
            {
                next: 'hireNavigator',
                getText: function (playerState: types.PlayerState) {
                    const text = 'Two likely candidates for navigator come to mind. You saw the names of their current ships in port as you docked. They are both junior members of their current crews, and might be interested in becoming the senior navigator on your ship.';
                    return text;
                },
                isActionValid: function (playerState: types.PlayerState) {
                    return !playerState.crew.find(obj => obj.jobTitle === 'navigator');
                }
            },
            {
                next: 'marketExcelsior',
                text: 'Your crew looks good. Time to buy trade goods!',
            }
        ]
    }
];
