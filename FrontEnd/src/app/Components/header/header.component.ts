import { Component, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent {
  title = 'appBootstrap';
  closeResult: string = '';
  panel1: boolean = true; // add boolean flag for Panel 1
  panel2: boolean = false; // add boolean flag for Panel 2
  activePanel = 'panel1';
  public showModal = false;
  type="user";
  orders=[];
  image="assets/products/avatar.png";

  constructor(private modalService: NgbModal,private myService:DataService, private router: Router) {
    this.type="user";
    this.orders=[];
    this.panel1 = true;
    this.panel2 = false;
  }

  //////for register user
  AddUser(username:any, email:any, password:any, genderRadio:any){
    const gender = (genderRadio.value === 'male') ? 'male' : 'female';
    let newUser = {username, email, password, gender, type: this.type, image: this.image, orders: this.orders};
    this.myService.addNewUser(newUser).subscribe(() =>{
      this.modalService.dismissAll();
      this.router.navigate(['/']);
    });
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // add function to show Panel 1
  showPanel1() {
    this.panel1 = true;
    this.panel2 = false;
    this.activePanel = 'panel1';
  }

  // add function to show Panel 2
  showPanel2() {
    this.panel1 = false;
    this.panel2 = true;
    this.activePanel = 'panel2';
  }

  public totalItem : number = 0;

  isAuthenticated() {
    return false;
 }
 logout(){

 }

//  ngOnInit(): void {
//   this.cartService.getProducts()
//   .subscribe(res=>{
//     this.totalItem = res.length;
//   })
// }

}
