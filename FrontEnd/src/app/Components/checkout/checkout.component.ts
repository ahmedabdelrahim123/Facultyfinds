import { Component } from '@angular/core';
// import { Validators } from '@angular/forms';
// import { FormGroup, FormBuilder } from '@angular/forms';
import { CartService } from 'src/app/Services/cart.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  // myForm: FormGroup;
  public products : any = [];
  public grandTotal !: number;
  public Total !: number;
  public totalItem : number = 0;
  // item: any;


constructor(private cartService : CartService) {
  // this.myForm = this.fb.group({
  //   name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]]
  // });
 }

ngOnInit(): void {

// When the observable emits a value, the products property of the component is set to the emitted value,
//  and the grandTotal property is set to the total price of all items in the cart, calculated by 
//  calling the getTotalPrice method of the CartService.
this.cartService.getProducts()
.subscribe(res=>{
  this.products = res;
  this.grandTotal = this.cartService.getTotalPrice();
  this.Total = this.cartService.getTotalPrice()+40;
    this.totalItem = res.length;
  
})
}

}
