import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLogin:boolean = false;
  numOfCart:number = 0

  constructor(private _Auth:AuthService, private _cart:CartService){
    _cart.numOfCartItem.subscribe({
      next:(response)=>{
        this.numOfCart = response
      }
    })
    
    _Auth.userData.subscribe({
      next:()=>{
        if(_Auth.userData.getValue() != null){
          this.isLogin = true
        }else{
          this.isLogin = false
        }
      }
    })
  }

  logOut(){
    this._Auth.logout();
  }

}
