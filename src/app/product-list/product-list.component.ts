import { Component, OnInit,PipeTransform } from '@angular/core';
import {Product }from '../Product';
import { ProductService } from '../product.service';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [DecimalPipe]
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  filter = new FormControl('');
  selected : Product;
  products:Product[];
  constructor(
    private productService :ProductService,pipe: DecimalPipe
  ) { 
    this.products$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
  }
   search(text: string, pipe: PipeTransform): Product[] {
    return this.products.filter(product => {
      const term = text.toLowerCase();
      return product.name.toLowerCase().includes(term)
          || pipe.transform(product.desc).includes(term)
          || pipe.transform(product.price).includes(term);
    });
  }
  ngOnInit(): void {
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
  detailProduct(product) {
    this.selected = product;
    console.log(this.selected);
  }
  
  getProducts() {
    this.productService.getProducts().subscribe(data => {
      // console.log(data);
      this.products=data;
    })
  }
}
