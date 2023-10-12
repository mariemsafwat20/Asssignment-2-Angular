import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { BrandsComponent } from './brands/brands.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MycartComponent } from './mycart/mycart.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { authguardGuard } from './authguard.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {path:'', redirectTo:'signin', pathMatch:'full'},
  {path:'signin', component:SigninComponent},
  {path:'signup', component:SignupComponent},
  {path:'forgotPassword', component:ForgotPasswordComponent},
  {path:'home', canActivate:[authguardGuard], component:HomeComponent},
  {path:'category', canActivate:[authguardGuard], component:CategoriesComponent},
  {path:'products', canActivate:[authguardGuard], component:ProductsComponent},
  {path:'details/:id', canActivate:[authguardGuard], component:ProductDetailsComponent},
  {path:'brands', canActivate:[authguardGuard], component:BrandsComponent},
  {path:'profile', canActivate:[authguardGuard], component:ProfileComponent},
  {path:'wishlist', canActivate:[authguardGuard], component:WishlistComponent},
  {path:'mycart', canActivate:[authguardGuard], component:MycartComponent},
  {path:'**', component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
