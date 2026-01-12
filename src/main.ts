import './scss/styles.scss';

import { Basket } from "./components/Models/Basket.ts";
import { Buyer } from "./components/Models/Buyer.ts";
import { Catalog } from "./components/Models/Catalog.ts";
import { apiProducts } from "./utils/data.ts";
import { Apilarek } from "./components/Models/Apilarek.ts";
import { Api } from "./components/base/Api.ts";


const Basket1 = new Basket();
const Buyer1 = new Buyer();

const Catalog1 = new Catalog();
console.log('Массив товаров из каталога:', Catalog1.getItems());



const [item1, item2] = apiProducts.items;
Basket1.add(item1);
Basket1.add(item2);
console.log('Товары в корзине:', Basket1.getItems());
console.log('Количество товаров:', Basket1.getCount());
console.log('Общая сумма:', Basket1.getTotal());
console.log('Есть ли товар с id', item1.id, '?', Basket1.hasProduct(item1.id));
Basket1.remove(item1);
console.log('После удаления одного товара:', Basket1.getItems());
Basket1.clear();
console.log('После очистки:', Basket1.getItems());

Buyer1.set({
    payment: 'cash',
    email: 'ishak@gmail.com',
    phone: '+799943245',
    address: 'ул Пушкина д Колотушкина'
});
console.log('данные о покупателе', Buyer1.get());
const errorBuyer = Buyer1.validate();
console.log('должен быть пустой обьект',errorBuyer);

Buyer1.clear();
console.log(Buyer1.get());
console.log(Buyer1.validate())


const api = new Api('https://larek-api.nomoreparties.co/api/weblarek');

const apiClient = new Apilarek(api);

const Catalog2 = new Catalog();

apiClient.getProducts()
    .then(items => {
        Catalog2.setItems(items);
        console.log('✅ Каталог успешно загружен с сервера:', Catalog2.getItems());
    })
    .catch(error => {
        console.error('❌ Ошибка при загрузке каталога:', error);
    });
