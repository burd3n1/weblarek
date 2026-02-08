import { Component } from "../base/Component"
import { IOrderResult } from "../../types";
import { IEvents } from "../base/Events"
import { ensureElement } from "../../utils/utils"

export class Success extends Component<IOrderResult> {
    protected orderTitleElement: HTMLElement
    protected orderButtonCloseElement: HTMLButtonElement
    protected orderDescription: HTMLElement

    constructor(container: HTMLElement, protected evt: IEvents) {
        super(container)
        this.orderDescription = ensureElement<HTMLElement>('.order-success__description', container)
        this.orderTitleElement = ensureElement<HTMLElement>('.order-success__title', container)
        this.orderButtonCloseElement = ensureElement<HTMLButtonElement>('.order-success__close', container)

        this.orderButtonCloseElement.addEventListener('click', () => {
            this.evt.emit('success:close')
        })
    }

    set total(value: number) {
        this.orderDescription.textContent = `Списано ${value} синапсов`
    }
}