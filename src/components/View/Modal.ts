import { Component } from "../base/Component.ts";
import { ensureElement } from "../../utils/utils.ts";
import { IEvents } from "../base/Events.ts";



export class Modal extends Component<HTMLElement> {
    protected modalContentElement:HTMLElement
    protected modalButtonElement:HTMLButtonElement

    constructor(container:HTMLElement, protected events:IEvents) {
        super(container);

        this.modalContentElement = ensureElement<HTMLElement>('.modal__content', this.container);
        this.modalButtonElement = ensureElement<HTMLButtonElement>('.modal__close', this.container);

        this.modalButtonElement.addEventListener('click', () => {
            this.close()
        });

        this.container.addEventListener('click', (event: MouseEvent) => {
            if (event.target === event.currentTarget) {
                this.close()
            }
        });
    }

    set content(value: HTMLElement){
        this.modalContentElement.replaceChildren(value)
    }

    open(content: HTMLElement) {
        this.container.classList.add('modal_active');
        this.modalContentElement.replaceChildren(content)
    }

    close() {
        this.container.classList.remove('modal_active')
        this.events.emit('modal:close')
    }
}