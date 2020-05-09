import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  template: `
    <div class="modal-header">
             <h5 class="modal-title" id="exampleModalLabel">Sign In</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close"(click)="activeModal.dismiss('Cross click')">
             <span aria-hidden="true">&times;</span>
             </button>
          </div>
          <div class="modal-body">
             <div class="register-form">
                <form action="#" method="post">
                   <div class="fields-grid">
                      <div class="styled-input">
                         <input type="text" placeholder="Your Name" name="Your Name" required="">
                      </div>
                      <div class="styled-input">
                         <input type="email" placeholder="Your Email" name="Your Email" required="">
                      </div>
                      <div class="styled-input">
                         <input type="password" placeholder="password" name="password" required="">
                      </div>
                      <button type="submit" class="btn-block mb-3">Sign In</button>
                   </div>
                </form>
             </div>
          </div>
          <div class="modal-footer">
             <div class="sing-up-jeweler ">
               <button type="button" class="btn btn-link text-left"(click)="open()" >Don't Have an Account...?</button>
                <!-- <a href="#" class="text-left" (click)="open()" data-target="#myModal3"> Don't Have an Account...?</a> -->
             </div>
             <button type="button" class="btn btn-secondary" data-dismiss="modal"(click)="activeModal.dismiss('Cross click')">Close</button>
          </div>
  `
})
export class NgbdModal1Content {
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {}

  open() {
    this.modalService.open(NgbdModal2Content);
  }
}
@Component({
  template: `
    <div class="modal-header">
             <h5 class="modal-title" id="exampleModalLabel">Sign Up</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close"(click)="activeModal.dismiss('Cross click')">
             <span aria-hidden="true">&times;</span>
             </button>
          </div>
          <div class="modal-body">
             <div class="signin-form profile">
                <div class="register-form">
                   <div class="login-form">
                      <form action="#" method="post">
                         <input type="text" name="name" placeholder="Name" required="">
                         <input type="email" name="email" placeholder="Email" required="">
                         <input type="password" name="password" placeholder="Password" id="password" required="">
                         <input type="password" placeholder="Confirm Password" id="confirm_password" required>
                         <button type="submit" class="btn-block mb-3">Sign Up</button>
                      </form>
                   </div>
                </div>
                <div class="clearfix"></div>
             </div>
</div>
             <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" (click)="activeModal.dismiss('Cross click')">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
             </div>
  `
})
export class NgbdModal2Content {
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  public isCollapsed = true;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  open() {
    this.modalService.open(NgbdModal1Content);
  }
}
