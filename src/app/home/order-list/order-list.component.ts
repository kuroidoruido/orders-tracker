import { Component } from '@angular/core';

import { StateService } from 'src/app/state/state.service';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent {
    orders$ = this.state.getOrders();

    constructor(public state: StateService) {}
}
