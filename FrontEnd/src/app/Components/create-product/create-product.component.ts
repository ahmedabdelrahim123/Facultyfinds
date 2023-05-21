import { Component } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})

export class CreateProductComponent {
  imageFile = '';
  constructor (private dataservice: DataService){

  }
  AddProduct(title: any, price: any, details: any, college: any, image: any, userID: any) {
    if (image.files && image.files.length > 0) {
      this.imageFile = image.files[0];
      const formData = new FormData();
      formData.append('image', image.files[0]);
      formData.append('title', title);
      formData.append('details', details);
      formData.append('college', college);
      formData.append('userID', userID);
      console.log(formData.get('image'));

      this.dataservice.addNewProduct(formData).subscribe(
        () => {
          console.log("bakbok");
        },
        (err) => {
        }
      );
    }
  }
}
