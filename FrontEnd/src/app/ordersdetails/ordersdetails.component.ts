
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-ordersdetails',
  templateUrl: './ordersdetails.component.html',
  styleUrls: ['./ordersdetails.component.css']
})
export class OrdersdetailsComponent implements OnInit {

  orders: any[] = [];

  constructor(private myService: DataService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = decodedToken.userId;
      // console.log('User ID:', userId);
      this.myService.getMyOrders().subscribe(
        (data) => {
          for (const order of data) {
            console.log(order);
            console.log(userId);
            if (order.userID === userId) {
              this.orders.push(order);
              console.log("hi");
            }
          }
        console.log(this.orders);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
