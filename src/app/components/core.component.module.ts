import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';
import { SelectorComponent } from './selector/selector.component';
import { OranizerComponent } from './organizer/oranizer.component';
import { MaterialExampleModule } from 'src/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [OranizerComponent, SelectorComponent, CalendarComponent],
  imports: [
    CommonModule,
    MaterialExampleModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [OranizerComponent, SelectorComponent, CalendarComponent],
  providers: [],
})
export class CoreModule {}
