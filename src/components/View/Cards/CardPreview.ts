import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";
import { IProduct } from "../../../types";
import { categoryMap, CDN_URL } from "../../../utils/constants";

export class CardPreview extends Card {
    protected category: HTMLElement;
    protected image: HTMLImageElement;
    protected description: HTMLElement;
    protected cardButtonElement: HTMLButtonElement;

    constructor(protected events: IEvents, onButtonClick: () => void) {
        super(events, "#card-preview");

        this.image = ensureElement<HTMLImageElement>(".card__image", this.container);
        this.category = ensureElement<HTMLElement>(".card__category", this.container);
        this.description = ensureElement<HTMLElement>(".card__text", this.container);
        this.cardButtonElement = ensureElement<HTMLButtonElement>(".card__button", this.container);

        this.cardButtonElement.addEventListener("click", onButtonClick);
    }

    render(product: IProduct): HTMLElement {
        this.renderBase(product);

        this.category.className = `card__category ${categoryMap[product.category as keyof typeof categoryMap]}`;
        this.category.textContent = product.category;
        this.setImage(this.image, `${CDN_URL}/${product.image}`, product.title);

        this.description.textContent = product.description;
        return this.container;
    }

    setButtonText(text: string): void {
        this.cardButtonElement.textContent = text;
    }

    setButtonDisabled(disabled: boolean): void {
        this.cardButtonElement.disabled = disabled;
    }
}