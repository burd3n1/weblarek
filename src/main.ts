import './scss/styles.scss';

import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import {  IOrder } from './types'

import { Catalog } from './components/Models/Catalog';
import { BasketC } from "./components/Models/BasketC.ts";
import { Buyer } from './components/Models/Buyer.ts';
import { ApiShop } from './components/Models/ApiShop.ts';

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
import { ContactForm } from "./components/View/Forms/ContactForm";

const events = new EventEmitter()
const api = new Api(API_URL)
const communication = new ApiShop(api)
const catalog = new Catalog(events)
const basketC = new BasketC(events)
const buyer = new Buyer(events)

const galleryElement = ensureElement<HTMLElement>('.gallery')
const modalElement = ensureElement<HTMLElement>(".modal")
const headerElement = ensureElement<HTMLElement>('.header')
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket")
const orderFormTemplate = ensureElement<HTMLTemplateElement>("#order")
const contactsFormTemplate = ensureElement<HTMLTemplateElement>("#contacts")
const successTemplate = ensureElement<HTMLTemplateElement>("#success")

const gallery = new Gallery(galleryElement)
const modal = new Modal(modalElement, events)
const header = new Header(events, headerElement)
const basket = new Basket(cloneTemplate(basketTemplate), events)
const orderForm = new PaymentForm(cloneTemplate(orderFormTemplate), events)
const contactsForm = new ContactForm(cloneTemplate(contactsFormTemplate), events)
const success = new Success(cloneTemplate(successTemplate), events)


// Получение товаров
communication.getProducts().then(item=> {
    catalog.updateItemList(item)
    console.log(`Массив товаров из каталога:`,catalog.getItems())
}).catch((error) => console.error("Ошибка API:", error))

// Отабражение товаров в галерее
events.on('catalog:change', () => {
    const products = catalog.getItems();
    const cardElements = products.map((product) => {
        const card = new CardCatalog(events, () => {
            events.emit('product:select', product)
        })
        return card.render(product)
    })

    gallery.render({ catalogElement: cardElements })
})

// модальное окно карты
events.on('product:select', (product: IProduct) => {
    catalog.setSelectedItem(product)
})

// добавление в карзину
events.on('catalog:item-selected', (product: IProduct) => {
    const preview = new CardPreview(events, () => {
        if (basketC.hasProduct(product.id)) {
            basketC.remove(product)
        } else {
            basketC.add(product)
        }
        modal.close()
    })

    const element = preview.render(product)

    if (product.price === null) {
        preview.setButtonText('Недоступно')
        preview.setButtonDisabled(true)
    } else {
        preview.setButtonDisabled(false)
        if (basketC.hasProduct(product.id)) {
            preview.setButtonText('Удалить из корзины')
        } else {
            preview.setButtonText('Купить')
        }
    }

    modal.open(element)
})

// Открытие и управление корзиной
events.on('basket:open', () => {
    modal.open(basket.render())
})

events.on('cart:change', () => {
    header.counter = basketC.getCount()
    const items = basketC.getItems().map((product, index) => {
        return new CardBasket(events, () => {
            basketC.remove(product)
        }).render({ ...product, index })
    })

    basket.render({
        items,
        total: basketC.getTotal()
    })
})

// оформление заказа
events.on('basket:order', () => {
    const errors = buyer.validate()
    const data = buyer.get()

    orderForm.setErrors([errors.payment, errors.address].filter(Boolean).join('. '))
    orderForm.setSubmitEnabled(!errors.payment && !errors.address)
    orderForm.togglePaymentButtonStatus(data.payment)
    orderForm.setAddress(data.address)

    modal.open(orderForm.render())
})

events.on('payment:change', (data: { _payment: 'card' | 'cash' }) => {
    buyer.setPhone(data._payment)
})

events.on('address:change', (data: { address: string }) => {
    buyer.setAddress(data.address)
})

events.on('order:submit', () => {
    const errors = buyer.validate()
    const data = buyer.get()

    contactsForm.setErrors([errors.email, errors.phone].filter(Boolean).join('. '))
    contactsForm.setSubmitEnabled(!errors.email && !errors.phone)
    contactsForm.setEmail(data.email)
    contactsForm.setPhone(data.phone)

    modal.open(contactsForm.render())
})

