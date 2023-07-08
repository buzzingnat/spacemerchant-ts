export const map: MapLocation[] = [
    { id: 'excelsior',
        x: 60, y: 60, radius: 15,
        title: 'Beta Thymine, Excelsior Station',
        connects: ['haliax'],
        edges: [{haliax: 1}],
        description: 'A tiny backwater, avoid here if possible. Hard to reach, exciting to leave.',
        items: {
            food: {quantity: 15, cost: 10},
            medicine: {quantity: 24, cost: 5},
            luxury: {quantity: 6, cost: 25}
        }
    },
    {id: 'haliax',
    x: 160, y: 50, radius: 15,
        title: 'Ganymede Prime, Haliax Station',
        connects: ['excelsior','europa', 'drone'],
        edges: [{excelsior: 1}, {europa: 1}, {drone: 1}],
        description: 'A place, things happen here.',
        items: {
            food: {quantity: 5, cost: 25},
            medicine: {quantity: 14, cost: 10},
            luxury: {quantity: 22, cost: 5}
        }
    },
    {id: 'europa',
    x: 40, y: 130, radius: 15,
        title: 'Echidna 4317, Europa Station',
        connects: ['haliax','drone'],
        edges: [{haliax: 1}, {drone: 1}],
        description: 'Beautiful, elegant, expensive.',
        items: {
            food: {quantity: 23, cost: 8},
            medicine: {quantity: 9, cost: 25},
            luxury: {quantity: 21, cost: 5}
        }
    },
    {id: 'drone',
    x: 180, y: 180, radius: 15,
        title: 'Eldrazi Minor, Drone Station',
        connects: ['europa', 'haliax', 'tripoint'],
        edges: [{europa: 1}, {haliax: 1}, {tripoint: 1}],
        description: 'Scary monsters dwell on this station\'s neighboring planet.',
        items: {
            food: {quantity: 11, cost: 15},
            medicine: {quantity: 7, cost: 18},
            luxury: {quantity: 10, cost: 15}
        }
    },
    {id: 'cyteen',
    x: 30, y: 210, radius: 15,
        title: 'Cyteen, Cyteen Station',
        connects: ['drone', 'downbelow'],
        edges: [{drone: 1}, {downbelow: 1}],
        description: 'A barely habitable planet with a wealth of biotech and a gorgeous station.',
        items: {
            food: {quantity: 5, cost: 25},
            medicine: {quantity: 30, cost: 5},
            luxury: {quantity: 15, cost: 10}
        }
    },
    {id: 'downbelow',
    x: 60, y: 310, radius: 15,
        title: 'Betelgeuse, Downbelow Station',
        connects: ['cyteen', 'tripoint'],
        edges: [{cyteen: 1}, {tripoint: 1}],
        description: 'Aliens live on the nearby planet. The station is mostly human though.',
        items: {
            food: {quantity: 35, cost: 5},
            medicine: {quantity: 5, cost: 35},
            luxury: {quantity: 10, cost: 20}
        }
    },
    {id: 'tripoint',
    x: 120, y: 250, radius: 15,
        title: 'Deep Space, Tripoint Station',
        connects: ['downbelow', 'mazian', 'drone'],
        edges: [{downbelow: 1}, {mazian: 1}, {drone: 1}],
        description: 'A dying white dwarf provides enough energy for a basic station, but not much else.',
        items: {
            food: {quantity: 5, cost: 25},
            medicine: {quantity: 5, cost: 25},
            luxury: {quantity: 5, cost: 25}
        }
    },
    {id: 'mazian',
    x: 170, y: 330, radius: 15,
        title: 'Alpha Centauri, Mazian Station',
        connects: ['tripoint', 'earth'],
        edges: [{tripoint: 1}, {earth: 1}],
        description: 'Beware: Pirates.',
        items: {
            food: {quantity: 5, cost: 35},
            medicine: {quantity: 5, cost: 35},
            luxury: {quantity: 5, cost: 35}
        }
    },
    {id: 'earth',
    x: 60, y: 380, radius: 15,
        title: 'Sol System, Earth Station',
        connects: ['mazian'],
        edges: [{mazian: 1}],
        description: 'Cradle of humanity. Very rich.',
        items: {
            food: {quantity: 35, cost: 5},
            medicine: {quantity: 35, cost: 5},
            luxury: {quantity: 35, cost: 5}
        }
    }
]
