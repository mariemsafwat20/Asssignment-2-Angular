import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  catData:any[] = [];
  prodData:any[] = [];
  brandData:any[] = [];
  searchValue:string = ''

  constructor(private _DataService:DataService,private _CartService:CartService) {
  }
  
  ngOnInit(): void {
    this.getCat()
    this.getProd()
    this.getBrand()  
  }

  getCat(){
    return this._DataService.getData(`categories`).subscribe((response) => {
      this.catData = response.data;
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    autoplay:true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
  
  getProd(){
    return this._DataService.getData(`products`).subscribe((response) => {
      this.prodData = response.data;
    })
  }
  
  getBrand(){
    return this._DataService.getData(`brands`).subscribe((response) => {
      this.brandData = response.data.slice(8, 12);
    })
  }

  addToCart(productId:string){
    this._CartService.addToCart(productId).subscribe({
      next:(Response)=>{
        console.log(Response);
        if(Response.status == "success"){
          this._CartService.numOfCartItem.next(Response.numOfCartItems);

          Swal.fire({
            icon: 'success',
            title: 'Donee...',
            text: Response.message
          })
        } 
      },
      error:(err)=>{
        if(err.status == 500){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.statusMsg,
          })
        } 
      }
    })
  }
}
