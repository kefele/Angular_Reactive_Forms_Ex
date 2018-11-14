import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, } from "@angular/forms";

import { Customer } from './customer';

function ratingRange(min: number, max: number): ValidatorFn{
  return (c: AbstractControl): { [key: string]: boolean } | null => {
  if (c.value !==null && (isNaN(c.value) || c.value <min || c.value > max)){
    return { 'range': true};
  }
  return null;
  } 
}
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
    
      emailGroup: this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          confirmEmail: ['', [Validators.required],
      }),
      
      phone:'',
      notification: 'email',
      rating: [null, ratingRange(1,5)],
      sendCatalog: true
    })
    // this.customerForm = new FormGroup({
    //   firstName: new FormControl(),
    //   lastName: new FormControl(),
    //   email: new FormControl(),
    //   sendCatalog: new FormControl(true)
    // });
  }

  populateTestData(): void{
    // this.customerForm.setValue
    this.customerForm.patchValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      email: 'jackh@torchwood.com',
      rating: null,
      sendCatalog: false
    });
  }

  save() {
    console.log(this.customerForm.value);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }
setNotification(notifyVia: string): void{
  const phoneControl = this.customerForm.get('phone');
  if (notifyVia === 'text'){
    phoneControl.setValidators(Validators.required);
  }
  else{
    phoneControl.clearValidators();
  }
  phoneControl.updateValueAndValidity();

}

}
