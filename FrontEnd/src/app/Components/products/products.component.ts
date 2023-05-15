import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { CartService } from 'src/app/Services/cart.service';
// import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productList : any ;
  public filterCategory : any
  searchKey:string ="";
  selectedCollege: any;

  constructor(private api : DataService, private cartService : CartService) { }

  ngOnInit(): void {
    this.getMyProducts(this.selectedCollege);

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  addToCart(item: any) {
    const cartItem = { ...item }; // create a copy of the item
    cartItem.quantity = item.quantity || 1; // set the quantity to 1 if not specified
    this.cartService.addtoCart(cartItem); // add the item to the cart
    // item.quantity = null; // reset the quantity selector after adding to cart
  }
  
  
  updateTotalPrice(item: any) {
    item.totalPrice = item.price * item.quantity;
  }
  getTotalPrice(item: any) {
    if (item.totalPrice) {
      return item.totalPrice.toFixed(2);
    } else {
      return (item.price * item.quantity).toFixed(2);
    }
  }
  
  getMyProducts(college?: string): void {
    this.selectedCollege = college;
    this.api.getMyProducts(this.selectedCollege)
      .subscribe(res=>{
        this.productList = res;
        console.log(this.selectedCollege);
        this.productList.forEach((a:any) => {
          Object.assign(a,{quantity:1,total:a.price});
        });
      });
  }

}
