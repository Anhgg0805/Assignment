import { Component, OnInit } from '@angular/core';
import {Product} from '../../Product';
import {ProductService} from '../../product.service';
import { ActivatedRoute, Router} from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  link: string | ArrayBuffer;
  
  constructor(
    private productService :ProductService,
    private router:Router,
    private fbuiler: FormBuilder
  ) { }

  ngOnInit() {
    
  }
  // productForm: FormGroup;
  product: Product = new Product();


  get productName() {

    // console.log(this.productForm.controls.name);  
    return this.checkInput(this.productForm.controls.name);
    
  }

  get productPrice() {
    return this.checkInput(this.productForm.controls.price);
  }

  get productDesc() {
    return this.checkInput(this.productForm.controls.desc);
  }

  get productQuantily(){
    return this.checkInput(this.productForm.controls.quantily);
  }

  get productImg() {
    return this.checkInput(this.productForm.controls.img);
  }

  checkInput(value) {
    for (let err in value.errors) {
      if (value.dirty) {
        return this.getErrorMes(err, value.errors[err]);
      }
    }
  }

  productForm = this.fbuiler.group({
    id: new FormControl(),
    name: [null, [
      Validators.required,
      // Validators.length()
      Validators.maxLength(30),
      Validators.minLength(1),
      Validators.pattern('^[a-zA-Z]+[a-zA-Z ]*')
    ]],
    price: [null, [
      Validators.required,
      // Validators.length()
      Validators.maxLength(20),
      Validators.minLength(1),
      Validators.pattern('[0-9]*\.[0-9]*')
    ]],
    desc: [null, [
      Validators.required,
      // Validators.length()
      Validators.maxLength(100),
      Validators.minLength(1),
      Validators.pattern('^[a-zA-Z]+[ a-zA-Z ]*')
    ]],
    quantily: [null, [
      Validators.required,
      // Validators.length()
      Validators.maxLength(20),
      Validators.minLength(1),
      Validators.pattern('[0-9]*')
    ]],
    img: [null, [
      Validators.required,
      // Validators.length()
      // Validators.maxLength(100),
      // Validators.minLength(1),
      // Validators.pattern('^[a-zA-Z]+[ a-zA-Z ]*')
    ]],
  });

  getErrorMes(err, value) {
    let messages = {
      'required': 'Do not leave this field blank',
      'maxlength': `Maximum of  ${value.requiredLength} characters`,
      'minlength': `Minimum of ${value.requiredLength} characters`,
      'pattern': 'wrong format',
    };
    return messages[err];
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.link = event.target.result;
      };
    }
  }
  getBase64(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.link = reader.result;
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
    addProduct(){
      this.product = this.productForm.value;
      this.product.img= this.link.toString();
    this.productService.addProduct(this.product).subscribe(data => {
      // console.log(this.product);
    this.router.navigate(['/admin/product-manager'])
    });
    
}
}