import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailComplete } from './email-complete';

interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  url = 'https://api.angular-email.com/emails';
  constructor(private http: HttpClient) { }
  getEmails() {
    return this.http.get<EmailSummary[]>(`${this.url}`);
  }
  getEmail(id: string) {
    return this.http.get<EmailComplete>(`${this.url}/${id}`);
  }
  sendEmail(email: EmailComplete) {
    return this.http.post(`${this.url}`, email);
  }
}
