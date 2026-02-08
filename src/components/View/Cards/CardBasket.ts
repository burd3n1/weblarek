import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";

export class CardBasket extends Card {
    protected cardIndexElement: HTMLElement
    protected cardButtonRemoveElement: HTMLButtonElement

    constructor(protected events: IEvents, onRemoveClick: () => void) {
        super(events, "#card-basket");

        this.cardIndexElement = ensureElement<HTMLElement>(".basket__item-index", this.container);
        this.cardButtonRemoveElement = ensureElement<HTMLButtonElement>(".basket__item-delete", this.container);
        this.cardButtonRemoveElement.addEventListener("click", onRemoveClick);
    }

    render(product: IProduct & { index?: number }): HTMLElement {
        this.renderBase(product);
        this.cardIndexElement.textContent = String((product.index || 0) + 1);
        return this.container;
    }
}