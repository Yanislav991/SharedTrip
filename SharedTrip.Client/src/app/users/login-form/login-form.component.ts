import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm:FormGroup;
  constructor( private fb: FormBuilder,private shared:SharedService, private auth:AuthService, private router:Router) {
    this.loginForm=this.fb.group({
      'username':[[''], [Validators.required]],
      'password':[[''], [Validators.required, Validators.minLength(6)]]
    });
   }

  ngOnInit(): void {
  }
  login(){
    if(!this.loginForm.valid){
      this.shared.fireValidation(this.loginForm);
      return
    }
    this.auth.login(this.loginForm.value).subscribe(data=>{
      this.auth.saveToken(data.token)
      this.router.navigate(['/trips/all'])
    })
  }
  
  get username(){
    return this.loginForm.get('username')
  }
  get password(){
    return this.loginForm.get('password')
  }
}
