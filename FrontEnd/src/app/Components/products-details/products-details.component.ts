import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';


@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit{
  ID:any;
  product:any;
  constructor(myRoute:ActivatedRoute,public myService: DataService){
    this.ID = myRoute.snapshot.params["id"];
    console.log("in component",this.ID);
  }
  ngOnInit(): void {
    this.myService.getProductById(this.ID).subscribe(
      {
        next:(data)=>{
          console.log("in component",data);
          this.product = data;
        },
        error:(err)=>{console.log(err)}
      }
    );
  }


}
