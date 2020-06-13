import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmailComplete } from '../email-complete';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  @Input() email: EmailComplete;
  @Output() emailSubmit = new EventEmitter();
  emailForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    const { subject, from, to, text } = this.email;
    this.emailForm = new FormGroup({
      from: new FormControl({ value: from, disabled: true }),
      to: new FormControl(to, [
        Validators.required, Validators.email
      ]),
      subject: new FormControl(subject, [
        Validators.required
      ]),
      text: new FormControl(text, [
        Validators.required
      ]),
    });
  }

  onSubmit() {
    if (this.emailForm.invalid) { return; }
    this.emailSubmit.emit(this.emailForm.value);

    // console.log(this.emailForm.getRawValue());
  }

}
