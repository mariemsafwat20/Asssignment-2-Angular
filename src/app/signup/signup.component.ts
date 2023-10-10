import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  errMessage:string = '';
  isLoading:boolean = false;

  constructor(private _Auth:AuthService){}

  registerForm:FormGroup = new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required]),
    repassword:new FormControl(null,[Validators.required]),
    // password:new FormControl(null,[Validators.required,Validators.pattern('/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/')]),
    // repassword:new FormControl(null,[Validators.required,Validators.pattern('/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/')]),
    phone:new FormControl(null,[Validators.required,Validators.pattern('^01[0125][0-9]{8}')]),
  },{validators:this.RePasswordMatch})

  register(formData:FormGroup){
    this.isLoading = true;  
    console.log(this.registerForm.value);
    this._Auth.signup(this.registerForm.value).subscribe({
      next:(response)=>{
        console.log(response); 
        this.isLoading = false
        console.log(this.isLoading); 
      },
      error:(err)=>{
        this.errMessage = err.error;
        console.log(this.errMessage)
        this.isLoading = false
      }
    })
  }

  RePasswordMatch(formData:any){
    let password = formData.get('password');
    let rePassword = formData.get('repassword');

    if(password.value === rePassword.value){
      return null;
    }else{
      rePassword.setErrors({rePasswordMatch:'RePassowrd not match'})
      return{rePasswordMatch:'RePassowrd not match'}
    }

  }
}
