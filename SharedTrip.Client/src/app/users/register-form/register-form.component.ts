import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm:FormGroup;
  constructor( private fb: FormBuilder, private auth:AuthService, private router:Router) {
    this.registerForm=this.fb.group({
      'username':[[''], [Validators.required, Validators.minLength(6)]],
      'email':[[''], [Validators.required, Validators.email]],
      'password':[[''], [Validators.required]]
    });
   }

  ngOnInit(): void {
  }
  register(){
    this.auth.register(this.registerForm.value).subscribe(data=>{
      if(data.status=="Success"){
        this.router.navigate(['/login'])
      }
    })
  }
  get username(){
    return this.registerForm.get('username')
  }
  get password(){
    return this.registerForm.get('password')
  }
  get email(){
    return this.registerForm.get('email')
  }
}
