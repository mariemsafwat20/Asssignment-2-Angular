import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl:string=`https://ecommerce.routemisr.com`;
  header:any={
    token:localStorage.getItem('userToken')
  }
  numOfCartItem = new BehaviorSubject(0);
  
  constructor(private _HttpClient:HttpClient) {
    this.getLoggedUserCart().subscribe({
      next:(response)=>{
        this.numOfCartItem.next(response.numOfCartItems)
      }
    })

  }

  addToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`,
    {
      "productId": id
    },{
      headers: this.header
    })
  }
  
  getLoggedUserCart():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`,
    {
      headers: this.header
    })
  }
  
  removeCartItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${id}`,
    {
      headers: this.header
    })
  }
  
  updateCart(count:number,id:string):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${id}`,
    {
      "count": count
    },{
      headers: this.header
    })
  }
  
  handlePayment(shippingAddress:any,id:string):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
    {
      shippingAddress: shippingAddress
    },{
      headers: this.header
    })
  }
}

