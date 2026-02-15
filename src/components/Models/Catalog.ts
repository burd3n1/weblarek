import {IProduct, IProductResponse} from "../../types";
import { IEvents } from '../base/Events.ts'

export class Catalog {
    private items: IProduct[] = [];
    private _preview: IProduct | null = null;
    private events: IEvents;

    constructor(events: IEvents){
        this.events = events
    }

    updateItemList(response: IProductResponse): void {
        this.items = [...response.items];
        this.events.emit('catalog:change', this.items);
    }


    getItems(): IProduct[] {
        return this.items;
    }

    getItemid(id: string) : IProduct | null {
        return this.items.find(item => item.id === id) || null;
    }

    setPreview(product:  IProduct | null) {
        this._preview = product;
    }

    setSelectedItem(item: IProduct): void {
        this._preview = item
        this.events.emit<IProduct>('catalog:item-selected', item)
    }

    getPreview(): IProduct | null {
        return this._preview;
    }

    setItems(items: IProduct[]) {
        this.items = items;
    }
}