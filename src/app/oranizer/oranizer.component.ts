import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService, Task } from '../shared/task.service';
import { DateService } from '../shared/date.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-oranizer',
  templateUrl: './oranizer.component.html',
  styleUrls: ['./oranizer.component.scss'],
})
export class OranizerComponent implements OnInit {
  form!: FormGroup;
  tasks: Task[] = [];

  constructor(
    public dateService: DateService,
    public taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.dateService.date
      .pipe(switchMap((value) => this.taskService.load(value)))
      .subscribe((tasks) => {
        this.tasks = tasks;
      });

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }

  submit() {
    const { title } = this.form.value;

    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
    };

    this.taskService.create(task).subscribe(
      (task: Task) => {
        this.tasks.push(task);
        this.form.reset();
      },
      (error) => console.error(error)
    );
  }

  remove(task: Task) {
    this.taskService.remove(task).subscribe(
      () => {
         this.tasks = this.tasks.filter(t => {
          return t.id !== task.id
         })
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
