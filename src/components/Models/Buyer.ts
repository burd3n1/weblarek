import { IBuyer } from "../../types";

export class Buyer {
    private _payment:  'card' | 'cash' | null = null;
    private _email: string = '';
    private _phone: string = '';
    private _address: string = '';

    // Сохранение данных (частичное обновление)
    set(data: IBuyer): void {
        if (data.payment !== undefined) this._payment = data.payment;
        if (data.email !== undefined) this._email = data.email;
        if (data.phone !== undefined) this._phone = data.phone;
        if (data.address !== undefined) this._address = data.address;
    }

    // Получение всех данных (даже неполных)
    get(): IBuyer {
        return {
            payment: this._payment,
            email: this._email,
            phone: this._phone,
            address: this._address
        };
    }


    // Валидация: возвращает объект с ошибками
    validate(): { [key: string]: string } {
        const errors: { [key: string]: string } = {};

        if (this._payment === null) {
            errors.payment = 'Не выбран способ оплаты';
        }

        if (!this._email.trim()) {
            errors.email = 'Укажите email';
        }

        if (!this._phone.trim()) {
            errors.phone = 'Укажите телефон';
        }

        if (!this._address.trim()) {
            errors.address = 'Укажите адрес доставки';
        }

        return errors;
    }

    clear() {
        this._payment = null;
        this._address = '';
        this._email = '';
        this._phone = '';
    }
}