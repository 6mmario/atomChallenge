import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailModel } from '../models/EmailModel';
import { environment } from '../environments/environment';
import { GenericResponse } from '../models/authResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  register(email: string): Observable<GenericResponse<EmailModel>> {
    const url = `${this.baseUrl}users`;
    const body: EmailModel = { email };
    return this.http.post<GenericResponse<EmailModel>>(url, body);
  }
}
