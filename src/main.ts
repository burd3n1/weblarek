import './scss/styles.scss';

import { Basket } from "./components/Models/Basket.ts";
import { Buyer } from "./components/Models/Buyer.ts";
import { Catalog } from "./components/Models/Catalog.ts";
import { apiProducts } from "./utils/data.ts";
import { Apilarek } from "./components/Models/Apilarek.ts";
import { Api } from "./components/base/Api.ts";


const basket = new Basket();
const buyer = new Buyer();
const catalog = new Catalog();
catalog.setItems(apiProducts.items);
console.log('Массив товаров из каталога:', catalog.getItems());
const firstProductId= (apiProducts.items[0].id);
const foundProduct = catalog.getItemid(firstProductId);
console.log(`🔍 Найден товар по ID "${firstProductId}":`, foundProduct);

const selectedProduct = foundProduct;
console.log(' Выбранный продукт (selectedProduct):', selectedProduct);

const notFoundProduct = catalog.getItemid('non-existent-id');
console.log(' Поиск несуществующего ID:', notFoundProduct);

catalog.setPreview(foundProduct);
const preview = catalog.getPreview();
console.log('текущий просмотр:', preview?.title || 'нет');


const [item1, item2] = apiProducts.items;
basket.add(item1);
basket.add(item2);
console.log('Товары в корзине:', basket.getItems());
console.log('Количество товаров:', basket.getCount());
console.log('Общая сумма:', basket.getTotal());
console.log('Есть ли товар с id', item1.id, '?', basket.hasProduct(item1.id));
basket.remove(item1);
console.log('После удаления одного товара:', basket.getItems());
basket.clear();
console.log('После очистки:', basket.getItems());

buyer.set({
    payment: 'cash',
    email: 'ishak@gmail.com',
    phone: '+799943245',
    address: 'ул Пушкина д Колотушкина'
});
console.log('данные о покупателе', buyer.get());
const errorBuyer = buyer.validate();
console.log('должен быть пустой обьект',errorBuyer);

buyer.clear();
console.log(buyer.get());
console.log(buyer.validate())


const api = new Api(import.meta.env.VITE_API_ORIGIN);

const apiClient = new Apilarek(api);

const catalog2 = new Catalog();

apiClient.getProducts()
    .then(response => {
        catalog2.setItems(response.items);
        console.log('✅ Каталог успешно загружен с сервера:', catalog2.getItems());
    })
    .catch(error => {
        console.error('❌ Ошибка при загрузке каталога:', error);
    });
