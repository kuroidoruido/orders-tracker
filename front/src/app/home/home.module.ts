import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { HomeComponent } from './home.component';
import { OrderStringParserModule } from '../services/order-string-parser/order-string-parser.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    OrderStringParserModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
