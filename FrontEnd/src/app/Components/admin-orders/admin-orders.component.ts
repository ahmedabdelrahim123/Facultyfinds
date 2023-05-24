import { Component,OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: any;
  userId: any;
  // statue: any
  constructor(private api : DataService) { }
  ngOnInit(): void {
    this.api.getMyOrders().subscribe(
    {
      next:(data)=>{
        this.orders = data.data;
      },
      error:(err)=>{console.log(err)}
    }
  )}


  updateOrderStatue(statue:any,orderId:any){
    let orderStatue= {statue, orderId};
    this.api.updateOrder(orderStatue,orderId).subscribe((res) => {

    });
  }



}
