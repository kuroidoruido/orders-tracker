import { Component, Input } from '@angular/core';

import { Order } from 'src/app/model/order.model';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
    @Input() order?: Order;
}
