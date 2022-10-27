import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService, Task } from '../../shared/services/task.service';
import { DateService } from '../../shared/services/date.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
})
export class OranizerComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public date!: string;
  public tasks: Task[] = [];
  public taskId!: string | undefined;
  public isEdit: boolean = false;

  constructor(
    public dateService: DateService,
    public taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.dateService.date.subscribe(() => {
      this.tasks = this.taskService.load(
        this.dateService.date.value.format('YYYY-MM-DD')
      );
    });

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      startDay: new FormControl('', Validators.required),
      endDay: new FormControl('', Validators.required),
      isCelebrity: new FormControl(false),
    });
  }

  ngOnDestroy(): void {
    this.dateService.date.unsubscribe();
  }

  public changeClass(type: string): string {
    return this.dateService.typeChange == type ? 'type-active' : 'type';
  }

  public changeType(type: string): void {
    this.dateService.dateSwitch(type);
    const day = this.dateService.date.value;
    this.dateService.changeDate(day);
  }

  public submit(): void {
    const { title, startDay, endDay, isCelebrity } = this.form.value;

    const date = this.dateService.date.value.format('YYYY-MM-DD');

    const task: Task = {
      title,
      date,
      id: uuidv4(),
      startDay,
      endDay,
      isCelebrity,
    };

    this.taskService.create(task);
    if (date >= startDay && date <= endDay) {
      this.tasks.push(task);
    }

    this.form.reset();
  }

  public remove(task: Task): Task | void {
    this.taskService.remove(task);

    this.tasks = this.tasks.filter((t) => {
      return t.id !== task.id;
    });
  }

  public getEditFild(task: Task): void {
    this.isEdit = true;

    this.taskId = task.id;

    this.form = new FormGroup({
      title: new FormControl(task.title, Validators.required),
      startDay: new FormControl(task.startDay, Validators.required),
      endDay: new FormControl(task.endDay, Validators.required),
      isCelebrity: new FormControl(task.isCelebrity),
    });
  }

  public edit(): void {
    const { title, startDay, endDay, isCelebrity } = this.form.value;

    const date = this.dateService.date.value.format('YYYY-MM-DD');

    const task: Task = {
      title,
      date,
      id: this.taskId,
      startDay,
      endDay,
      isCelebrity,
    };

    this.tasks = this.tasks.map((item) => {
      return item.id == this.taskId ? task : item;
    });

    this.taskService.edit(task);

    this.form.reset();
    this.isEdit = false;
  }
}
