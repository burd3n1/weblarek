import { IProduct } from '../../types';

export class basket {
    private _items: IProduct[] = [];

    add(product: IProduct) {
        this._items.push(product);
    }

    remove(product: IProduct) {
        this._items = this._items.filter(item => item !== product);
    }

    // clear() {
    //     this._items = [];
    // }

    getTotal(): number {
        let total = 0;
        for (const item of this._items) {
            if (item.price !== null) {
                total += item.price;
            }
        }
        return total;
    }

    getItems(): IProduct[] {
        return [...this._items];
    }

    getCount(): number {
        return this._items.length;
    }

    hasProduct(id: string): boolean {
        return this._items.some((item) => item.id === id);
    }
}