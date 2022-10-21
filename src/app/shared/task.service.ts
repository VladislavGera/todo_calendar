// https://todo-4d345-default-rtdb.europe-west1.firebasedatabase.app/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';

export interface Task {
  title: string;
  id?: string;
  date?: string;
}

interface CraeteResponse {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  static url =
    'https://todo-4d345-default-rtdb.europe-west1.firebasedatabase.app/tasks';

  constructor(private http: HttpClient) {}

  load(date: moment.Moment): Observable<any> {
    return this.http
      .get<Task[]>(`${TaskService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(
        map((tasks) => {
          if (!tasks) {
            return [];
          }

          return Object.keys(tasks).map((key: any) => {
            return {
              ...tasks[key],
              id: key,
            };
          });
        })
      );
  }

  create(task: Task): Observable<Task> {
    return this.http
      .post<CraeteResponse>(`${TaskService.url}/${task.date}.json`, task)
      .pipe(
        map((res) => {
          return { ...task, id: res.name };
        })
      );
  }

  remove(task: Task): Observable<any> {
     return this.http.delete<void>(`${TaskService.url}/${task.date}/${task.id}.json`)
  }
}
