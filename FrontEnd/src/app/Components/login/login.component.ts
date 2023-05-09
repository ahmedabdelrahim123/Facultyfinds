import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  title = 'appBootstrap';
  closeResult: string = '';
  panel1: boolean = true; // add boolean flag for Panel 1
  panel2: boolean = false; // add boolean flag for Panel 2
  activePanel = 'panel1';

  constructor(private modalService: NgbModal) {}

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
}
