import { Component, Input, OnChanges } from '@angular/core';
import { EmailComplete } from '../email-complete';
import { AuthService } from 'src/app/auth/auth.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent implements OnChanges {
  modal = false;
  @Input() email: EmailComplete;

  constructor(private emailService: EmailService) {}

  ngOnChanges(): void {
    this.email = {
      ...this.email,
      to: `${this.email.from}`,
      subject: `RE: ${this.email.subject}`,
      from: `${this.email.to}`,
      text: `\n\n\n-------${this.email.from} wrote:\n> ${this.email.text.replace(/\n/gi, '\n>')}`
    };
  }

  toggleModal() {
    this.modal = !this.modal;
  }

  onSubmit(email: EmailComplete) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.toggleModal();
    });
  }
}
