import { IOrder, IApi , IProductResponse , IOrderResult } from '../../types';

export class ApiShop {
    constructor(private readonly api: IApi) {}

    async getProducts(): Promise<IProductResponse>{
        return await this.api.get<IProductResponse>('/product/');
    }

    async sendOrder(orderData: IOrder): Promise<IOrderResult> {
        return await this.api.post('/order/', orderData);
    }
}
