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
    console.log('in component', this.ID);
  }
  ngOnInit(): void {
    this.dataservice.getProductById(this.ID).subscribe({
      next: (data) => {
        console.log('in component', data);
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

      if (image && image.files && image.files.length > 0) {
        // If a new image was selected, add it to the form data
        formData.append('image', image.files[0]);
      }
      else {
        formData.append('image', this.product.image);
      }

      this.dataservice.updateProduct(this.ID, formData).subscribe((res) => {
        // alert('Product Updated Successfully');
        // // Reload the current URL
      });
      if(this.auth.isAdmin()){
      this.router.navigate(['/adminproducts']);
      }
      else{
        this.router.navigate(['/user-products']);
      }
    }
    
  }

