import { ensureElement } from "../../../utils/utils"
import { IEvents } from "../../base/Events"
import { Form } from "./Form";

export class ContactForm extends Form {
    protected formEmailInputElement: HTMLInputElement
    protected formTelephoneInputElement: HTMLInputElement

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events)
        this.formEmailInputElement = ensureElement<HTMLInputElement>('input[name="email"]', this.container)
        this.formTelephoneInputElement = ensureElement<HTMLInputElement>('input[name="phone"]', this.container)

        this.formEmailInputElement.addEventListener('input', () => {
            this.events.emit('contacts:email', { email: this.formEmailInputElement.value })
        })

        this.formTelephoneInputElement.addEventListener('input', () => {
            this.events.emit('contacts:phone', { phone: this.formTelephoneInputElement.value })
        })

        this.formSubmitButtonElement.addEventListener('click', (event) => {
            event.preventDefault()
            this.events.emit('contacts:submit')
        })
    }

    setEmail(value: string): void {
        this.formEmailInputElement.value = value
    }

    setPhone(value: string): void {
        this.formTelephoneInputElement.value = value
    }

    protected onSubmit(): void {
        this.events.emit('contacts:submit')
    }
}