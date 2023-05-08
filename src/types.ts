export interface Person {
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
    items: {name: string; quantity: number;}[];
}

export interface PlayerState {
    coins: number;
    cargo: {
        holdMax: number;
        shipSupplies: number;
        tradeLuxury: number;
        tradeMedicine: number;
        tradeFood: number;
    },
    ship: string;
    passengers: Passenger[];
    crew: Employee[];
    costChoice: number;
    updateUI: boolean;
}

export interface StoryEvent {
    id: string;
    title: string;
    getText?: (playerState: PlayerState) => string;
    text?: string[];
    choices: StoryChoice[];
    cost?: number;
}
export interface StoryChoice {
    next: string;
    cost?: number;
    getText?: (playerState: PlayerState) => string;
    text?: string[];
    isActionValid?: (playerState: PlayerState) => boolean;
    performAction?: (playerState: PlayerState) => void;
}
