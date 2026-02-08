import { IBuyer } from "../../types";
import { IEvents } from '../base/Events.ts'

export class Buyer {
    private _payment:  'card' | 'cash' | null = null;
    private _email: string = '';
    private _phone: string = '';
    private _address: string = '';
    private events: IEvents;

    constructor(events: IEvents){
        this.events = events
    }

    // Сохранение данных (частичное обновление)

    setPayment(payment: 'card' | 'cash' | null): void {
        this._payment = payment;
        this.events.emit('buyer:changed', { field: 'payment' })
    }

    setAddress(address: string): void {
        this._address = address;
        this.events.emit('buyer:changed', { field: 'address' })
    }

    setEmail(email: string): void {
        this._email = email;
        this.events.emit('buyer:changed', { field: 'email' })
    }

    setPhone(phone: string): void {
        this._phone = phone;
        this.events.emit('buyer:changed', { field: 'phone' })
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
        this.events.emit('buyer:changed', { field: 'payment' })
    }
}