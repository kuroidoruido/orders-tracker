import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

import { OrderListComponent } from './order-list.component';
import { OrderPipe } from './order-pipe/order.pipe';
import { StatusIconModule } from 'src/app/shared/status-icon/status-icon.module';
import { OrderComponent } from './order/order.component';

@NgModule({
    declarations: [OrderListComponent, OrderPipe, OrderComponent],
    imports: [CommonModule, MatListModule, StatusIconModule],
    exports: [OrderListComponent],
})
export class OrderListModule {}
