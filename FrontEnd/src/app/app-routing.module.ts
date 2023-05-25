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
import { OrdersdetailsComponent } from './Components/ordersdetails/ordersdetails.component';
import { AdminOrdersComponent } from './Components/admin-orders/admin-orders.component';
import { UpdateUserComponent } from './Components/update-user/update-user.component';
import { UserProductsComponent } from './Components/user-products/user-products.component';
import { TermsOfServiceComponent } from './Components/terms-of-service/terms-of-service.component';
import { RefundPolicyComponent } from './Components/refund-policy/refund-policy.component';
import { ProductAddedComponent } from './Components/product-added/product-added.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'products/:id', component: ProductsDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'orders', component: OrdersdetailsComponent, canActivate: [AuthGuardService] },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService] },
  { path: 'strip', component: StripComponent },
  { path: 'about', component: AboutComponent },

  { path: 'terms_of_service', component: TermsOfServiceComponent },
  { path: 'refund_policy', component: RefundPolicyComponent },

  { path: 'contactus', component: ContactusComponent },
  { path: 'adminproducts', component: DashboardProductsComponent, canActivate: [AdminGuardService] },
  { path: 'createproduct', component: CreateProductComponent, canActivate: [AuthGuardService] },
  { path: 'updateproduct/:id', component: UpdateProductComponent, canActivate: [AuthGuardService] },
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
  { path: 'adminorders', component: AdminOrdersComponent, canActivate: [AdminGuardService] },
  { path: 'updateuser/:id', component: UpdateUserComponent, canActivate: [AuthGuardService] },
  { path: 'user-products', component: UserProductsComponent, canActivate: [AuthGuardService]},
  {path: 'productadded', component: ProductAddedComponent, canActivate: [AuthGuardService]},
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
