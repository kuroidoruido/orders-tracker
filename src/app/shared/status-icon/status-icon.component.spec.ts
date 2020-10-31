import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { StatusIconComponent } from './status-icon.component';

describe('StatusIconComponent', () => {
    let component: StatusIconComponent;
    let fixture: ComponentFixture<StatusIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StatusIconComponent],
            imports: [MatIconModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StatusIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
