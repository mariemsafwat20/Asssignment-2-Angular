import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

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
        console.log(response.data);
        this.cartDetails = response.data      
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
