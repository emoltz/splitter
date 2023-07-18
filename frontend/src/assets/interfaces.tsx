export interface Bill {
    id: number;
    title: string;
    date: string;
    total: number;
    items: Item[];
    fees: Fee[];
}

export interface Item {
    id: number;
    description: string;
    price: number;
    quantity: number;
    person: Person;
}

interface Person {
    id: number;
    name: string;
}

export interface ModalBindings {
    visible: boolean;
    open: () => void;
    close: () => void;
}

export interface Fee {
    description: string;
    price: number;
}