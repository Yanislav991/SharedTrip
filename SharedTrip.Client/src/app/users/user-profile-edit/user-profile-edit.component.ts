import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProfile } from 'src/interfaces/IProfile';
import { SharedService } from 'src/services/shared.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit {
  private selectedFile!: File;
  public editUserForm!: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder, private shared: SharedService, private router: Router) {
    this.editUserForm = this.fb.group({
      'email': [[''], [Validators.required, Validators.email]],
      'phoneNumber': [['']],
      'image': [['']]
    });
  }

  @Input() profile!: IProfile
  ngOnInit(): void {

    this.editUserForm.patchValue({
      email: this.profile.email,
      phoneNumber: this.profile.phoneNumber,
      image: this.profile.avatarUrl
    });
  }
  submit() {
    if (!this.editUserForm.valid) {
      this.shared.fireValidation(this.editUserForm);
      return;
    }
    this.userService.updateUser(this.editUserForm.value).subscribe({
      next: (v) => alert(v.message),
      error: (err) => {
        var errorMessages = err.error.errors;
        for (const message in errorMessages) {
          alert(errorMessages[message][0])
        }
      },
      complete: () => {
        this.router.navigate(['/trips/all'])
      }
    });
  }

  get phoneNumber() {
    return this.editUserForm.get('phoneNumber')
  }
  get email() {
    return this.editUserForm.get('email')
  }

}
