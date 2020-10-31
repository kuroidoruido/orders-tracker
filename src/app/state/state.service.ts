import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Order } from 'src/app/model/order.model';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    private orders$ = new BehaviorSubject<Order[]>([]);

    constructor() {
        setTimeout(() => this.loadFromBackend(), 0);
    }

    getOrders(): Observable<Order[]> {
        return this.orders$.asObservable();
    }

    addOrder(newOrder: Order): void {
        this.orders$.pipe(first()).subscribe((orders) => {
            const newOrders = [...orders, newOrder];
            this.orders$.next(newOrders);
            try {
                localStorage.setItem('ORDERS', JSON.stringify(newOrders));
            } catch (error) {
                console.error('Failed to save:', newOrders, error);
            }
        });
    }

    private loadFromBackend(): void {
        const fromLocalStorage = localStorage.getItem('ORDERS');
        if (fromLocalStorage) {
            try {
                const orders = JSON.parse(fromLocalStorage);
                this.orders$.next(orders);
            } catch (error) {
                console.error('Failed to restore:', fromLocalStorage, error);
            }
        }
    }
}
