import { AsyncValidator, FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator{
  constructor(private authService: AuthService) {}
  validate = (control: FormControl) => {
    const { value } = control;
    return this.authService.userNameAvailabe(value)
      .pipe(
        map(() => null),
        catchError(({ error }) => {
          if (error.username) {
            return of({ nonUniqueName: true });
          } else {
            return of({ noConnection: true });
          }
        }),
      );
  }

}
