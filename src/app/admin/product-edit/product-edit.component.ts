import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../Product';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { UploadImgService } from 'src/app/upload-img.service';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  imageFile:File;
  product:Product;
  url:string | ArrayBuffer;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router  ,
    private fbuiler: FormBuilder,
    private imageService: UploadImgService

  ) { }

  ngOnInit() {
    this.getProduct();
  }
  // productForm: FormGroup;
  // product: Product = new Product();


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
      Validators.pattern('^[a-zA-Z0-9]+[a-zA-Z0-9 ]*')
    ]],
    price: [null, [
      Validators.required,
      // Validators.length()
      Validators.maxLength(20),
      Validators.minLength(1),
      Validators.pattern('[0-9]+\.[0-9]*')
    ]],
    desc: [null, [
      Validators.required,
      // Validators.length()
      Validators.maxLength(100),
      Validators.minLength(1),
      Validators.pattern('^[a-zA-Z0-9]+[ a-zA-Z0-9 ]*')
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

  getProduct(){
     this.route.params.subscribe(param => {
      this.productService.getProduct(param.id).subscribe(data =>{
        console.log(data);
        // console.log(data.img);
        // this.product=data;
        this.url=data.img;
        this.productForm.setValue(data);
        
        
      })
      // console.log(param);
    })
  }
  async saveImg(event){
      let image_res = await this.imageService.uploadImage(this.imageFile);
      // console.log(image_res);
      this.url = image_res["data"].link;
      console.log(this.url);
  }
  edit(){
    this.product = this.productForm.value;
    this.product.img= this.url.toString();
    this.productService.editProduct(this.product).subscribe(data =>{
      console.log(data);
      this.router.navigate(['/admin/product-manager']);
    }
    );
    
  }
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
    this.imageFile = event.target.files[0];

      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };
    }
  }
  
  getBase64(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      me.url=reader.result;
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
    
}