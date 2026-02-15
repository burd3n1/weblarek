import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import {ICardAction, ICardImage, ICardPreview} from "../../../types";
import { categoryMap, CDN_URL } from "../../../utils/constants";

export class CardPreview extends Card<ICardPreview> {
    private descriptionEl: HTMLElement;
    private buttonEl: HTMLButtonElement;
    protected categoryEl: HTMLElement;
    protected imageEl: HTMLImageElement;

    constructor(container: HTMLElement, actions?: ICardAction) {
        super(container);

        this.descriptionEl = ensureElement<HTMLElement>('.card__text', this.container);
        this.buttonEl = ensureElement<HTMLButtonElement>('.card__button', this.container);
        this.categoryEl = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageEl = ensureElement<HTMLImageElement>('.card__image', this.container)

        if (actions?.onClick) {
            this.buttonEl.addEventListener('click', actions.onClick);
        }
    }


    disableButton() {
        this.buttonEl.setAttribute('disabled', 'disabled');
    }

    set description(value: string) {
        this.descriptionEl.textContent = value;
    }

    set buttonText(value: string) {
        this.buttonEl.textContent = value;
    }

    set category(value: keyof typeof categoryMap) {
        //Не стала здесь править, тк ошибка в темплейтах, там не должно быть предустановленных классов конкретных категорий
        this.categoryEl.classList.add(categoryMap[value]);
        this.categoryEl.textContent = value;
    }

    set image(value: ICardImage) {
        this.setImage(this.imageEl, CDN_URL + value.src, value.alt);
    }

    setButtonText(text: string): this {
        this.buttonText = text;
        return this;
    }

    setButtonDisabled(disabled: boolean): this {
        if (disabled) {
            this.buttonEl.setAttribute('disabled', 'disabled');
        } else {
            this.buttonEl.removeAttribute('disabled');
        }
        return this;
    }
}