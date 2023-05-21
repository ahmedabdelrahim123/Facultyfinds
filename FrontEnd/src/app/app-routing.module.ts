import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsDetailsComponent } from './Components/products-details/products-details.component';
import { ProductsComponent } from './Components/products/products.component';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { HomeComponent } from './Components/home/home.component';
import { StripComponent } from './Components/strip/strip.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { AboutComponent } from './Components/about/about.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { AdminGuardService } from './Services/admin-guard.service';
import { CreateProductComponent } from './Components/create-product/create-product.component';
import { DashboradComponent } from './Components/dashborad/dashborad.component';
import { ErrorComponent } from './Components/error/error.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'products', component:ProductsComponent, canActivate: [AuthGuardService]},
  {path:'products/:id', component:ProductsDetailsComponent},
  // {path:'addproducts', component:Add},
  {path:'cart', component: CartComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'strip', component: StripComponent},
  {path:'about', component: AboutComponent},
  {path:'contactus', component: ContactusComponent},
  {path:'createproduct', component: CreateProductComponent},
  {path:'profile', component:UserProfileComponent, canActivate: [AuthGuardService]},
  {path:'dashboard', component:DashboradComponent, canActivate: [AdminGuardService]},
  {path:'**',component:ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
