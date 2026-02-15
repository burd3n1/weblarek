/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`; 

/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

/* Константа соответствий категорий товара модификаторам, используемым для отображения фона категории. */
export const categoryMap = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
};

export const settings = {
};

export const API_ENDPOINTS = {
  PRODUCTS: '/product/',
  ORDER: '/order/'
}

export const paymentMethods: { [key: string]: string } = {
  'card': 'online',
  'cash': 'offline'
}

export const Events  = {
  /*Model*/
  CATALOG_CHANGED: 'catalog:changed',
  CATALOG_CHANGED_SELECTED: 'catalog:changedSelected',
  BASKET_CHANGED: 'basket:changed',
  CUSTOMER_CHANGED: 'customer:changed',

  /*View*/
  BASKET_OPEN: 'basket:open',
  BASKET_ADD_ITEM: 'basket:addItem',
  BASKET_REMOVE_ITEM: 'basket:removeItem',

  CARD_OPEN: 'card:select',

  FORM_CHANGE: 'form:change',

  ORDER_CHECKOUT: 'order:checkout',
  ORDER_PROCEED: 'order:proceed',
  ORDER_PAY: 'order:pay',
  ORDER_SUCCESS: 'order:success'
}

export const CURRENCY = 'синапсов';

