import { IProduct } from "../../types";

export class Catalog {
    private items: IProduct[] = [];
    private _preview: IProduct | null = null;

    getItems(): IProduct[] {
        return this.items;
    }

    getItemid(id: string) : IProduct | null {
        return this.items.find(item => item.id === id) || null;
    }

    setPreview(product:  IProduct | null) {
        this._preview = product;
    }

    getPreview(): IProduct | null {
        return this._preview;
    }

    setItems(items: IProduct[]) {
        this.items = items;
    }
}