import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../Product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product:Product;
  url:string | ArrayBuffer;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router  
  ) { }

  ngOnInit() {
    this.getProduct();
  }
  getProduct(){
     this.route.params.subscribe(param => {
      this.productService.getProduct(param.id).subscribe(data =>{
        // console.log(data);
        this.product=data;
        this.url=this.product.img;
      })
      console.log(param);
    })
  }
  edit(){
    this.product.img= this.url;
    this.productService.editProduct(this.product).subscribe(data =>{
      console.log(data);
      this.router.navigate(['/admin/product-manager']);
    }
    );
    
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