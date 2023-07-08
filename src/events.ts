import {
    makeSellChoice,
    makeBuyChoice,
    makePurchaseChoices,
    hasEnoughMoney,
    getItemTitle
} from './utils';
import { map as stations } from './map';

export const events = [
    {
        id: 'firstEvent',
        title: 'Windfall Gains',
        text:
            `<p>You have just completed a run with the merchant ship you've worked on for five years.`+
            `This run was phenomenally succesful, and your captain has decided to `+
            `retire while she's ahead.</p>`+
            `<p>You are now without a job and in a space station far from your home. To ease the sting `+
            `of her crew's unexpected unemployment, every crewmember has been given a large sum of money, `+
            `the "extra's" from the windfall earned on the last run. You know exactly what to do with `+
            `your earnings: become captain of your own vessel and seek your own fortune in the depths of `+
            `space.</p>`+
            `<p>In this small port, your options are limited. Which ship will you choose?</p>`
        ,
        choices: [
            {
                next: 'worstShip',
                cost: 40000,
                getText: function (playerState: PlayerState) {
                    return 'The grimy, cheap looking one. You\'ll spend the rest of your money on your crew and supplies. Costs ' + this.cost + ' coins.';
                },
                isActionValid: function (playerState: PlayerState) {
                    return playerState.coins >= this.cost;
                },
                performAction: function (playerState: PlayerState) {
                    playerState.coins -= this.cost;
                    playerState.ship = 'worst';
                }
            },
            {
                next: 'bestShip',
                cost: 90000,
                getText: function (playerState: PlayerState) {
                    return 'The shiny, expensive one. With an AI like that, who needs a crew?! Costs ' + this.cost + ' coins.';
                },
                isActionValid: function (playerState: PlayerState) {
                    return playerState.coins >= this.cost;
                },
                performAction: function (playerState: PlayerState) {
                    playerState.coins -= this.cost;
                    playerState.ship = 'best';
                    playerState.crew.push({
                        id: 'shipai',
                        name: 'Ship AI',
                        salary: 2000,
                        savings: 0,
                        jobTitle: 'ai',
                        bonus: {
                            holdMax: 2,
                            speed: 2,
                            health: 2,
                        }
                    });
                    playerState.updateUI = true;
                }
            }
        ]
    },
    {
        id: 'worstShip',
        title: 'The Worst Ship',
        getText: function (playerState: PlayerState) {
            return '<p>You picked the rough and tumble ship and managed to pay very little for it. The seller had a relieved look in their eyes as they passed all of the access and ownership documents to you. Now you need to find someone to help you run the thing.</p><p>Having worked on a ship for five years full time, and lived around them for your formative years before that, you are a fair jack-of-all-trades on board. But a good navigator and an experienced mechanic can make the difference between life and death in the vastness between stars.</p><p>First, a navigator. Two likely candidates come to mind. You saw the names of their current ships in port as you docked. They are both junior members of their current crews, and might be interested in becoming the senior navigator on your ship. Who do you ask?</p>';
        },
        choices: [
            {
                next: 'crewHired',
                getText: function (playerState: PlayerState) {
                    return 'Time to think about hiring a crew.';
                },
            }
        ]
    },
    {
        id: 'bestShip',
        title: 'The Best Ship',
        text:
            `<p>You manage to bargain the sale price down from impossibly high `+
            `to uncomfortably high. You will be eating light until you earn some `+
            `money. After one more exhaustive once-over of the ship, -- your `+
            `ship, now! -- you plot a course through the next several way points `+
            `toward your home planet and examine the markets to find cargo to `+
            `haul.</p>`,
        choices: [
            {
                next: 'marketExcelsiorBeginning',
                text: 'Check the markets and buy goods and supplies.',
            }
        ]
    },
    {
        id: 'crewHired',
        title: 'Your crew so far',
        getText: function (playerState: PlayerState) {
            let textBase: string = `<p>Several ships are in port whose junior officers you have seen or heard of over your years in this business. What sort of skillset are you most interested in acquiring now?</p><p>So far, you have hired: </p><ul>`;
            if (!playerState.crew.find(obj => obj.jobTitle === 'doctor') &&
                !playerState.crew.find(obj => obj.jobTitle === 'cargoMaster') &&
                !playerState.crew.find(obj => obj.jobTitle === 'navigator') &&
                !playerState.crew.find(obj => obj.jobTitle === 'ai')
                ) {
                textBase += '<li>No one! Careful, you\'re not terribly effective all by yourself right now.</li>';
            }
            if (playerState.crew.find(obj => obj.jobTitle === 'navigator')) {
                textBase += '<li>A navigator named ' + playerState.crew.find(obj => obj.jobTitle === 'navigator')?.name + ', helpful in speeding your ship on its way.</li>';
            }
            if (playerState.crew.find(obj => obj.jobTitle === 'cargoMaster')) {
                textBase += '<li>A cargo master named ' + playerState.crew.find(obj => obj.jobTitle === 'cargoMaster')?.name + ', helpful at cramming more goods in less space.</li>';
            }
            if (playerState.crew.find(obj => obj.jobTitle === 'doctor')) {
                textBase += '<li>A doctor named ' + playerState.crew.find(obj => obj.jobTitle === 'doctor')?.name + ', helpful at keeping you and your crew healthy through the dangers of space travel.</li>';
            }
            if (playerState.crew.find(obj => obj.jobTitle === 'ai')) {
                textBase += '<li>An AI named ' + playerState.crew.find(obj => obj.jobTitle === 'ai')?.name + ' who is a jack of all trades.</li>';
            }
            textBase += '</ul>'
            return textBase;
        },
        choices: [
            {
                next: 'hireCargoMaster',
                getText: function (playerState: PlayerState) {
                    const text = 'You have heard of two promising cargo master\'s currently docked in Excelsior Station. Ask around to see if anyone would be interested in joining your crew.';
                    return text;
                },
                isActionValid: function (playerState: PlayerState) {
                    return !playerState.crew.find(obj => obj.jobTitle === 'cargoMaster');
                }
            },
            {
                next: 'hireDoctor',
                getText: function (playerState: PlayerState) {
                    const text = 'There is one doctor in the station who might be willing to join you. He has a reputation for botched operations and poisonings, but some people swear by his dietary advice. You send him a note asking him to join you, full of unspoken reservations.';
                        return text;
                },
                isActionValid: function (playerState: PlayerState) {
                    return !playerState.crew.find(obj => obj.jobTitle === 'doctor');
                }
            },
            {
                next: 'hireNavigator',
                getText: function (playerState: PlayerState) {
                    const text = 'Two likely candidates for navigator come to mind. You saw the names of their current ships in port as you docked. They are both junior members of their current crews, and might be interested in becoming the senior navigator on your ship.';
                    return text;
                },
                isActionValid: function (playerState: PlayerState) {
                    return !playerState.crew.find(obj => obj.jobTitle === 'navigator');
                }
            },
            {
                next: 'marketExcelsiorBeginning',
                text: 'Your crew looks good. Time to buy trade goods!',
            }
        ]
    },
    {id: 'hireNavigator',
        title: 'Hiring a Navigator',
        cost: 10000,
        getText: function (playerState: PlayerState) {
            return '<p>You have two choices for navigator. The first is Dorothy.</p><p>Dorothy is an older, grizzled veteran of many journeys. She has always worked in the shadow of her superiors and has a sour attitude about it. But her captain swears that she can pilot a brick through an emergency planet landing, and looking at your new ship, that might be a useful skill to have.</p><p>Your other option is Eugene. Eugene is a young upstart, only in space for two years and already the subject of drunken praise in a dozen stations. He is impatient for glory, but charming, affable, and very clever.</p>';
        },
        choices: [
            {
                next: 'grouchyNavigator',
                text:
                    'Ask Dorothy to join you.'
            },
            {
                next: 'ambitiousNavigator',
                text:
                    'Offer a position to Eugene.'
            },
            {
                next: 'crewHired',
                text:
                    'Decide to spend your money on a different crewmember.'
            }
        ]
    },
    {id: 'grouchyNavigator',
        title: 'An Experienced Navigator',
        cost: 10000,
        getText: function (playerState: PlayerState) {
            return '<p>Dorothy calls you shortly after recieving your note offering her a job.</p><p>"Sure, I\'ll join your crew. It\'ll cost you though kid. To start, pay me "' + this.cost + ' coins. Every port, I\'ll need another '+(this.cost)/10+' coins.</p>';
        },
        choices: [
            {
                cost: 10000,
                next: 'crewHired',
                getText: function (playerState: PlayerState) {
                    return 'Hire them!';
                },
                isActionValid: function (playerState: PlayerState) {
                    return playerState.coins >= (this.cost)+(this.cost/10);
                },
                performAction: function (playerState: PlayerState) {
                    playerState.coins -= this.cost;
                    const person: Employee = {
                        id: 'dorothy',
                        name: 'Dorothy',
                        jobTitle: 'navigator',
                        salary: this.cost/10,
                        savings: this.cost*2,
                        bonus: {
                            holdMax: 0,
                            speed: 7,
                            health: 0,
                        }
                    };
                    playerState.crew.push(person);
                }
            },
            {
                next: 'ambitiousNavigator',
                text:
                    'Turn her down, try asking the ambitious, young Eugene instead.'
            },
            {
                next: 'crewHired',
                text:
                    'Decide to spend your money on a different crew position, or none at all.'
            }
        ]
    },
    {
        id: 'ambitiousNavigator',
        title: 'An Ambitious Young Navigator',
        cost: 5000,
        getText: function (playerState: PlayerState) {
            return '<p>You send a note offering a position to Eugene.</p><p>He sends a message back. It reads in part, "Finally, someone is willing to get me off my boat! I\'ll make you a good deal. Just "' + this.cost + ' coins to start, and at every port, I\'ll need another '+(this.cost)/10+' coins. You won\'t regret this, I promise!"</p>';
                },
        choices: [
            {
                cost: 5000,
                next: 'crewHired',
                getText: function (playerState: PlayerState) {
                    return 'Hire them!';
                },
                isActionValid: function (playerState: PlayerState) {
                    return playerState.coins >= (this.cost)+(this.cost/10);
                },
                performAction: function (playerState: PlayerState) {
                    playerState.coins -= this.cost;
                    const person: Employee = {
                        id: 'eugene',
                        name: 'Eugene',
                        jobTitle: 'navigator',
                        salary: this.cost/10,
                        savings: this.cost*2,
                        bonus: {
                            holdMax: 0,
                            speed: 5,
                            health: 0,
                        }
                    };
                    playerState.crew.push(person);
                }
            },
            {
                next: 'grouchyNavigator',
                text: 'Turn him down, try asking the experienced, older Dorothy instead.'
            },
            {
                next: 'crewHired',
                text: 'Decide to spend your money on a different crew position, or none at all.'
            }
        ]
    },
    {id: 'hireCargoMaster',
        title: 'Hiring a Navigator',
        getText: function (playerState: PlayerState) {
            return '<p>You have two choices for cargo master. The first is Alice.</p><p>Alice has long blond hair and falls into holes more often than anyone expects. She has a history of awkward relationships with much older men. She is a terrible cargo master.</p><p>Your other option is Addams. Addams loves dark, cavernous spaces and styling them with creepy elegance. He is a decent cargo master.</p>';
        },
        choices: [
            {
                next: 'badCargoMaster',
                text: 'Ask Alice to join you.'
            },
            {
                next: 'goodCargoMaster',
                text: 'Offer a position to Adamm.'
            },
            {
                next: 'crewHired',
                text: 'Decide to spend your money on a different crewmember.'
            }
        ]
    },
    {id: 'badCargoMaster',
        title: 'A Falling Cargo Master',
        cost: 3000,
        getText: function (playerState: PlayerState) {
            return '<p>Alice answers your video call, her left temple bruised. Probably from a recent fall.</p><p>She smiles cheerfully and says, "Your ship must have fewer holes than this one! I\'d be happy to join you! It\'ll cost me "' + this.cost + ' coins to move into my new berth on your boat. Every port, I\'ll need another '+(this.cost)/10+' coins.</p>';
        },
        choices: [
            {
                cost: 3000,
                next: 'crewHired',
                getText: function (playerState: PlayerState) {
                    return 'Hire them!';
                },
                isActionValid: function (playerState: PlayerState) {
                    return playerState.coins >= (this.cost)+(this.cost/10);
                },
                performAction: function (playerState: PlayerState) {
                    playerState.coins -= this.cost;
                    const person: Employee = {
                        id: 'alice',
                        name: 'Alice',
                        jobTitle: 'cargoMaster',
                        salary: this.cost/10,
                        savings: this.cost*2,
                        bonus: {
                            holdMax: 3,
                            speed: 0,
                            health: 0,
                        }
                    };
                    playerState.crew.push(person);
                }
            },
            {
                next: 'goodCargoMaster',
                text:
                    'Turn her down, try asking the brooding, capable Addams instead.'
            },
            {
                next: 'crewHired',
                text:
                    'Decide to spend your money on a different crew position, or none at all.'
            }
        ]
    },
    {
        id: 'goodCargoMaster',
        title: 'A Creepy Cargo Master',
        cost: 12000,
        getText: function (playerState: PlayerState) {
            return '<p>You send a note offering a position to Addams.</p><p>He sends a message back. It reads in part, "Your ship is small, and therefore ugly. But it has character. For "' + this.cost + ' coins to start I\'ll join you, and at every port, I\'ll need another '+(this.cost)/10+' coins."</p>';
                },
        choices: [
            {
                cost: 12000,
                next: 'crewHired',
                getText: function (playerState: PlayerState) {
                    return 'Hire them!';
                },
                isActionValid: function (playerState: PlayerState) {
                    return playerState.coins >= (this.cost)+(this.cost/10);
                },
                performAction: function (playerState: PlayerState) {
                    playerState.coins -= this.cost;
                    const person: Employee = {
                        id: 'addams',
                        name: 'Addams',
                        jobTitle: 'cargoMaster',
                        salary: this.cost/10,
                        savings: this.cost*2,
                        bonus: {
                            holdMax: 10,
                            speed: 0,
                            health: 0,
                        }
                    };
                    playerState.crew.push(person);
                }
            },
            {
                next: 'badCargoMaster',
                text:
                    'Turn him down, try asking the clumsy Alice instead.'
            },
            {
                next: 'crewHired',
                text:
                    'Decide to spend your money on a different crew position, or none at all.'
            }
        ]
    },
    {
        id: 'hireDoctor',
        title: 'A Venomous Doctor',
        cost: 700,
        getText: function (playerState: PlayerState) {
            return '<p>The doctor, an older man named Daniel, sends a note in response to your invitation. "Of course I\'ll join your crew, dear! My pharmaceutical skills are unappreciated here. It\'ll only cost you "' + this.cost + ' coins to hire me away from my current ship. Every port, I\'ll need another '+(this.cost)*10+' coins."</p>';
        },
        choices: [
            {
                cost: 700,
                next: 'crewHired',
                getText: function (playerState: PlayerState) {
                    return 'Hire them!';
                },
                isActionValid: function (playerState: PlayerState) {
                    return playerState.coins >= (this.cost)+(this.cost*10);
                },
                performAction: function (playerState: PlayerState) {
                    playerState.coins -= this.cost;
                    const person: Employee = {
                        id: 'daniel',
                        name: 'Daniel',
                        jobTitle: 'doctor',
                        salary: this.cost/10,
                        savings: this.cost*2,
                        bonus: {
                            holdMax: 0,
                            speed: 0,
                            health: 7,
                        }
                    };
                    playerState.crew.push(person);
                }
            },
            {
                next: 'crewHired',
                text:
                    'Decide to spend your money on a different crew position, or none at all.'
            }
        ]
    },
    {
        id: 'arriveExcelsior',
        title: 'Arriving in Excelsior Station',
        getText: function (playerState: PlayerState) {
            const text1 = 'You are back in the remote Excelsior Station. You already look forward to leaving.';
            return `<p>${text1}</p>`;
        },
        choices: [
            {
                next: 'marketEuropa',
                getText: function (playerState: PlayerState) {
                    const text1 = 'You might as well check what you can buy and sell before you get underway.';
                    return `<p>${text1}</p>`;
                },
            }
        ]
    },
    {id: 'marketExcelsior',
        title: 'Excelsior: To market, to market...',
        getText: function(playerState: PlayerState){
            const text1 = 'You scroll through the market listings, looking at what is best to buy and sell here. You have a little money left to buy some goods to ship and some supplies to keep yourself and your ship functioning on your journey.';
            const text2 = 'The listings are kept in the "Map" section of your display.';
            return `<p>${text1}</p><p>${text2}</p>`;
        },
        createChoices: function(playerState: PlayerState) {
            const station = stations.find(station => station.id === 'excelsior');
            if (this.choices.findIndex((c) => c.getText(playerState).includes('coins per unit.')) <= -1) {
                this.choices = [
                    ...makePurchaseChoices(
                        'marketExcelsior',
                        {
                            food: station.items.food.cost - 1,
                            medicine: station.items.medicine.cost - 1,
                            luxury: station.items.luxury.cost - 1,
                            shipSupplies: 5
                        },
                        {
                            food: station.items.food.cost,
                            medicine: station.items.medicine.cost,
                            luxury: station.items.luxury.cost,
                            shipSupplies: 5
                        },
                        makeSellChoice, makeBuyChoice, playerState, hasEnoughMoney, getItemTitle
                    ),
                    ...this.choices
                ];
            }
        },
        choices: [
            {
                next: 'arriveHaliax',
                text: 'Leave for <b>Haliax Station</b>.'
            }
        ]
    },
    {id: 'marketExcelsiorBeginning',
        title: 'Excelsior: To market, to market...',
        getText: function(playerState: PlayerState){
            const text1 = 'You scroll through the market listings, looking at what is best to buy and sell here. You have a little money left to buy some goods to ship and some supplies to keep yourself and your ship functioning on your journey.';
            const text2 = 'The listings are kept in the "Map" section of your display.';
            return `<p>${text1}</p><p>${text2}</p>`;
        },
        createChoices: function(playerState: PlayerState) {
            const station = stations.find(station => station.id === 'excelsior');
            if (this.choices.findIndex((c) => {
                if (!c.getText) {
                    return 0;
                }
                return c.getText(playerState).includes('coins per unit.');
            }) <= -1) {
                this.choices = [
                    ...makePurchaseChoices(
                        'marketExcelsiorBeginning',
                        {
                            food: station.items.food.cost - 1,
                            medicine: station.items.medicine.cost - 1,
                            luxury: station.items.luxury.cost - 1,
                            shipSupplies: 5
                        },
                        {
                            food: station.items.food.cost,
                            medicine: station.items.medicine.cost,
                            luxury: station.items.luxury.cost,
                            shipSupplies: 5
                        },
                        makeSellChoice, makeBuyChoice, playerState, hasEnoughMoney, getItemTitle
                    ),
                    ...this.choices
                ];
            }
        },
        choices: [{next: 'maidenVoyage', text: 'You finish stocking up and settle in for a long ride to Haliax Station in the Ganymede Prime system, your next port. You\'re headed home to your family. It\'s been almost a year since you last saw them.'}]
    },
    {
        id: 'maidenVoyage',
        title: 'Your Maiden Voyage',
        getText: function (playerState: PlayerState) {
            const text1 = 'You head out from port, a captain on your maiden trip.';
            const text2 = 'Bon voyage!';
            return `<p>${text1}</p><p>${text2}</p>`;
        },
        choices: [
            {
                next: 'arriveHaliax',
                getText: function (playerState: PlayerState) {
                    const text1 = 'You arrive safely at Haliax Station.';
                    return `<p>${text1}</p>`;
                },
                performAction: function (p: PlayerState) {
                    p.currentLocationId = 'haliax';
                }
            }
        ]
    },
    {
        id: 'arriveExcelsior',
        title: 'Arriving in Excelsior Station',
        getText: function (playerState: PlayerState) {
            const text1 = 'This station is a distant backwater.';
            return `<p>${text1}</p>`;
        },
        choices: [
            {
                next: 'marketExcelsior',
                getText: function (playerState: PlayerState) {
                    const text1 = 'Go to market.';
                    return `<p>${text1}</p>`;
                },
            }
        ]
    },
    {
        id: 'arriveHaliax',
        title: 'Arriving in Haliax Station',
        getText: function (playerState: PlayerState) {
            const text1 = 'This station orbits a largely agrarian planet. Food is cheap, but art and entertainment are hard to find on this lightly populated world and it\'s bare-bones station.';
            return `<p>${text1}</p>`;
        },
        choices: [
            {
                next: 'marketHaliax',
                getText: function (playerState: PlayerState) {
                    const text1 = 'Go make a killing by selling luxury goods! Or at least check the markets with an eye toward the future.';
                    return `<p>${text1}</p>`;
                }
            }
        ]
    },
    {
        id: 'marketHaliax',
        title: 'Haliax: To market, to market...',
        getText: function(playerState: PlayerState){
            var text1 = 'You scroll through the market listings, looking at what is best to buy and sell here.';
            var text2 = 'The listings are kept in the "Map" section of your display.';
            return `<p>${text1}</p><p>${text2}</p>`;
        },
        createChoices: function(playerState: PlayerState) {
            const station = stations.find(station => station.id === 'haliax');
            if (this.choices.findIndex((c) => c.getText(playerState).includes('coins per unit.')) <= -1) {
                this.choices = [
                    ...makePurchaseChoices(
                        'marketHaliax',
                        {
                            food: station.items.food.cost - 1,
                            medicine: station.items.medicine.cost - 1,
                            luxury: station.items.luxury.cost - 1,
                            shipSupplies: 5
                        },
                        {
                            food: station.items.food.cost,
                            medicine: station.items.medicine.cost,
                            luxury: station.items.luxury.cost,
                            shipSupplies: 5
                        },
                        makeSellChoice, makeBuyChoice, playerState, hasEnoughMoney, getItemTitle
                    ),
                    ...this.choices
                ];
            }
        },
        choices: [
            {
                next: 'arriveExcelsior',
                getText: function (playerState: PlayerState) {
                    const text1 = 'You leave Haliax Station, heading to <b>Excelsior Station</b> in the Ganymede Prime system.';
                    return `<p>${text1}</p>`;
                },
                performAction: function (p: PlayerState) {
                    p.currentLocationId = 'excelsior';
                }
            },
            {
                next: 'arriveEuropa',
                getText: function (playerState: PlayerState) {
                    const text1 = 'You leave Haliax Station, heading to <b>Europa Station</b> in the Echidna Prime system.';
                    return `<p>${text1}</p>`;
                },
                performAction: function (p: PlayerState) {
                    p.currentLocationId = 'europa';
                }
            },
            {
                next: 'arriveDrone',
                getText: function (playerState: PlayerState) {
                    const text1 = 'You leave Haliax Station, heading to <b>Drone Station</b> in the Eldrazi Minor system.';
                    return `<p>${text1}</p>`;
                },
                performAction: function (p: PlayerState) {
                    p.currentLocationId = 'drone';
                }
            }
        ]
    },
    {
        id: 'arriveEuropa',
        title: 'Arriving in Europa Station',
        getText: function (playerState: PlayerState) {
            const text1 = 'This station has no planet nearby, but it has made the most of it\'s human resources. After a windfall investment in medical technology from a bank tycoon who fell in love with a stationer, the station became one of the best pharmaceutical producers on this trade route.';
            return `<p>${text1}</p>`;
        },
        choices: [
            {
                next: 'marketEuropa',
                getText: function (playerState: PlayerState) {
                    const text1 = 'Go make a killing by selling medical goods! Or at least check the markets with an eye towards the future.';
                    return `<p>${text1}</p>`;
                },
            }
        ]
    },
    {
        id: 'marketEuropa',
        title: 'Europa: To market, to market...',
        getText: function(playerState: PlayerState) {
            const text1 = 'You scroll through the market listings, looking at what is best to buy and sell here.';
            const text2 = 'The listings are kept in the "Map" section of your display.';
            return `<p>${text1}</p><p>${text2}</p>`;
        },
        createChoices: function(playerState: PlayerState) {
            const station = stations.find(station => station.id === 'europa');
            if (this.choices.findIndex((c) => c.getText(playerState).includes('coins per unit.')) <= -1) {
                this.choices = [
                    ...makePurchaseChoices(
                        'marketEuropa',
                        {
                            food: station.items.food.cost - 1,
                            medicine: station.items.medicine.cost - 1,
                            luxury: station.items.luxury.cost - 1,
                            shipSupplies: 5
                        },
                        {
                            food: station.items.food.cost,
                            medicine: station.items.medicine.cost,
                            luxury: station.items.luxury.cost,
                            shipSupplies: 5
                        },
                        makeSellChoice, makeBuyChoice, playerState, hasEnoughMoney, getItemTitle
                    ),
                    ...this.choices
                ];
            }
        },
        choices: [
            {
                next: 'arriveHaliax',
                getText: function (playerState: PlayerState) {
                    const text1 = 'You leave Europa Station, heading to Haliax Station in the Echidna Prime system.';
                    return `<p>${text1}</p>`;
                },
                performAction: function (p: PlayerState) {
                    p.currentLocationId = 'haliax';
                }
            },
            {
                next: 'arriveDrone',
                getText: function (playerState: PlayerState) {
                    const text1 = 'You leave Europa Station, heading to Drone Station in the Eldrazi Minor system.';
                    return `<p>${text1}</p>`;
                },
                performAction: function (p: PlayerState) {
                    p.currentLocationId = 'drone';
                }
            }
        ]

    },
    {
        id: 'arriveDrone',
        title: 'Arriving in Drone Station',
        getText: function (playerState: PlayerState) {
            const text1 = 'The neighboring planet looms over the station, casting a gloom across every resident\'s face. Not literally, the planet is far enough away from the station that it is easy to ignore out the windows. But just knowing that the monsters of Eldrazi are in the same star system brings everyone\'s spirits down.';
            return `<p>${text1}</p>`;
        },
        choices: [
            {
                next: 'marketDrone',
                getText: function (playerState: PlayerState) {
                    const text1 = 'Go buy and sell goods.';
                    return `<p>${text1}</p>`;
                },
            }
        ]
    },
    {
        id: 'marketDrone',
        title: 'Drone: To market, to market...',
        getText: function(playerState: PlayerState){
            const text1 = 'You scroll through the market listings, looking at what is best to buy and sell here.';
            const text2 = 'The listings are kept in the "Map" section of your display.';
            return `<p>${text1}</p><p>${text2}</p>`;
        },
        createChoices: function(playerState: PlayerState) {
            const station = stations.find(station => station.id === 'drone');
            if (this.choices.findIndex((c) => c.getText(playerState).includes('coins per unit.')) <= -1) {
                this.choices = [
                    ...makePurchaseChoices(
                        'marketDrone',
                        {
                            food: station.items.food.cost - 1,
                            medicine: station.items.medicine.cost - 1,
                            luxury: station.items.luxury.cost - 1,
                            shipSupplies: 5
                        },
                        {
                            food: station.items.food.cost,
                            medicine: station.items.medicine.cost,
                            luxury: station.items.luxury.cost,
                            shipSupplies: 5
                        },
                        makeSellChoice, makeBuyChoice, playerState, hasEnoughMoney, getItemTitle
                    ),
                    ...this.choices
                ];
            }
        },
        choices: [
            {
                next: 'arriveHaliax',
                getText: function (playerState: PlayerState) {
                    const text1 = 'You leave Drone Station, heading to Haliax Station in the Echidna Prime system.';
                    return `<p>${text1}</p>`;
                },
                performAction: function (p: PlayerState) {
                    p.currentLocationId = 'haliax';
                }
            },
            {
                next: 'arriveEuropa',
                getText: function (playerState: PlayerState) {
                    const text1 = 'You leave Drone Station, heading to Europa Station in the Eldrazi Minor system.';
                    return `<p>${text1}</p>`;
                },
                performAction: function (p: PlayerState) {
                    p.currentLocationId = 'europa';
                }
            }
        ]
    },
];
