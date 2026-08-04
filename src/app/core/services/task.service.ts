import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Task, TaskInput } from '../models/task.model';

/**
 * Cliente CRUD REST convencional contra la API de tareas del backend propio.
 *   GET    /tasks
 *   POST   /tasks
 *   PATCH  /tasks/{id}
 *   DELETE /tasks/{id}
 */
@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly baseUrl = `${environment.apiUrl}/${environment.resource}`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  create(input: TaskInput): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, input);
  }

  update(id: number, input: TaskInput): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/${id}`, input);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
