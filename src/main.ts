import './scss/styles.scss';

import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import {ICardPreview, IOrder} from './types';

import { Catalog } from './components/Models/Catalog';
import { BasketC } from './components/Models/BasketC';
import { Buyer } from './components/Models/Buyer';
import { ApiShop } from './components/Models/ApiShop';

import { ensureElement, cloneTemplate } from './utils/utils';
import { API_URL } from './utils/constants';
import { IProduct } from './types';

import { Header } from './components/View/Header';
import { Gallery } from './components/View/Gallery';
import { Modal } from './components/View/Modal';
import { Basket } from './components/View/Basket';
import { Success } from './components/View/Success';

import { CardCatalog } from './components/View/Cards/CardCatalog';
import { CardPreview } from './components/View/Cards/CardPreview';
import { CardBasket } from './components/View/Cards/CardBasket';

import { PaymentForm } from './components/View/Forms/PaymentForm';
import { ContactForm } from './components/View/Forms/ContactForm';
import { TCardCatalog } from './components/View/Cards/CardCatalog';
import { TCardBasket } from './components/View/Cards/CardBasket';



const toCardCatalogData = (product: IProduct): TCardCatalog => ({
    category: product.category,
    image: { src: product.image, alt: product.title },
});

const toCardBasketData = (product: IProduct, index: number): TCardBasket => ({
    title: product.title,
    price: product.price,
    index,
});

const events = new EventEmitter();
const api = new Api(API_URL);
const communication = new ApiShop(api);
const catalog = new Catalog(events);
const basketC = new BasketC(events);
const buyer = new Buyer(events);


const galleryElement = ensureElement<HTMLElement>('.gallery');
const modalElement = ensureElement<HTMLElement>('.modal');
const headerElement = ensureElement<HTMLElement>('.header');


const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');


const gallery = new Gallery(galleryElement);
const modal = new Modal(modalElement, events);
const header = new Header(events, headerElement);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const orderForm = new PaymentForm(cloneTemplate(orderFormTemplate), events);
const contactsForm = new ContactForm(cloneTemplate(contactsFormTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events);


communication.getProducts().then((response) => {
    catalog.updateItemList(response);
}).catch((error) => console.error('Ошибка API:', error));


events.on('catalog:change', () => {
    const products = catalog.getItems();
    const cardElements = products.map((product) => {
        const container = cloneTemplate(cardCatalogTemplate);
        const card = new CardCatalog(container, {
            onClick: () => events.emit('product:select', product)
        });
        return card.render(toCardCatalogData(product));
    });
    gallery.render({ catalogElement: cardElements });
});

// === Выбор товара ===
events.on('product:select', (product: IProduct) => {
    catalog.setSelectedItem(product);
    events.emit('catalog:item-selected', product);
});


events.on('catalog:item-selected', (product: IProduct) => {
    const container = cloneTemplate(cardPreviewTemplate);
    const preview = new CardPreview(container, {
        onClick: () => {
            if (basketC.hasProduct(product.id)) {
                basketC.remove(product);
            } else {
                basketC.add(product);
            }
            modal.close();
        }
    });

    const previewData: ICardPreview = {
        ...product,
        image: { src: product.image, alt: product.title },
        buttonText: undefined,
    };


    preview.render(previewData);

    if (product.price === null) {
        preview.setButtonText('Недоступно').setButtonDisabled(true);
    } else {
        preview.setButtonDisabled(false);
        if (basketC.hasProduct(product.id)) {
            preview.setButtonText('Удалить из корзины');
        } else {
            preview.setButtonText('Купить');
        }
    }

    modal.open(preview.getContainer());
});


events.on('basket:open', () => {
    modal.open(basket.render());
});

events.on('cart:change', () => {
    header.counter = basketC.getCount();
    const items = basketC.getItems().map((product, index) => {
        const container = cloneTemplate(cardBasketTemplate);
        const card = new CardBasket(container, {
            onClick: () => basketC.remove(product)
        });
        return card.render(toCardBasketData(product, index));
    });

    basket.render({ items, total: basketC.getTotal() });
});


events.on('basket:order', () => {
    const errors = buyer.validate();
    const data = buyer.get();

    orderForm.setErrors([errors.payment, errors.address].filter(Boolean).join('. '));
    orderForm.setSubmitEnabled(!errors.payment && !errors.address);
    orderForm.togglePaymentButtonStatus(data.payment);
    orderForm.setAddress(data.address);

    modal.open(orderForm.render());
});

events.on('payment:change', (data: { _payment: 'card' | 'cash' }) => {
    buyer.setPayment(data._payment);
});

events.on('address:change', (data: { address: string }) => {
    buyer.setAddress(data.address);
});

events.on('order:submit', () => {
    const errors = buyer.validate();
    const data = buyer.get();

    contactsForm.setErrors([errors.email, errors.phone].filter(Boolean).join('. '));
    contactsForm.setSubmitEnabled(!errors.email && !errors.phone);
    contactsForm.setEmail(data.email);
    contactsForm.setPhone(data.phone);

    modal.open(contactsForm.render());
});

events.on('contacts:email', (data: { email: string }) => {
    buyer.setEmail(data.email);
});

events.on('contacts:phone', (data: { phone: string }) => {
    buyer.setPhone(data.phone);
});

events.on('buyer:changed', () => {
    const errors = buyer.validate();
    const data = buyer.get();

    orderForm.setErrors([errors.payment, errors.address].filter(Boolean).join('. '));
    orderForm.setSubmitEnabled(!errors.payment && !errors.address);
    orderForm.togglePaymentButtonStatus(data.payment);
    orderForm.setAddress(data.address);

    contactsForm.setErrors([errors.email, errors.phone].filter(Boolean).join('. '));
    contactsForm.setSubmitEnabled(!errors.email && !errors.phone);
    contactsForm.setEmail(data.email);
    contactsForm.setPhone(data.phone);
});

events.on('contacts:submit', () => {
    const orderData: IOrder = {
        ...buyer.get(),
        items: basketC.getItems().map((product) => product.id),
        total: basketC.getTotal(),
    };

    communication.sendOrder(orderData)
        .then((result) => {
            if (!result) return;

            basketC.clear();
            buyer.clear();

            success.total = result.total;
            modal.open(success.render());
        })
        .catch((error) => {
            console.error('Ошибка оформления заказа:', error);
        });
});

events.on('success:close', () => {
    modal.close();
});