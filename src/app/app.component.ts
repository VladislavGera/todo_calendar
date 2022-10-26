import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    let isLocalStorage = localStorage.getItem('taskList');

    if (!isLocalStorage) {
      localStorage.setItem('taskList', JSON.stringify([]));
    }
  }
}
