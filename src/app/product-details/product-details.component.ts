import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import Swal from 'sweetalert2';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  productId:any;
  productDetails:any;

  constructor(private _Activated:ActivatedRoute, private _DataServices:DataService,private _CartService:CartService){
    this._Activated.paramMap.subscribe((param)=>{
      this.productId = param.get('id');
    })

  }
  
  ngOnInit(): void {
    this.getDetails();      
  }

  getDetails(){
    this._DataServices.getProductDetails(this.productId).subscribe((response)=>{
      this.productDetails = response.data;
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
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
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  addToCart(productId:string){
    this._CartService.addToCart(productId).subscribe({
      next:(response)=>{
        if(response.status == "success"){
          Swal.fire({
            icon: 'success',
            title: 'Donee...',
            text: response.message
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
