import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  successMessage:string = ''
  errorMessage:string = ''
  errorVerifyCode:string = ''

  constructor(private _Auth:AuthService, private _Router:Router){}

  forgotForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })

  forgotPassword(forgotForm:FormGroup){
    this._Auth.forgetPassword(this.forgotForm.value).subscribe({
      next:(response)=>{
        this.successMessage = response.message
        this.errorMessage = ''
        document.querySelector(".forgotPassword")?.classList.add("d-none")
        document.querySelector(".verifyCode")?.classList.remove("d-none")
      },
      error:(err)=>{
        this.successMessage = ''
        this.errorMessage = err.error.message
      }
    })
  }
  
  verifyForm:FormGroup = new FormGroup({
    resetCode:new FormControl(null,[Validators.required])
  })
  
  verifyCode(verifyCode:FormGroup){
    this._Auth.verifyCode(verifyCode.value).subscribe({
      next:(response)=>{
        if(response.status == "Success"){
          this._Router.navigate(['/resetPassword'])
        }
      },
      error:(err)=>{
        this.errorVerifyCode = err.error.message
      }
    })
  }


}