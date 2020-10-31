import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import getMonth from 'date-fns/getMonth';
import setMonth from 'date-fns/setMonth';
import getYear from 'date-fns/getYear';
import setYear from 'date-fns/setYear';
import startOfMonth from 'date-fns/startOfMonth';
import startOfToday from 'date-fns/startOfToday';

import { StateService } from 'src/app/state/state.service';
import { ExpectedReceiveDate } from 'src/app/model/order.model';

@Component({
    selector: 'app-add-order',
    templateUrl: './add-order.component.html',
    styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent {
    form = new FormGroup({
        type: new FormControl('ORDER'),
        placedOnDate: new FormControl(startOfToday()),
        shop: new FormControl(''),
        label: new FormControl(''),
        receivedDateType: new FormControl('DATE'),
        receivedDate: new FormControl(startOfMonth(startOfToday())),
        receivedFromDate: new FormControl(undefined),
        receivedToDate: new FormControl(undefined),
    });

    constructor(private state: StateService) {}

    save(): void {
        const value = this.form.value;
        let expectedReceiveDate: ExpectedReceiveDate;
        switch (value.receivedDateType as ExpectedReceiveDate['type']) {
            case 'DATE':
                expectedReceiveDate = { type: 'DATE', date: value.receivedDate };
                break;
            case 'MONTH':
                expectedReceiveDate = { type: 'MONTH', date: value.receivedDate };
                break;
            case 'RANGE':
                expectedReceiveDate = { type: 'RANGE', from: value.receivedFromDate, to: value.receivedToDate };
                break;
        }
        this.state.addOrder({
            id: '',
            status: 'OPEN',
            type: value.type,
            placedOnDate: value.placedOnDate,
            shop: value.shop,
            label: value.label,
            expectedReceiveDate,
        });
    }

    chosenYearHandler(normalizedYear: Date): void {
        let ctrlValue = this.form.controls.receivedDate.value;
        ctrlValue = setYear(ctrlValue, getYear(normalizedYear));
        this.form.controls.receivedDate.setValue(ctrlValue);
    }

    chosenMonthHandler(normalizedMonth: Date, datepicker: MatDatepicker<Date>): void {
        let ctrlValue = this.form.controls.receivedDate.value;
        ctrlValue = setMonth(ctrlValue, getMonth(normalizedMonth));
        this.form.controls.receivedDate.setValue(ctrlValue);
        datepicker.close();
    }
}
