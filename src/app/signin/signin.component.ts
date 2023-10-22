import { Component, resolveForwardRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
    errMessage:string = '';
    isLoading:boolean = false;

    constructor(private _Auth:AuthService,  private _Router:Router){}
  
    loginForm:FormGroup = new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required]),
      // password:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][a-z][0-9]{4,8}')]),
    })
  
    signin(formData:FormGroup){
      this.isLoading = true;  
      this._Auth.login(formData.value).subscribe({
        next:(response)=>{
          if(response.message == 'success'){
              localStorage.setItem('userToken',response.token);
              this._Auth.decodedUserToken();
              this._Router.navigate(['/home']);
          }
          this.isLoading = false
        },
        error:(err)=>{
          this.errMessage = err.error.message;
          this.isLoading = false
        }
      })
    }
  }
