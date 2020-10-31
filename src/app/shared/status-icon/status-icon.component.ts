import { Component, Input } from '@angular/core';
import { OrderStatus } from 'src/app/model/order.model';

@Component({
    selector: 'app-status-icon',
    templateUrl: './status-icon.component.html',
    styleUrls: ['./status-icon.component.scss'],
})
export class StatusIconComponent {
    @Input() status: OrderStatus = 'OPEN';
}
