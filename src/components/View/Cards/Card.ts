import {Component} from "../../base/Component.ts";
import {ensureElement} from "../../../utils/utils.ts";
import {IProduct} from "../../../types";

type TCard = Pick<IProduct, 'title' | 'price'>;

export abstract class Card<T> extends Component<T & TCard> {
    protected titleEl: HTMLHeadingElement;
    protected priceEl: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.titleEl = ensureElement<HTMLHeadingElement>('.card__title', this.container);
        this.priceEl = ensureElement<HTMLElement>('.card__price', this.container);
    }


    set title(value: string) {
        this.titleEl.textContent = value;
    }

    set price(value: number) {
        this.priceEl.textContent = value ? `${value} синапсов` : 'Бесценно';
    }
}