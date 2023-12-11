import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MycartComponent } from './mycart/mycart.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { authguardGuard } from './authguard.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {path:'', redirectTo:'signin', pathMatch:'full'},
  {path:'signin', component:SigninComponent},
  {path:'signup', component:SignupComponent},
  {path:'forgotPassword', component:ForgotPasswordComponent},
  {path:'resetPassword',component:ResetPasswordComponent},
  {path:'home', canActivate:[authguardGuard], component:HomeComponent},
  {path:'details/:id', canActivate:[authguardGuard], component:ProductDetailsComponent},
  {path:'mycart', canActivate:[authguardGuard], component:MycartComponent},
  {path:'checkout', canActivate:[authguardGuard], component:CheckoutComponent},
  {path:'changePassword', loadChildren:()=>{
    return import('./settings/settings.module').then((m)=>{
      return m.SettingsModule
    })
  }},
  // StandAlone Component with lazy loading
  {path:'category',canActivate:[authguardGuard],loadComponent:()=>import('./categories/categories.component').then((c)=>c.CategoriesComponent)},
  {path:'brands',canActivate:[authguardGuard],loadComponent:()=>import('./brands/brands.component').then((c)=>c.BrandsComponent)},
  {path:'products',canActivate:[authguardGuard],loadComponent:()=>import('./products/products.component').then((c)=>c.ProductsComponent)},
  {path:'profile',canActivate:[authguardGuard],loadComponent:()=>import('./profile/profile.component').then((c)=>c.ProfileComponent)},
  {path:'wishlist',canActivate:[authguardGuard],loadComponent:()=>import('./wishlist/wishlist.component').then((c)=>c.WishlistComponent)},
  {path:'**', component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
