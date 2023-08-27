import { NgModule } from '@angular/core';
import { SistemaRoutingModule } from './sistema-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        SistemaRoutingModule,
        CommonModule
    ],
    exports: [],
    declarations: [
        LayoutPageComponent
    ],
    providers: [],
})
export class SistemaModule { }
