import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import * as moment from 'moment';
import { DateService } from '../../shared/services/date.service';

interface Day {
  value: moment.Moment ;
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

interface Week {
  days: Day[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  constructor(private dateService: DateService) {}

  public calendar!: Week[];
  public calendarType!: string | any ;

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generate.bind(this));
  }

  ngOnDestroy(): void {
    this.dateService.date.unsubscribe();
  }

  public generate(now: moment.Moment): void {
    this.calendarType = this.dateService.typeChange;

    const startDay = now.clone().startOf(this.calendarType).startOf('week');
    const endDay = now.clone().endOf(this.calendarType).endOf('week');

    const date = startDay.clone().subtract(1, 'day');

    const calendar = [];

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');

            return {
              value,
              active,
              disabled,
              selected,
            };
          }),
      });
    }
    this.calendar = calendar;
  }

  public select(day: moment.Moment): void {
    this.dateService.changeDate(day);
  }
}
