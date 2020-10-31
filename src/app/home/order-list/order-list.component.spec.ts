import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';

import { OrderPipe } from './order-pipe/order.pipe';

import { OrderListComponent } from './order-list.component';
import { OrderComponent } from './order/order.component';
import { StatusIconModule } from 'src/app/shared/status-icon/status-icon.module';

describe('OrderListComponent', () => {
    let component: OrderListComponent;
    let fixture: ComponentFixture<OrderListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OrderListComponent, OrderComponent, OrderPipe],
            imports: [MatListModule, StatusIconModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
