import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css']
})
export class UserProductsComponent implements OnInit {
  products: any[] = [];
  hasProducts: boolean = false;

  constructor(private myService: DataService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = decodedToken.userId;
      this.myService.getMyProducts().subscribe(
        (data) => {
          console.log(data);
          for (const product of data) {
          if (product.userId === userId) {
              this.products.push(product);
              this.hasProducts = true;
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  deleteProduct(id: any): void {
    let confirmed = confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      this.myService.deleteProduct(id).subscribe((res) => {
        location.reload();
      });
    }
  }

}
