import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { OrderListModule } from './order-list/order-list.module';
import { AddOrderModule } from './add-order/add-order.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, AddOrderModule, OrderListModule],
    exports: [HomeComponent],
})
export class HomeModule {}
