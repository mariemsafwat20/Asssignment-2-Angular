import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { count } from 'rxjs';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements OnInit{
  cartDetails:any

  constructor(private _CartService:CartService){}
  
  ngOnInit(): void {
    this.getCart()
  }

  getCart(){
    this._CartService.getLoggedUserCart().subscribe({
      next:(response)=>{
        this.cartDetails = response.data      
      }
    })
  }
  
  removeItem(productId:string){
    console.log("response");
    this._CartService.removeCartItem(productId).subscribe({
      next:()=>{
        this.getCart()
      }
    })
  }
  
  updateCart(count:number,productId:string){
    this._CartService.updateCart(count,productId).subscribe({
      next:()=>{
        this.getCart()
      }
    })
  }

}
