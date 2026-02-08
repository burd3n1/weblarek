import { Component } from "../../base/Component"
import { ensureElement } from "../../../utils/utils"
import { IEvents } from "../../base/Events"

export abstract class Form extends Component<HTMLElement> {
    protected formSubmitButtonElement: HTMLButtonElement
    protected formErrorsElement: HTMLElement

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container)
        this.formSubmitButtonElement = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container)
        this.formErrorsElement = ensureElement<HTMLElement>('.form__errors', this.container)
        this.container.addEventListener('submit', (e) => {
            e.preventDefault()
            this.onSubmit()
        })
    }

    setErrors(message: string): void {
        this.formErrorsElement.textContent = message
        this.formErrorsElement.classList.toggle('form__errors-active', Boolean(message))
    }

    setSubmitEnabled(enabled: boolean): void {
        this.formSubmitButtonElement.disabled = !enabled
    }

    protected abstract onSubmit(): void
}