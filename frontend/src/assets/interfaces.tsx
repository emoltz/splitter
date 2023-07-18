export interface bill {
    id: number;
    title: string;
    date: string;
    total: number;
    items: Item[];
}

export interface Item{
    id: number;
    description: string;
    price: number;
    quantity: number;
    person: person;
}

interface person{
    id: number;
    name: string;
}

export interface ModalBindings{
    visible: boolean;
    open: () => void;
    close: () => void;
}

export interface Fee {
    description: string;
    price: number;
}