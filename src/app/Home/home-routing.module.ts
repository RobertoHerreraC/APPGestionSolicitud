import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutPageComponent } from "./pages/layout-page/layout-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { FormularioPageComponent } from "./pages/formulario-page/formulario-page.component";
import { BusquedaPageComponent } from "./pages/busqueda-page/busqueda-page.component";

// localhost:4200/home
const routes: Routes = [
    {
      path: '',
      component: LayoutPageComponent,
      children: [
        { path: 'home', component: HomePageComponent },
        { path: 'formulario', component: FormularioPageComponent },
        { path: 'busqueda', component: BusquedaPageComponent },
        { path: '**', redirectTo: 'home' },
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HomeRoutingModule { }