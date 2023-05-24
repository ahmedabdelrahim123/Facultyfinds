import { Component } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public products : any = [];
  public grandTotal: number = 0;
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
      this.calculateGrandTotal();
     
      //to get the total of items after shipping
    })
  }

  incrementQuantity(item: any): void {
    item.quantity++;
    item.total = item.price * item.quantity; // Update the total based on the new quantity(in the table)
    this.calculateGrandTotal();
  }
  
  decrementQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      item.total = item.price * item.quantity; // Update the total based on the new quantity
      this.calculateGrandTotal();
    }
  }
  
  calculateGrandTotal(): void {
    this.grandTotal = this.products.reduce((total: number, item: any) => {
      return total + (item.price * item.quantity);
    }, 0);
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
  


  updateCartItem(item: any) {
    this.cartService.updateCartItem(item);
    this.grandTotal = this.cartService.getTotalPrice();
  }
  
 
}
