import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ImgComponent} from './components/img/img.component';
import {TodoComponent} from "./components/todo/todo.component";
import {FormsModule} from "@angular/forms";
import {ProductComponent} from './components/product/product.component';
import {ProductsComponent} from "./components/products/products.component";
import {NavComponent} from './components/nav/nav.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {ReversePipe} from './pipes/reverse.pipe';
import {TimeAgoPipe} from './pipes/time-ago.pipe';
import {HighlightDirective} from './directives/highlight.directive';
import {SwiperModule} from "swiper/angular";
import {TimeInterceptor} from "./interceptors/time.interceptor";
import {TokenInterceptor} from "./interceptors/token.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    ImgComponent,
    TodoComponent,
    ProductComponent,
    ProductsComponent,
    NavComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SwiperModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
