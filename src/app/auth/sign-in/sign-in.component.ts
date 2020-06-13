import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  error = '';
  errorState = false;
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
  });
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  showErrors(error: { username: string, password: string}) {
    this.errorState = true;
    this.error = error.username + ' please sign up';
  }
  onSubmit() {
    if (this.authForm.invalid) { return; }
    this.authService.signin(this.authForm.value).subscribe({
      next: () => {
        this.errorState = false;
        setTimeout(() => {
          this.router.navigateByUrl('/inbox');
        }, 1000);
      },
      error: (err) => {
        this.showErrors(err.error);
      }
    });
  }

}
