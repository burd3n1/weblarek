import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";
import { Component } from "../base/Component";

interface IBasketData {
    items: HTMLElement[],
    total: number
}

export class Basket extends Component<IBasketData> {
    protected basketListElement: HTMLElement
    protected basketPriceElement: HTMLElement
    protected basketTitleElement: HTMLElement
    protected basketButtonOrderElement: HTMLButtonElement

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container)

        this.basketButtonOrderElement = ensureElement<HTMLButtonElement>(
            '.basket__button',
            this.container
        );
        this.basketTitleElement = ensureElement<HTMLElement>(
            '.modal__title',
            this.container
        );
        this.basketPriceElement = ensureElement<HTMLElement>(
            '.basket__price',
            this.container
        );
        this.basketListElement = ensureElement<HTMLElement>(
            '.basket__list',
            this.container
        );
        this.items = []
        this.basketButtonOrderElement.addEventListener('click', () => {
            this.events.emit('basket:order')
        });
    }

    set items(value: HTMLElement[]) {
        if (!value || value.length === 0) {
            this.basketListElement.replaceChildren(...value);
            this.basketButtonOrderElement.disabled = true;
        } else {
            this.basketListElement.replaceChildren(...value)
            this.basketButtonOrderElement.disabled = false
        }
    }

    set total(value: number) {
        this.basketPriceElement.textContent = `${value} синапсов`
    }
}