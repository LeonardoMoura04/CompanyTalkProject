import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Email } from '../models/Email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  baseURL = `${environment.baseUrl}Email`;

  constructor(private http: HttpClient) { }

  enviarEmail(email: Email) {
    return this.http.post(this.baseURL, email);
  }
}
