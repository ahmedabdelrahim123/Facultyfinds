import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { CartService } from 'src/app/Services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrls: ['./dashboard-products.component.css'],
})
export class DashboardProductsComponent implements OnInit {
  public productList: any;
  public filterCategory: any;
  searchKey: string = '';
  selectedCollege: any;
  productsNumbers: any;

  constructor(
    private api: DataService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMyProducts(this.selectedCollege);

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  getMyProducts(college?: string): void {
    this.selectedCollege = college;
    this.api.getMyProducts(this.selectedCollege).subscribe((res) => {
      this.productList = res;
      console.log(this.selectedCollege);
      this.productList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
    });
  }
// this.productsNumbers= getMyProducts().lenght;
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

  deleteProduct(id: any): void {
    let confirmed = confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      this.api.deleteProduct(id).subscribe((res) => {
        // Reload the current URL
        location.reload();
      });
    }
  }
}
