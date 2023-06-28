interface Person {
    id: string;
    name: string;
    savings: number;
}
interface Passenger extends Person {
    origin: Location;
    destination: Location;
    passengerFee: number;
}
interface Employee extends Person {
    salary: number;
    jobTitle: 'navigator' | 'cargoMaster' | 'doctor' | 'ai';
    bonus: {
        holdMax: number;
        speed: number;
        health: number;
    }
}

interface MapLocation {
    id: string;
    title: string;
    description: string;
    x: number;
    y: number;
    connects: string[];
    items: {
        food: {quantity: number; cost: number;},
        medicine: {quantity: number; cost: number;},
        luxury: {quantity: number; cost: number;}
    }
}

type Cargo = 'luxury' | 'food' | 'medicine' | 'shipSupplies';

interface PlayerState {
    coins: number;
    cargo: Cargo[],
    shipStats: {
        holdMax: number;
        speed: number;
        health: number;
    },
    miniEvent: {
        mainCharacter?: Employee | Passenger;
        secondCharacter?: Employee | Passenger;
        thirdCharacter?: Employee | Passenger;
        locationList?: MapLocation['id'][];
        cost?: number;
        reward?: number;
    },
    ship: string;
    passengers: Passenger[];
    crew: Employee[];
    costChoice: number;
    updateUI: boolean;
    currentLocationId: MapLocation['id'];
}

interface StoryEvent {
    id: string;
    title: string;
    getText?: (playerState: PlayerState) => string;
    text?: string[];
    createChoices?: (playerState: PlayerState) => StoryChoice[];
    choices: StoryChoice[];
    cost?: number;
}
interface StoryChoice {
    next: string;
    cost?: number;
    getText?: (playerState: PlayerState, itemType?: Cargo) => string;
    text?: string[];
    isActionValid?: (playerState: PlayerState, itemType?: Cargo) => boolean;
    performAction?: (playerState: PlayerState, itemType?: Cargo) => void;
    //getElement(platerState: PlayerState, choice: StoryChoice)
}