events.on('contacts:email', (data: { email: string }) => {
    buyer.setEmail(data.email)
})

events.on('contacts:phone', (data: { phone: string }) => {
    buyer.setPhone(data.phone)
})

events.on('buyer:changed', () => {
    const errors = buyer.validate()
    const data = buyer.get()

    orderForm.setErrors([errors.payment, errors.address].filter(Boolean).join('. '))
    orderForm.setSubmitEnabled(!errors.payment && !errors.address)
    orderForm.togglePaymentButtonStatus(data.payment)
    orderForm.setAddress(data.address)

    contactsForm.setErrors([errors.email, errors.phone].filter(Boolean).join('. '))
    contactsForm.setSubmitEnabled(!errors.email && !errors.phone)
    contactsForm.setEmail(data.email)
    contactsForm.setPhone(data.phone)
})

events.on('contacts:submit', () => {
    const orderData: IOrder = { ...buyer.get(), items: basketC.getItems().map(product => product.id), total: basketC.getTotal(),}

    communication.sendOrder(orderData)
        .then(result => {
            if (!result) return

            basketC.clear()
            buyer.clear()

            success.total = result.total
            modal.open(success.render())
        })
        .catch(error => {
            console.error('Ошибка оформления заказа:', error)
        })
})

events.on('success:close', () => {
    modal.close()
})





// import './scss/styles.scss';
//
// import { Basket } from "./components/Models/BasketC.ts";
// import { Buyer } from "./components/Models/Buyer.ts";
// import { Catalog } from "./components/Models/Catalog.ts";
// import { apiProducts } from "./utils/data.ts";
// import { ApiShop } from "./components/Models/ApiShop.ts";
// import { Api } from "./components/base/Api.ts";
// import { API_URL } from "./utils/constants.ts";
//
//
// const basket = new Basket();
// const buyer = new Buyer();
// const catalog = new Catalog();
// catalog.setItems(apiProducts.items);
// console.log('Массив товаров из каталога:', catalog.getItems());
// const firstProductId= (apiProducts.items[0].id);
// const foundProduct = catalog.getItemid(firstProductId);
// console.log(`🔍 Найден товар по ID "${firstProductId}":`, foundProduct);
//
// const selectedProduct = foundProduct;
// console.log(' Выбранный продукт (selectedProduct):', selectedProduct);
//
// const notFoundProduct = catalog.getItemid('non-existent-id');
// console.log(' Поиск несуществующего ID:', notFoundProduct);
//
// catalog.setPreview(foundProduct);
// const preview = catalog.getPreview();
// console.log('текущий просмотр:', preview?.title || 'нет');
//
//
// const [item1, item2] = apiProducts.items;
// basket.add(item1);
// basket.add(item2);
// console.log('Товары в корзине:', basket.getItems());
// console.log('Количество товаров:', basket.getCount());
// console.log('Общая сумма:', basket.getTotal());
// console.log('Есть ли товар с id', item1.id, '?', basket.hasProduct(item1.id));
// basket.remove(item1);
// console.log('После удаления одного товара:', basket.getItems());
// basket.clear();
// console.log('После очистки:', basket.getItems());
//
// buyer.set({
//     payment: 'cash',
//     email: 'ishak@gmail.com',
//     phone: '+799943245',
//     address: 'ул Пушкина д Колотушкина'
// });
// console.log('данные о покупателе', buyer.get());
// const errorBuyer = buyer.validate();
// console.log('должен быть пустой обьект',errorBuyer);
//
// buyer.clear();
// console.log(buyer.get());
// console.log(buyer.validate())
//
//
// const api = new Api(API_URL);
//
// const apiClient = new ApiShop(api);
//
// const catalog2 = new Catalog();
//
// apiClient.getProducts()
//     .then(response => {
//         catalog2.setItems(response.items);
//         console.log('✅ Каталог успешно загружен с сервера:', catalog2.getItems());
//     })
//     .catch(error => {
//         console.error('❌ Ошибка при загрузке каталога:', error);
//     });
