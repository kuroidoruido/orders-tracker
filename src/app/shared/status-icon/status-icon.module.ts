import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { StatusIconComponent } from './status-icon.component';

@NgModule({
    declarations: [StatusIconComponent],
    imports: [CommonModule, MatIconModule],
    exports: [StatusIconComponent],
})
export class StatusIconModule {}
