import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Product } from '../../Product';
import { ProductService } from '../../product.service';
@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerComponent implements OnInit {
  products:Product[];
  productNew:Product= new Product();
  product:Product;
  searchText:string ;
  constructor(
    private productService:ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.getProducts();
    this.getproductList();
  }
  page = 1;
  pageSize = 6;
  collectionSize;

  getproductList() :Product[]{
    
    this.productService.getProducts().subscribe(data => {
      this.products=data;
      this.collectionSize=this.products.length;
    })
      return this.products
      .map((product, i) => ({id: i + 1, ...product}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  getProducts(){
    // this.products=this.productService.getProducts();
    this.productService.getProducts().subscribe(data => {
      // console.log(data);
      this.products=data;
    })
  }
  removeItem(id) {
    // this.products=this.productService.removeProduct(id);
    this.productService.removeProduct(id).subscribe(response =>{
      this.router.navigate(['/admin/product-manager'])
      console.log(response);
    });
  }
  addProduct(){
    // this.productService.addProduct(this.productNew);
    this.productService.addProduct(this.productNew).subscribe(data => {
    this.router.navigate(['/admin/product-manager'])
    });
    
  }
}