import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  public date: BehaviorSubject<any> = new BehaviorSubject(moment());
  public typeChange = 'month';

  changeCalendarType(dir: number): void {
    const value = this.date.value.add(dir, this.typeChange);
    this.date.next(value);
  }

  dateSwitch(type: string): void {
    this.typeChange = type;
  }

  changeDate(date: moment.Moment): void {
    const value = this.date.value.set({
      date: date.date(),
      month: date.month(),
    });

    this.date.next(value);
  }
}
