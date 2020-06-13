import { Component, OnInit } from '@angular/core';
import { EmailComplete } from '../email-complete';
import { AuthService } from '../../auth/auth.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
  modal = false;
  email: EmailComplete;

  constructor(
    private authService: AuthService,
    private emailService: EmailService
  ) {
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${authService.username}@angular-emails.com`,
    };
  }

  ngOnInit(): void {
  }

  toggleModal() {
    this.modal = !this.modal;
  }

  onSubmit(email: EmailComplete) {
    this.emailService.sendEmail(email).subscribe((res) => {
      this.toggleModal();
    });
  }

}
