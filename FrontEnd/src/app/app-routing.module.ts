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
import { UpdateProductComponent } from './Components/update-product/update-product.component';
import { DashboardProductsComponent } from './Components/dashboard-products/dashboard-products.component';
import { ProductAddedComponent } from './Components/product-added/product-added.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'products/:id', component: ProductsDetailsComponent },

  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'strip', component: StripComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'adminproducts', component: DashboardProductsComponent },
  { path: 'createproduct', component: CreateProductComponent },
  { path: 'productadded', component: ProductAddedComponent },
  { path: 'updateproduct/:id', component: UpdateProductComponent },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'dashboard',
    component: DashboradComponent,
    canActivate: [AdminGuardService],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
