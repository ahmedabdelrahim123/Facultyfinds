import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsDetailsComponent } from './Components/products-details/products-details.component';
import { ProductsComponent } from './Components/products/products.component';
import { HomeComponent } from './Components/home/home.component';
import { AboutComponent } from './Components/about/about.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AddToCartComponent } from './Components/add-to-cart/add-to-cart.component';
import { ErrorComponent } from './Components/error/error.component';


const routes: Routes = [
  {path:'', component:ProductsComponent},
  {path:'products', component:ProductsComponent},
  {path:'products/:id', component:ProductsDetailsComponent},
  {path:'home', component:HomeComponent},
  {path:'about', component:AboutComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'add-to-cart', component:AddToCartComponent},
  {path:'**', component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
