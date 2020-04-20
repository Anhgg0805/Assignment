import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {AboutComponent} from './about/about.component';
import {ServiceComponent} from './service/service.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductManagerComponent} from './admin/product-manager/product-manager.component';
import {ProductEditComponent} from './admin/product-edit/product-edit.component';
import {NotFoundComponent} from './not-found/not-found.component';
import { IndexAdminComponent } from './admin/index-admin/index-admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductAddComponent } from './admin/product-add/product-add.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "service", component: ServiceComponent },
  { path: 'product/:id', component: ProductDetailComponent},
  {path :'admin',component:IndexAdminComponent,
     children: [
        { path: "", redirectTo: "dashboard", pathMatch: "full" },
        { path: 'dashboard', component:DashboardComponent},
        { path: 'product-manager', component: ProductManagerComponent },
        { path: 'product/:id', component: ProductDetailComponent},
        { path: 'product/edit/:id', component: ProductEditComponent},
        {path :'addProduct',component:ProductAddComponent},
      ]
  },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "/404" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
