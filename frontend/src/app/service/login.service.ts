import { Injectable } from '@angular/core';
import { GenericResponse } from '../models/authResponse';
import { EmailModel } from '../models/EmailModel';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  login(mail: string): Observable<GenericResponse<EmailModel>> {
    const url = `${this.baseUrl}users/${(mail)}`;
    return this.http.post<GenericResponse<EmailModel>>(url, {});
  }
}
