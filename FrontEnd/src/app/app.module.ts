import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProductsDetailsComponent } from './Components/products-details/products-details.component';
import { HomeComponent } from './Components/home/home.component';
import { AboutComponent } from './Components/about/about.component';
import { ErrorComponent } from './Components/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { DashboradComponent } from './Components/dashborad/dashborad.component';
import { CreateProductComponent } from './Components/create-product/create-product.component';
import { UpdateProductComponent } from './Components/update-product/update-product.component';
import { DashboardProductsComponent } from './Components/dashboard-products/dashboard-products.component';
import { OrdersdetailsComponent } from './Components/ordersdetails/ordersdetails.component';
import { AdminOrdersComponent } from './Components/admin-orders/admin-orders.component';
import { UpdateUserComponent } from './Components/update-user/update-user.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './Services/auth-interceptor.interceptor';
import { UserProductsComponent } from './Components/user-products/user-products.component';
import { TermsOfServiceComponent } from './Components/terms-of-service/terms-of-service.component';
import { RefundPolicyComponent } from './Components/refund-policy/refund-policy.component';
import { ProductAddedComponent } from './Components/product-added/product-added.component';
import { SoldProductsComponent } from './Components/sold-products/sold-products.component';
import { OrderCreatedComponent } from './Components/order-created/order-created.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    ProductsDetailsComponent,
    HomeComponent,
    AboutComponent,
    ErrorComponent,
    CartComponent,
    CheckoutComponent,
    ContactusComponent,
    UserProfileComponent,
    DashboradComponent,
    CreateProductComponent,
    UpdateProductComponent,
    DashboardProductsComponent,
    OrdersdetailsComponent,
    AdminOrdersComponent,
    UpdateUserComponent,
    SidebarComponent,
    UserProductsComponent,
    TermsOfServiceComponent,
    RefundPolicyComponent,
    ProductAddedComponent,
    SoldProductsComponent,
    OrderCreatedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbDropdownModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
