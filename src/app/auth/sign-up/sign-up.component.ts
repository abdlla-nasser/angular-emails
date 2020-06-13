import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  error = '';
  errorState = false;
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ], [this.uniqueUsername.validate]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
  }, { validators: [this.matchPassword.validate] });
  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router,
  ) {
    this.showErrors();
  }
  ngOnInit(): void {
  }
  showErrors() {
    const dirty = this.authForm.get('password').touched && this.authForm.get('passwordConfirmation').touched;
    const { errors } = this.authForm;
    if (errors && dirty) {
      this.errorState = true;
      if (errors.passwordsDontMatch) {
        this.error = 'Please make sure that password confirmation match password';
      }
      if (errors.noConnection) {
        this.error = 'please check your network connection';
      }
      if (errors.unknownError) {
        this.error = 'an unknown error has occured please check your connection and try again latera';
      }
    } else {
      this.errorState = false;
    }
  }
  onSubmit() {
    if (this.authForm.invalid) {
      this.errorState = true;
      this.error = 'please fill out all form fields';
    } else {
      this.errorState = false;
      this.authService.signup(this.authForm.value)
      .subscribe({
        next: (res) => {
          // Navigate to some other route
          setTimeout(() => {
            this.router.navigateByUrl('/inbox');
          }, 1000);
          console.log(res);
        },
        error: (err) => {
          if (!err.status) {
            this.authForm.setErrors({ noConnection: true });
            this.showErrors();
          } else {
            this.authForm.setErrors({ unknownError: true });
            this.showErrors();
          }
        }
      });
    }
  }
}
