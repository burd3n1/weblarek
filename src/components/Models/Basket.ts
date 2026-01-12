import { IProduct } from '../../types';

export class Basket {
    private items: IProduct[] = [];

    add(product: IProduct) {
        this.items.push(product);
    }

    remove(product: IProduct) {
        this.items = this.items.filter(item => item !== product);
    }

    clear() {
        this.items = [];
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