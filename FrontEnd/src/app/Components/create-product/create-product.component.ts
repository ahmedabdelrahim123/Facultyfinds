import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  imageFile = '';
  user: any;
  userId: any;

  constructor(private dataservice: DataService) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      this.userId = decodedToken.userId;
    }
  }

  AddProduct(title: any, price: any, details: any, college: any, image: any) {
    if (image.files && image.files.length > 0) {
      this.imageFile = image.files[0];
      const formData = new FormData();
      formData.append('image', image.files[0]);
      formData.append('title', title);
      formData.append('details', details);
      formData.append('college', college);
      formData.append('userID', this.userId);
      formData.append('price', price);
      // console.log(formData.get('image'));
      console.log(formData);

      this.dataservice.addNewProduct(formData).subscribe(
        () => {
          console.log('bakbok');
        },
        (err) => {}
      );
    }
  }
}
