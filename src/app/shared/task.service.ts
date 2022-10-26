import { Injectable } from '@angular/core';
import * as moment from 'moment';

export interface Task {
  title: string;
  id?: string;
  date?: string;
  startDay: string;
  endDay: string;
  isCelebrity: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  getStorageList() {
    let list: any = localStorage.getItem('taskList');
    return JSON.parse(list);
  }

  load(date: moment.Moment) {
    let list = this.getStorageList();

    let getList = list.filter((t: any) => {
      return date >= t.startDay && date <= t.endDay;
    });

    return getList;
  }

  create(task: Task) {
    let list = this.getStorageList();

    localStorage.setItem('taskList', JSON.stringify([...list, task]));
  }

  remove(task: Task) {
    let list = this.getStorageList();

    let newList = list.filter((t: Task) => {
      return t.id !== task.id;
    });

    localStorage.setItem('taskList', JSON.stringify(newList));
  }

  edit(task: Task) {
    let list = this.getStorageList();

    const newList = list.map((item: Task) => {
      return item.id == task.id ? task : item;
    });

    localStorage.setItem('taskList', JSON.stringify(newList));
  }
}
