import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { ICardImage, ICardPreview} from "../../../types";
import { categoryMap, CDN_URL } from "../../../utils/constants";
import { EventEmitter } from "../../base/Events.ts";

export class CardPreview extends Card<ICardPreview> {
    private descriptionEl: HTMLElement;
    private buttonEl: HTMLButtonElement;
    protected categoryEl: HTMLElement;
    protected imageEl: HTMLImageElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this.descriptionEl = ensureElement<HTMLElement>('.card__text', this.container);
        this.buttonEl = ensureElement<HTMLButtonElement>('.card__button', this.container);
        this.categoryEl = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageEl = ensureElement<HTMLImageElement>('.card__image', this.container)

        this.buttonEl.addEventListener('click', () => {
            this.events.emit('cardPreview:click');
        });
    }




    set description(value: string) {
        this.descriptionEl.textContent = value;
    }


    set buttonText(value: string) {
        this.buttonEl.textContent = value;
    }


    set category(value: keyof typeof categoryMap) {
        this.categoryEl.classList.add(categoryMap[value]);
        this.categoryEl.textContent = value;
    }


    set image(value: ICardImage) {
        this.setImage(this.imageEl, CDN_URL + value.src, value.alt);
    }


    set disabled(value: boolean) {
        if (value) {
            this.buttonEl.setAttribute('disabled', 'disabled');
        } else {
            this.buttonEl.removeAttribute('disabled');
        }
    }
}