import { Component } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public products : any = [];
  public grandTotal !: number;
  public TotalPrice !: number;
  public totalItem : number = 0;
  public totalQuantity: number = 0;
 

  constructor(private cartService : CartService) { }
  addtoCart(product: any) {
    this.cartService.addtoCart(product);
    // window.alert('Your product has been added to the cart!');
  }
  ngOnInit(): void {
    // When the observable emits a value, the products property of the component is set to the emitted value,
    //  and the grandTotal property is set to the total price of all items in the cart, calculated by 
    //  calling the getTotalPrice method of the CartService.
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
      this.totalQuantity = this.getTotalQuantity();
      this.totalItem = this.products.length + this.totalQuantity;
     
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

  getTotalQuantity(): number {
    let totalQuantity = 0;
    for (const item of this.products) {
      totalQuantity += item.quantity;
    }
    return totalQuantity;
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
