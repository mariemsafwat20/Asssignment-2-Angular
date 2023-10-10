import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  catData:any[] = [];
  prodData:any[] = [];
  brandData:any[] = [];

  constructor(private _DataService:DataService) {
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
}
