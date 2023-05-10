import { Component , OnInit} from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { Product,ProductsData} from './product.interface';
import { DataService } from 'src/app/Services/data.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  data:any;
  // products: Product[] = [];
  // allProducts: Product[] = [];
  // products:any;
  // selectedCollege: string = 'all';;']]
  constructor(public myService:DataService){ }
  ngOnInit() {
    this.myService.getMyProducts().subscribe(data => {
      this.data = data;});
    // this.selectedCollege="all";
    // this.myService.GetAllProducts().subscribe({
    //   next: (data: any) => {
    //     this.allProducts = data;
    //     this.products = this.allProducts;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // });
  }

  // filterProductsByCollege(college: string) {
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


//   searchProductsByTitle(searchTerm: any): void {
//     const searchText = searchTerm?.target?.value?.trim();
//     console.log('searchTerm:', searchTerm);
//     if (!searchText) {
//       return;
//     }
//     if(this.selectedCollege === "all"){
//       this.products =this.allProducts.filter(p => p.title.toLowerCase().includes(searchText.toLowerCase())) ;
//     }
//     else
//     this.products =this.allProducts.filter(p => p.title.toLowerCase().includes(searchText.toLowerCase()) && p.college === this.selectedCollege) ;
// }
}
