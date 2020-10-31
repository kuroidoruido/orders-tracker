import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AddOrderComponent } from './add-order.component';

describe('AddOrderComponent', () => {
    let component: AddOrderComponent;
    let fixture: ComponentFixture<AddOrderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddOrderComponent],
            imports: [
                NoopAnimationsModule,
                ReactiveFormsModule,
                MatDatepickerModule,
                MatExpansionModule,
                MatNativeDateModule,
                MatInputModule,
                MatSelectModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddOrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
