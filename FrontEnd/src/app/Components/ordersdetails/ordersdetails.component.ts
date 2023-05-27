import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ordersdetails',
  templateUrl: './ordersdetails.component.html',
  styleUrls: ['./ordersdetails.component.css'],
})
export class OrdersdetailsComponent implements OnInit {
  orders: any[] = [];
  hasOrders: boolean = false;
  constructor(private myService: DataService,private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = decodedToken.userId;
      // console.log('User ID:', userId);
      this.myService.getMyOrders().subscribe(
        (data) => {
          console.log(data);
          for (const order of data.data) {
            if (order.userID._id === userId) {
              this.orders.push(order);
              this.hasOrders=true;
              console.log('hi');
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
delete_order(id: any){
  this.myService.deleteOrder(id).subscribe(() => {
    this.router.navigate(['/orders']);
    location.reload();

  });

}

}
