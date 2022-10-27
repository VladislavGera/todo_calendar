import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MomentPipe } from './pipes/moment.pipe';

@NgModule({
  declarations: [MomentPipe],
  imports: [CommonModule],
  exports: [MomentPipe],
  providers: [],
})
export class SharedModule {}
