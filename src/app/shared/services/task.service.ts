import { Injectable } from '@angular/core';
import * as moment from 'moment';

export interface Task {
  title: string;
  id?: string;
  date?: string;
  startDay: moment.Moment | string;
  endDay: moment.Moment | string;
  isCelebrity: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  getStorageList(): Task[] {
    const list: string | null = localStorage.getItem('taskList') as string;
    return JSON.parse(list);
  }

  load(date: moment.Moment): Task[] {
    const list = this.getStorageList();

    const getList = list.filter((t: Task) => {
      return date >= t.startDay && date <= t.endDay;
    });

    return getList;
  }

  create(task: Task): void {
    const list = this.getStorageList();

    localStorage.setItem('taskList', JSON.stringify([...list, task]));
  }

  remove(task: Task): void {
    const list = this.getStorageList();

    const newList = list.filter((t: Task) => {
      return t.id !== task.id;
    });

    localStorage.setItem('taskList', JSON.stringify(newList));
  }

  edit(task: Task): void {
    const list = this.getStorageList();

    const newList = list.map((item: Task) => {
      return item.id == task.id ? task : item;
    });

    localStorage.setItem('taskList', JSON.stringify(newList));
  }
}
