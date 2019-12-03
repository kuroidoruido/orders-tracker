import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { HomeComponent } from './home.component';
import { OrderStringParserModule } from '../services/order-string-parser/order-string-parser.module';
import { OrderInputComponent } from './order-input/order-input.component';

@NgModule({
  declarations: [HomeComponent, OrderInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatInputModule,

    OrderStringParserModule,
  ],
  exports: [HomeComponent],
  providers: [],
})
export class HomeModule {}
