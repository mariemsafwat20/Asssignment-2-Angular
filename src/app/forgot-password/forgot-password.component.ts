import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  successMessage:string = ''
  errorMessage:string = ''

  constructor(private _Auth:AuthService){}

  forgotForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })

  forgotPassword(forgotForm:FormGroup){
    this._Auth.forgetPassword(this.forgotForm.value).subscribe({
      next:(response)=>{
        this.successMessage = response.message
        this.errorMessage = ''
      },
      error:(err)=>{
        this.successMessage = ''
        this.errorMessage = err.error.message
      }
    })
  }


}