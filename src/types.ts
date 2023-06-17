export interface Person {
    id: string;
    name: string;
    savings: number;
}
export interface Passenger extends Person {
    origin: Location;
    destination: Location;
    passengerFee: number;
}
export interface Employee extends Person {
    salary: number;
    jobTitle: 'navigator' | 'cargoMaster' | 'doctor' | 'ai';
    bonus: {
        holdMax: number;
        speed: number;
        health: number;
    }
}

export interface Location {
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

export type Cargo = 'luxury' | 'food' | 'medicine' | 'shipSupplies';

export interface PlayerState {
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
        locationList?: Location['id'][];
        cost?: number;
        reward?: number;
    },
    ship: string;
    passengers: Passenger[];
    crew: Employee[];
    costChoice: number;
    updateUI: boolean;
    currentLocationId: Location['id'];
}

export interface StoryEvent {
    id: string;
    title: string;
    getText?: (playerState: PlayerState) => string;
    text?: string[];
    createChoices?: (playerState: PlayerState) => StoryChoice[];
    choices: StoryChoice[];
    cost?: number;
}
export interface StoryChoice {
    next: string;
    cost?: number;
    getText?: (playerState: PlayerState, itemType?: Cargo) => string;
    text?: string[];
    isActionValid?: (playerState: PlayerState, itemType?: Cargo) => boolean;
    performAction?: (playerState: PlayerState, itemType?: Cargo) => void;
}
