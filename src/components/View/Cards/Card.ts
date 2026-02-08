import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";
import { IProduct } from "../../../types";
import { cloneTemplate, ensureElement } from "../../../utils/utils";

export abstract class Card extends Component<IProduct> {
    protected price: HTMLElement;
    protected title: HTMLElement;

    constructor(protected events: IEvents, template: string) {
        super(cloneTemplate<HTMLElement>(template));
        this.price = ensureElement<HTMLElement>(".card__price", this.container);
        this.title = ensureElement<HTMLElement>(".card__title", this.container);
    }

    protected renderBase(product: IProduct): void {
        this.title.textContent = product.title;
        this.price.textContent = product.price ? `${product.price} синапсов` : "Бесценно";
    }

    abstract render(product: IProduct): HTMLElement;
}