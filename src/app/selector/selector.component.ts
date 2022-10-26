import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DateService } from '../shared/date.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorComponent {
  constructor(public dateService: DateService) {}

  public go(dir: number) {
    this.dateService.changeMonth(dir);
  }
}
