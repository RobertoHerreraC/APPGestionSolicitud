import { NgModule } from '@angular/core';


import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

@NgModule({
    imports: [
        AuthRoutingModule,
        CommonModule
    ],
    exports: [],
    declarations: [
        LoginPageComponent,
        LayoutPageComponent
    ],
    providers: [],
})
export class AuthModule { }
