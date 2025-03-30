import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { TaskModel } from '../models/TaskModel';
import { GenericResponse } from '../models/authResponse';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTasks(mail: string): Observable<GenericResponse<TaskModel[]>> {
    const url = `${this.baseUrl}tasks`;
    const headers = { email: mail };
    return this.http.get<GenericResponse<TaskModel[]>>(url, { headers });
  }

  createTask(task: TaskModel): Observable<GenericResponse<TaskModel>> {
    const url = `${this.baseUrl}tasks`;
    return this.http.post<GenericResponse<TaskModel>>(url, task);
  }

  updateTask(id: string, task: Partial<TaskModel>): Observable<GenericResponse<TaskModel>> {
    const url = `${this.baseUrl}tasks/${id}`;
    return this.http.put<GenericResponse<TaskModel>>(url, task);
  }

  deleteTask(id: string): Observable<GenericResponse<null>> {
    const url = `${this.baseUrl}tasks/${id}`;
    return this.http.delete<GenericResponse<null>>(url);
  }
}
