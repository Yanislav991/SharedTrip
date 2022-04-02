import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  fireValidation(form: FormGroup) {
    Object.keys(form!.controls).forEach(field => { // {1}
      const control = form!.get(field);            // {2}
      control!.markAsTouched({ onlySelf: true });       // {3}
    });
  }
}
