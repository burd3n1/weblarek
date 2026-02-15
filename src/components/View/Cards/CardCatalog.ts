import { Card } from "./Card";
import {ICardImage, IProduct, ICardAction} from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { categoryMap, CDN_URL } from "../../../utils/constants";


export type TCardCatalog = Pick<IProduct, 'category'> & {image: ICardImage};

export class CardCatalog extends Card<TCardCatalog> {
    protected categoryEl: HTMLElement;
    protected imageEl: HTMLImageElement;

    constructor(container: HTMLElement, actions?: ICardAction) {
        super(container);

        this.categoryEl = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageEl = ensureElement<HTMLImageElement>('.card__image', this.container)

        if (actions?.onClick) {
            this.container.addEventListener('click', actions.onClick)
        }
    }

    set category(value: keyof typeof categoryMap) {
        this.categoryEl.classList.add(categoryMap[value]);
        this.categoryEl.textContent = value;
    }

    set image(value: { src: string; alt: string }) { // ← должно быть объектом!
        this.setImage(this.imageEl, CDN_URL + value.src, value.alt);
    }
}