import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { CartService } from 'src/app/Services/cart.service';
// import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public productList: any;
  public filterCategory: any;
  searchKey: string = '';
  selectedCollege: any;
  alertVisible = false;

  constructor(private api: DataService, private cartService: CartService) {}

  ngOnInit(): void {
    this.getMyProducts(this.selectedCollege);

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }
  addToCart(item: any) {
    const cartItem = { ...item }; // create a copy of the item
    cartItem.quantity = item.quantity || 1; // set the quantity to 1 if not specified
    this.cartService.addtoCart(cartItem); // add the item to the cart
    this.showAddToCartAlert(item.title);
  }

  showAddToCartAlert(itemTitle: string) {
    this.alertVisible = true;
    setTimeout(() => {
      this.alertVisible = false;
    }, 1000);
  }

  getMyProducts(college?: string): void {
    this.selectedCollege = college;
    this.api.getMyProducts(this.selectedCollege).subscribe((res) => {
      this.productList = res;
      // console.log(this.selectedCollege);
      this.productList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
    });
  }

  searchProductsByTitle(searchTerm: any): void {
    const searchText = searchTerm?.target?.value?.trim();
    console.log('searchTerm:', searchTerm);
    if (!searchText) {
      // Reset the productList to the original list when the search text is empty
      this.getMyProducts(this.selectedCollege);
      return;
    }
    //at all products
    if (this.selectedCollege == null) {
      this.productList = this.productList.filter((p: { title: string }) =>
        p.title.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.productList = this.productList.filter(
        (p: { title: string; college: any }) =>
          p.title.toLowerCase().includes(searchText.toLowerCase()) &&
          p.college === this.selectedCollege
      );
    }
  }



}
