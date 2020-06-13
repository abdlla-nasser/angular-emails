import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css']
})
export class EmailIndexComponent implements OnInit {
  emails = null;
  constructor(private email: EmailService) { }

  ngOnInit(): void {
    this.email.getEmails().subscribe((value) => {
      this.emails = value;
    });
  }

}
