/**
 * Created by Mauricio on 05/03/2017.
 */
import {HomeComponent} from "./home/home.component";
import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from '@angular/core'
import {PasteleriaComponent} from "./pasteleria/pasteleria.component";
import {PastelComponent} from "./pastel/pastel.component";

export const routes: Routes =[
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'pasteleria', component:PasteleriaComponent},//tienda/:idTienda/Productos
  //{path: 'tienda/:idTienda/producto', component:ProductoComponent}
  {path: 'pastel', component:PastelComponent}
];

export const routing:ModuleWithProviders=RouterModule.forRoot(routes);
