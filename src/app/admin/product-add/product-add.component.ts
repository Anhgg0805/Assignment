import { Component, OnInit } from '@angular/core';
import {Product} from '../../Product';
import {ProductService} from '../../product.service';
import { ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  product:Product=new Product();
  link: string | ArrayBuffer;
  
  constructor(
    private productService :ProductService,
    private router:Router
  ) { }

  ngOnInit() {
    
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
      this.product.img= this.link;
    this.productService.addProduct(this.product).subscribe(data => {
      // console.log(this.product);
    this.router.navigate(['/admin/product-manager'])
    });
    
}
}