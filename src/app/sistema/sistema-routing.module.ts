import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { GestionPageComponent } from './pages/gestion-page/gestion-page.component';



// localhost:4200/auth/
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'gestion', component: GestionPageComponent },
      { path: '**', redirectTo: 'gestion' },
    ]
  }
];




@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ],
})
export class SistemaRoutingModule { }