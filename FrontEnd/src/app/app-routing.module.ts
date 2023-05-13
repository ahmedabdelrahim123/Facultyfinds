import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsDetailsComponent } from './Components/products-details/products-details.component';
import { ProductsComponent } from './Components/products/products.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  {path:'', component:ProductsComponent},
  {path:'products', component:ProductsComponent},
  {path:'products/:id', component:ProductsDetailsComponent},
  {path:'Home', component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
