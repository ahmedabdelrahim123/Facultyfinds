import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-sold-products',
  templateUrl: './sold-products.component.html',
  styleUrls: ['./sold-products.component.css'],
})
export class SoldProductsComponent implements OnInit {
  orders: any[] = [];
  idOfSeller: any;
  soldProduct: any[] = [];
  index: number = 0;
  hasSoldProduct: boolean = false;
  constructor(private data: DataService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = decodedToken.userId;
      console.log('User ID:', userId);
      this.data.getMyOrders().subscribe(
        (data) => {
          // console.log(data);
          for (const order of data.data) {
            for (const product of order.product) {
              this.idOfSeller = product['pID']['userId'];
              if (this.idOfSeller === userId) {
                this.orders.push(order);
                this.soldProduct.push(product.pID);
                this.hasSoldProduct = true;
              }
            }
          }
        },
        (error) => {}
      );
    }
  }
}
