import {Component} from "../base/Component.ts";

interface IGallery {
    catalogElement: HTMLElement[]
}

export class Gallery extends Component<IGallery> {
    constructor (container: HTMLElement) {
        super(container);
    }

    set catalogElement (elements: HTMLElement[]) {
        this.container.replaceChildren(...elements);
    }
}