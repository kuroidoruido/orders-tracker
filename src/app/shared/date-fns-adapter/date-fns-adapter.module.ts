import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import format from 'date-fns/format';
import { fr } from 'date-fns/locale';

@Injectable()
export class DateFnsDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: string): string {
        return format(date, displayFormat, { locale: fr });
    }
}

export const DATE_FNS_FORMATS = {
    parse: {
        dateInput: 'MM/yyyy',
    },
    display: {
        dateInput: 'MM/yyyy',
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM yyyy',
    },
};

@NgModule({
    imports: [CommonModule],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: DATE_FNS_FORMATS },
        { provide: DateAdapter, useClass: DateFnsDateAdapter },
    ],
})
export class DateFnsAdapterModule {}
