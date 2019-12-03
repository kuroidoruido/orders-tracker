import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInputComponent } from './order-input.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('OrderInputComponent', () => {
  let component: OrderInputComponent;
  let fixture: ComponentFixture<OrderInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [OrderInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
