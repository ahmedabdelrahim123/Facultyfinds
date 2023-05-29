import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService} from '../../Services/auth.service'
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent {
  imageFile = '';
  product: any;
  ID: any;
  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private auth:AuthService
  ) {
    this.ID = route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.dataservice.getProductById(this.ID).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  UpdateProduct(
    title: any,
    price: any,
    quantity: any,
    details: any,
    college: any,
    image: any
  ) {
      let formData = new FormData();

      if(title){
        formData.append('title', title);
      }
      if(details){
        formData.append('details', details);
      }
      if(college){
        formData.append('college', college);
      }
      if(price){
        formData.append('price', price);
      }
      if(quantity){
        formData.append('quantity', quantity);
      }

      if (image && image.files && image.files.length > 0) {
        // If a new image was selected, add it to the form data
        formData.append('image', image.files[0]);
      }
      else {
        formData.append('image', this.product.image);
      }
console.log(formData.get);
      this.dataservice.updateProduct(this.ID, formData).subscribe((res) => {
        // alert('Product Updated Successfully');
        // // Reload the current URL
      });
      if (this.auth.isAdmin()) {
        setTimeout(() => {
          this.router.navigate(['/adminproducts']).then(() => {
            window.location.reload();
          });
        }, 1000); // Add a timeout of 1000 milliseconds (1 second)
      } else {
        setTimeout(() => {
          this.router.navigate(['/user-products']).then(() => {
            window.location.reload();
          });
        }, 1000); // Add a timeout of 1000 milliseconds (1 second)
      }}

  }

