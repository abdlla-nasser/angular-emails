import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { error } from 'protractor';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() type: string;
  @Input() control: FormControl;
  @Input() controlType = 'input';
  error: any;
  constructor() { }

  ngOnInit(): void {
  }
  showErrors() {
    const { dirty, touched, errors } = this.control;
    if (dirty && touched && errors) {
      if (errors.required) {
        this.error = 'Value Is Required';
      }
      if (errors.minlength) {
        this.error = `Value must be longer than ${errors.minlength.requiredLength}`;
      }
      if (errors.maxlength) {
        this.error = `Value must be shorted than ${errors.maxlength.requiredLength}`;
      }
      if (errors.pattern) {
        this.error = 'Invalid Format ';
      }
      if (errors.nonUniqueName) {
        this.error = 'username is taken';
      }
      if (errors.noConnection) {
        this.error = 'please check your connection';
      }
      if (errors.email) {
        this.error = 'Enter a valid email';
      }
      return true;
    } else {
      return false;
    }
  }
}
