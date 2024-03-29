import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import {HomeComponent} from './website/pages/home/home.component';
import {NotFoundComponent} from './website/pages/not-found/not-found.component';
import {CategoryComponent} from './website/pages/category/category.component';
import {MycartComponent} from './website/pages/mycart/mycart.component';
import {LoginComponent} from './website/pages/login/login.component';
import {RegisterComponent} from './website/pages/register/register.component';
import {RecoveryComponent} from './website/pages/recovery/recovery.component';
import {ProfileComponent} from './website/pages/profile/profile.component';
import {ProductDetailComponent} from "./website/pages/product-detail/product-detail.component";
import {LayoutComponent} from "./website/components/layout/layout.component";
import {CustomPreloadService} from "./services/custom-preload.service";
import {AdminGuard} from "./guards/admin.guard";
// import {QuicklinkStrategy} from "ngx-quicklink";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule)
  },
  {
    path: 'cms',
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule),
    canActivate: [AdminGuard]
    // data: {
    //   preload: true
    // }
  },
  {
    path: '**',
    component: NotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: CustomPreloadService
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
