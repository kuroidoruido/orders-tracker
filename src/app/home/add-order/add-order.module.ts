import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AddOrderComponent } from './add-order.component';
import { DateFnsAdapterModule } from 'src/app/shared/date-fns-adapter/date-fns-adapter.module';

@NgModule({
    declarations: [AddOrderComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatExpansionModule,
        MatNativeDateModule,
        MatInputModule,
        MatSelectModule,
        DateFnsAdapterModule,
    ],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }],
    exports: [AddOrderComponent],
})
export class AddOrderModule {}
