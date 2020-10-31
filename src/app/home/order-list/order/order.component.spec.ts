import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusIconModule } from 'src/app/shared/status-icon/status-icon.module';
import { OrderPipe } from '../order-pipe/order.pipe';

import { OrderComponent } from './order.component';

describe('OrderComponent', () => {
    let component: OrderComponent;
    let fixture: ComponentFixture<OrderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OrderComponent, OrderPipe],
            imports: [StatusIconModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
