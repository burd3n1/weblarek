import {ensureElement} from "../../../utils/utils.ts";
import {IProduct} from "../../../types";
import {Card} from "./Card.ts";

export type TCardBasket = Pick<IProduct, 'title' | 'price'> & {index: number};
type CardAction = {
    onClick: () => void;
}

export class CardBasket extends Card<TCardBasket> {
    private deleteButtonEl: HTMLButtonElement;
    private indexEl: HTMLElement;

    constructor(container: HTMLElement, actions?: CardAction) {
        super(container);

        this.indexEl = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.deleteButtonEl = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container)

        if (actions?.onClick) {
            this.deleteButtonEl.addEventListener('click', actions.onClick);
        }
    }

    set index(value: number) {
        this.indexEl.textContent = value.toString();
    }
}