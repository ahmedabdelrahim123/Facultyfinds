import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');

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
    for (let item of this.cartItemList) {
      item.total = item.quantity * item.price;
      total += item.total;
    }
    return total;
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
}
