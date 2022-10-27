import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const isTaskList: boolean = !!localStorage.getItem('taskList');

    if (!isTaskList) {
      localStorage.setItem('taskList', JSON.stringify([]));
    }
  }
}
