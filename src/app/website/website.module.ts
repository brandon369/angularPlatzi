import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';

import {TodoComponent} from "./components/todo/todo.component";
import {NavComponent} from "./components/nav/nav.component";
import {HomeComponent} from "./pages/home/home.component";
import {CategoryComponent} from "./pages/category/category.component";
import {MycartComponent} from "./pages/mycart/mycart.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {RecoveryComponent} from "./pages/recovery/recovery.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {ProductDetailComponent} from "./pages/product-detail/product-detail.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {SwiperModule} from "swiper/angular";
import {SharedModule} from "../shared/shared.module";
import {QuicklinkModule} from "ngx-quicklink";


@NgModule({
  declarations: [
    TodoComponent,
    NavComponent,
    HomeComponent,
    CategoryComponent,
    MycartComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SwiperModule,
    SharedModule,
    // QuicklinkModule

  ]
})
export class WebsiteModule { }
