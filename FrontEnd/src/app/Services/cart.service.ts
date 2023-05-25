import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');
  private products: any[] = []; 

  constructor() {}
  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtoCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }
  getTotalPrice(): number {
    let total = 0;
    for (const item of this.products) {
      total += item.price * item.quantity;
    }
    return total;
  }
  
  updateCartItem(item: any) {
    const index = this.products.findIndex((p: any) => p.id === item.id);
    if (index !== -1) {
      this.products[index].quantity = item.quantity;
    }
  }
  
  removeCartItem(product: any) {
    console.log(product);

    this.cartItemList.map((a: any, index: any) => {
      console.log(a);
      if (product._id === a._id) {
        this.cartItemList.splice(index, 1);
        // console.log(index);
        // console.log(a);
      }
    });
    this.productList.next(this.cartItemList);
  }
  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }


  getTotalPriceWithShipping(): number {
    const totalPrice = this.cartItemList.reduce((total: number, item: any) => {
      return total + (item.price * item.quantity);
    }, 0);
    return totalPrice + 40; // Assuming the shipping cost is $40
  }
  
}