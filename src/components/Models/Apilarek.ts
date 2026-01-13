import { IOrder, IApi , IProductResponse , IOrderResult } from '../../types';

export class Apilarek {
    constructor(private readonly api: IApi) {}

    async getProducts(): Promise<IProductResponse>{
        const response = await this.api.get<IProductResponse>('/product/');
        return response;
    }

    async sendOrder(orderData: IOrder): Promise<IOrderResult> {
        return await this.api.post('/order/', orderData);
    }
}
