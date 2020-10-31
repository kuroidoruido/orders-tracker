import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';

const routes: Routes = [{ path: '', pathMatch: 'full', component: HomeComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes), HomeModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
