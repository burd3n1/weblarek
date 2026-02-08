import { IProduct } from '../../types';
import { IEvents } from '../base/Events.ts'

export class BasketC {
    private items: IProduct[] = [];
    private events: IEvents

    constructor(events: IEvents){
        this.events = events
    }

    add(product: IProduct) {
        this.items.push(product);
        this.events.emit<IProduct[]>('cart:change', this.items.slice())


    }

    remove(product: IProduct) {
        this.items = this.items.filter(item => item !== product);
        this.events.emit<IProduct[]>('cart:change', this.items.slice())
    }

    clear() {
        this.items = [];
        this.events.emit<IProduct[]>('cart:change', this.items.slice())
    }

    getTotal(): number {
        return this.items.reduce((total, item) => {
            return item.price !== null ? total + item.price : total;
        }, 0);
    }

    getItems(): IProduct[] {
        return [...this.items];
    }

    getCount(): number {
        return this.items.length;
    }

    hasProduct(id: string): boolean {
        return this.items.some((item) => item.id === id);
    }
}