
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
    },
    {
      path: 'sistema',
      loadChildren: () => import('./sistema/sistema.module').then( m => m.SistemaModule ),
    },
    {
      path: '',
      loadChildren: () => import('./Home/home.module').then( m => m.HomeModule ),
    },
    
    // {
    //   path: '404',
    //   component: Error404PageComponent,
    // },
    //  {
    //   path: '',
    //    redirectTo: 'home',
    //   pathMatch: 'full'
    // },
    // {
    //   path: '**',
    //   redirectTo: '404',
    // }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }