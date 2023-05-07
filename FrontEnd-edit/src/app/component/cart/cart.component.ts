import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  public totalItem : number = 0;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    // When the observable emits a value, the products property of the component is set to the emitted value,
    //  and the grandTotal property is set to the total price of all items in the cart, calculated by 
    //  calling the getTotalPrice method of the CartService.
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
        this.totalItem = res.length;
      //to get the total of items after shipping
    })
  }
  removeItem(item: any){
    //It calls the removeCartItem method of the CartService with the item to be removed as an argument.
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    //remove all items from the cart. It calls the removeAllCart method of the CartService.
    this.cartService.removeAllCart();
  }

//   quantity(value:string){
//     if(this.item.quantity <8 && value=="max"){
//       this.item.quantity +=1;
//     }
//     else   if(this.item.quantity>1 && value=="min"){
//       this.item.quantity -=1;
//   }
// }
 
}