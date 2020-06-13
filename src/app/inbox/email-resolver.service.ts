import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EmailComplete } from './email-complete';
import { EmailService } from './email.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<EmailComplete> {

  constructor(
    private emailService: EmailService,
    private router: Router
  ) { }
  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;
    return this.emailService.getEmail(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found');
        return EMPTY;
      })
    );
  }
  // resolve() {
  //   return {
  //     id: 'ladkjfbhjdkfl',
  //     subject: 'dfdkbjfdfas',
  //     to: 'asfdgghgfdfs',
  //     from: 'asfdghgfhd',
  //     html: 'sfdfhghfgfds',
  //     text: 'safdsghjmhghfdg'
  //   };
  // }
}
