import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  isLoading:boolean = false;
  id:string = ""

  constructor(private _cart:CartService){}
  
  paymentForm:FormGroup = new FormGroup({
    details:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required]),
    city:new FormControl(null,[Validators.required]),
  })
  
  ngOnInit(): void {
    console.log("1");
    
    this._cart.getLoggedUserCart().subscribe({
      next:(response)=>{
        console.log("2");
        this.id = response.data._id;
        console.log(this.id);
      }
    })    
  }
  
  onlinePayment(payment:FormGroup){
    console.log("3");
    this.isLoading = true;  
    this._cart.handlePayment(payment.value,this.id).subscribe({
      next:(response)=>{
        console.log("4");
        if(response.status = "success"){
          console.log("5");
          this.navigateToPage(response.session.url)
        }
        this.isLoading = false
      },
      error:(err)=>{
        console.log(err)
        this.isLoading = false
      }
    })
  }
  
  navigateToPage(url:string){
    console.log("6");
    window.location.href = url
  }

}
