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
    //  this.api.getMyProducts(this.selectedCollege)
    // .subscribe(res=>{
    //   this.productList = res;
    //   console.log(this.selectedCollege)
    //   this.productList.forEach((a:any) => {
    //     Object.assign(a,{quantity:1,total:a.price});
    //   });
    // });

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  addtocart(item: any){
    this.cartService.addtoCart(item);

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
  // filter(category:string){
  //   this.filterCategory = this.productList
  //   .filter((a:any)=>{
  //     if(a.category == category || category==''){
  //       return a;
  //     }
  //   })
  // }
  //   filterProductsByCollege(college: string) {
  //   this.selectedCollege = college;
  //   if (  college  === 'all') {
  //        // if 'all' is selected, show all products
  //     this.products = this.allProducts;
  //   } else {
  //      // filter products based on selected college
  //     if(this.allProducts){
  //     this.products = this.allProducts.filter(p => p.college.toLowerCase() === college.toLowerCase());
  //   }}
  // }

}
