import { Component, OnInit } from '@angular/core';
import {Product} from '../../Product';
import {ProductService} from '../../product.service';
import { ActivatedRoute, Router} from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { UploadImgService } from '../../upload-img.service';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  imageFile: File;
  link: string | ArrayBuffer;
  product:Product = new Product;
  constructor(
    private productService :ProductService,
    private router:Router,
    private fbuiler: FormBuilder,
    private imageService: UploadImgService
  ) { }

  ngOnInit() {
    
  }
  //function validate
  productForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, 
      Validators.minLength(3), 
      Validators.pattern('^[a-zA-Z0-9]+[a-zA-Z0-9 ]*')]),
    price: new FormControl('', [
      Validators.required, 
      Validators.minLength(1),
      Validators.min(0), 
      Validators.pattern('[0-9]+\.[0-9]*')]),
    img: new FormControl('', [Validators.required]),
    desc: new FormControl('', [
      Validators.required, 
      Validators.minLength(5),
      Validators.pattern('^[a-zA-Z0-9]+[a-zA-Z0-9 ]*')])
  });

  get f() {
    return this.productForm.controls;
  }
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
    this.imageFile = event.target.files[0];

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
    async addProduct(){
      let image_res = await this.imageService.uploadImage(this.imageFile);
      this.product = this.productForm.value;
      // console.log(image);
      this.product.img = image_res["data"].link;
      console.log(this.product.img);
      
      // this.product.img= this.link.toString();
    this.productService.addProduct(this.product).subscribe(data => {
      // console.log(this.product);
    this.router.navigate(['/admin/product-manager'])
    });
    
}
  
}