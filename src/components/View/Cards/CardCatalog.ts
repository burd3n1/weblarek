import { Card } from "./Card";
import { IProduct } from "../../../types";
import { IEvents } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";
import { categoryMap, CDN_URL } from "../../../utils/constants";

export class CardCatalog extends Card {
    protected category: HTMLElement;
    protected image: HTMLImageElement;

    constructor(protected events: IEvents, onClick: () => void) {
        super(events, "#card-catalog");

        this.category = ensureElement<HTMLElement>(".card__category", this.container);
        this.image = ensureElement<HTMLImageElement>(".card__image", this.container);

        this.container.addEventListener("click", onClick);
    }

    render(product: IProduct): HTMLElement {
        this.renderBase(product);

        this.category.className = `card__category ${categoryMap[product.category as keyof typeof categoryMap]}`;
        this.category.textContent = product.category;
        this.setImage(this.image, `${CDN_URL}/${product.image}`, product.title);

        return this.container;
    }
}