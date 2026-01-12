import { IOrder, IApi , IProductResponse , IOrderResult, IProduct } from '../../types';

export class Apilarek {
    constructor(private readonly api: IApi) {}

    async getProducts(): Promise<IProduct[]>{
        const response: IProductResponse = await this.api.get('/product/');
        return response.items;
    }

    async sendOrder(orderData: IOrder): Promise<IOrderResult> {
        return await this.api.post('/order/', orderData);
    }
}