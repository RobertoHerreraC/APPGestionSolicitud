import { NgModule } from '@angular/core';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { FormularioPageComponent } from './pages/formulario-page/formulario-page.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../reutilizable/shared/shared.module';

@NgModule({
    imports: [
        HomeRoutingModule, 
        FormsModule,
        CommonModule, 
        SharedModule],
    exports: [],
    declarations: [
        HomePageComponent,
        LayoutPageComponent,
        FormularioPageComponent],
    providers: [],
})
export class HomeModule { }
