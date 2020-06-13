import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailComplete } from '../email-complete';
// import { EmailService } from '../email.service';
// import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  email: EmailComplete;

  constructor(
    private route: ActivatedRoute
  ) {
    // here we are guranteed that we will have a value because this component will not be
    // rendered until the resolver is done and we have an email property
    // but we still have no reactivity
    // this.email = this.route.snapshot.data.email;
    // here same but we have observables and thus we have reactivity
    this.route.data.subscribe(({ email }) => {
      this.email = email;
    });
  }

  ngOnInit(): void {
    // this.route.params.subscribe(({ id }) => {
    //   this.emailService.getEmail(id).subscribe((email) => {
    //     this.email = email;
    //   });
    // });
    // #334 using a resolver instead of this ⤵
    // this.route.params.pipe(
    //   switchMap(({ id }) => {
    //     return this.emailService.getEmail(id);
    //   })
    // ).subscribe((email) => {
    //   this.email = email;
    // });
  }

}
