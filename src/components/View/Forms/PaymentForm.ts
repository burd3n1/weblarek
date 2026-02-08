import { ensureElement } from "../../../utils/utils"
import { IEvents } from "../../base/Events"
import { Form } from "./Form";

export class PaymentForm extends Form {
    protected formAddressInputElement: HTMLInputElement
    protected formCardPayButtonElement: HTMLButtonElement
    protected formCashPayButtonElement: HTMLButtonElement

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events)

        this.formCardPayButtonElement = ensureElement<HTMLButtonElement>('[name="card"]', this.container)
        this.formCashPayButtonElement = ensureElement<HTMLButtonElement>('[name="cash"]', this.container)
        this.formAddressInputElement = ensureElement<HTMLInputElement>('[name="address"]', this.container)

        this.formCardPayButtonElement.addEventListener('click', () => {
            this.events.emit('payment:change', { payment: 'card' })
        })
        this.formCashPayButtonElement.addEventListener('click', () => {
            this.events.emit('payment:change', { payment: 'cash' })
        })
        this.formAddressInputElement.addEventListener('input', () => {
            this.events.emit('address:change', { address: this.formAddressInputElement.value })
        })
    }

    setAddress(value: string): void {
        this.formAddressInputElement.value = value
    }

    togglePaymentButtonStatus(status: 'card' | 'cash' | null): void {
        this.formCardPayButtonElement.classList.toggle('button_alt-active', status === 'card')
        this.formCashPayButtonElement.classList.toggle('button_alt-active', status === 'cash')
    }

    protected onSubmit(): void {
        this.events.emit('order:submit')
    }
}