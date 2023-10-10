import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient, private _Router:Router) {
    if(localStorage.getItem('userToken') != null){
      this.decodedUserToken();
    }
   }

  signup(formData:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,formData);
  }

  login(formData:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,formData);
  }

  decodedUserToken(){
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'))
    let decodedToken:any = jwtDecode(encodedToken);
    this.userData.next(decodedToken);
    console.log(decodedToken);
    
  }

  logout(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['./signin']);
  }
}

