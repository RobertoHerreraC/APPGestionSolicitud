import { NgModule } from '@angular/core';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { FormularioPageComponent } from './pages/formulario-page/formulario-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../reutilizable/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        HomeRoutingModule, 
        FormsModule,
        ReactiveFormsModule,
        CommonModule, 
        SharedModule,
        NgbModule],
    exports: [],
    declarations: [
        HomePageComponent,
        LayoutPageComponent,
        FormularioPageComponent],
    providers: [],
})
export class HomeModule { }
