import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { OrderStringParserService } from 'src/app/services/order-string-parser/order-string-parser.service';
import { Order } from 'src/app/model/order.model';

@Component({
  selector: 'app-order-input',
  templateUrl: './order-input.component.html',
  styleUrls: ['./order-input.component.scss'],
})
export class OrderInputComponent implements OnInit {
  @Input() value: Partial<Order> = {};
  @Output() orderChange: EventEmitter<Partial<Order>> = new EventEmitter<Partial<Order>>();

  formControl: FormControl = new FormControl('', Validators.required);
  order: Observable<Partial<Order>> = of({});

  constructor(private orderStringParserService: OrderStringParserService) {}

  ngOnInit() {
    this.order = this.formControl.valueChanges.pipe(
      map(this.orderStringParserService.parse.bind(this.orderStringParserService)),
      tap(this.orderChange.emit.bind(this.orderChange)),
    );
  }
}
