import  * as types from './types';

export const map: types.Location[] = [
    { id: 'excelsior',
        x: 60, y: 60,
        'title': 'Beta Thymine, Excelsior Station',
        'connects': ['haliax'],
        'description': 'A tiny backwater, avoid here if possible. Hard to reach, exciting to leave.',
        items: {
            food: {quantity: 15, cost: 10},
            medicine: {quantity: 24, cost: 5},
            luxury: {quantity: 6, cost: 25}
        }
    },
    {id: 'haliax',
    x: 160, y: 50,
        'title': 'Ganymede Prime, Haliax Station',
        'connects': ['excelsior','europa', 'drone'],
        'description': 'A place, things happen here.',
        items: {
            food: {quantity: 5, cost: 25},
            medicine: {quantity: 14, cost: 10},
            luxury: {quantity: 22, cost: 5}
        }
    },
    {id: 'europa',
    x: 40, y: 130,
        'title': 'Echidna 4317, Europa Station',
        'connects': ['haliax','drone'],
        'description': 'Beautiful, elegant, expensive.',
        items: {
            food: {quantity: 23, cost: 8},
            medicine: {quantity: 9, cost: 25},
            luxury: {quantity: 21, cost: 5}
        }
    },
    {id: 'drone',
    x: 180, y: 180,
        'title': 'Eldrazi Minor, Drone Station',
        'connects': ['europa', 'haliax', 'tripoint'],
        'description': 'Scary monsters dwell on this station\'s neighboring planet.',
        items: {
            food: {quantity: 11, cost: 15},
            medicine: {quantity: 7, cost: 18},
            luxury: {quantity: 10, cost: 15}
        }
    },
    {id: 'cyteen',
    x: 30, y: 210,
        'title': 'Cyteen, Cyteen Station',
        'connects': ['drone', 'downbelow'],
        'description': 'A barely habitable planet with a wealth of biotech and a gorgeous station.',
        items: {
            food: {quantity: 5, cost: 25},
            medicine: {quantity: 30, cost: 5},
            luxury: {quantity: 15, cost: 10}
        }
    },
    {id: 'downbelow',
    x: 60, y: 310,
        'title': 'Betelgeuse, Downbelow Station',
        'connects': ['cyteen', 'tripoint'],
        'description': 'Aliens live on the nearby planet. The station is mostly human though.',
        items: {
            food: {quantity: 35, cost: 5},
            medicine: {quantity: 5, cost: 35},
            luxury: {quantity: 10, cost: 20}
        }
    },
    {id: 'tripoint',
    x: 120, y: 250,
        'title': 'Deep Space, Tripoint Station',
        'connects': ['downbelow', 'mazian', 'drone'],
        'description': 'A dying white dwarf provides enough energy for a basic station, but not much else.',
        items: {
            food: {quantity: 5, cost: 25},
            medicine: {quantity: 5, cost: 25},
            luxury: {quantity: 5, cost: 25}
        }
    },
    {id: 'mazian',
    x: 170, y: 330,
        'title': 'Alpha Centauri, Mazian Station',
        'connects': ['tripoint', 'earth'],
        'description': 'Beware: Pirates.',
        items: {
            food: {quantity: 5, cost: 35},
            medicine: {quantity: 5, cost: 35},
            luxury: {quantity: 5, cost: 35}
        }
    },
    {id: 'earth',
    x: 60, y: 380,
        'title': 'Sol System, Earth Station',
        'connects': ['mazian'],
        'description': 'Cradle of humanity. Very rich.',
        items: {
            food: {quantity: 35, cost: 5},
            medicine: {quantity: 35, cost: 5},
            luxury: {quantity: 35, cost: 5}
        }
    }
]
