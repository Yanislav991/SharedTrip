import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm:FormGroup;
  constructor( private fb: FormBuilder, private auth:AuthService) {
    this.loginForm=this.fb.group({
      'username':[[''], [Validators.required]],
      'password':[[''], [Validators.required]]
    });
   }

  ngOnInit(): void {
  }
  login(){
    this.auth.login(this.loginForm.value).subscribe(data=>{
      this.auth.saveToken(data.token)
    })
  }
  
  get username(){
    return this.loginForm.get('username')
  }
  get password(){
    return this.loginForm.get('password')
  }
}
