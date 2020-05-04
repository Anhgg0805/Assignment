import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './product.service';
import { AppComponent } from './app.component';
import { SlidesComponent } from './slides/slides.component';
import { ServiceComponent } from './service/service.component';
import { AboutComponent } from './about/about.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductManagerComponent } from './admin/product-manager/product-manager.component';
import { ProductEditComponent } from './admin/product-edit/product-edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { IndexAdminComponent } from './admin/index-admin/index-admin.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ProductAddComponent } from './admin/product-add/product-add.component';
import { BannerComponent } from './banner/banner.component';
@NgModule({
  declarations: [
    AppComponent,
    SlidesComponent,
    ServiceComponent,
    AboutComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductManagerComponent,
    ProductEditComponent,
    NotFoundComponent,
    IndexAdminComponent,
    HomeComponent,
    FooterComponent,
    ProductAddComponent,
    BannerComponent,
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
