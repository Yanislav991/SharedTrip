import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm:FormGroup;
  constructor( private fb: FormBuilder, private auth:AuthService) {
    this.registerForm=this.fb.group({
      'username':[[''], [Validators.required]],
      'email':[[''], [Validators.required]],
      'password':[[''], [Validators.required]]
    });
   }

  ngOnInit(): void {
  }
  register(){
    this.auth.register(this.registerForm.value).subscribe(data=>{
      console.log(data)
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
