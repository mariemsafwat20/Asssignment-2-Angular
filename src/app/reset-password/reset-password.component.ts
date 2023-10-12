import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  isLoading:boolean = false;
  errorResetPassword:string = ''

  constructor(private _Auth:AuthService,  private _Router:Router){}
  
  resetForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required]),
    // password:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][a-z][0-9]{4,8}')]),
  })

  resetPassword(resetForm:FormGroup){
    this.isLoading = true;  
    console.log(resetForm );
    this._Auth.resetPassword(this.resetForm.value).subscribe({
      next:(response)=>{
        console.log(response);
        if(response.token){
          this._Router.navigate(['/signin'])
        }
      },
      error:(err)=>{
        console.log(err)
        this.isLoading = false
        this.errorResetPassword = err.error.message
      }
    })
  }
}
