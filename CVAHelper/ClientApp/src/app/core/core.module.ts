import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Logger } from './logger.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';

@NgModule({
  imports: [
    CommonModule // we use ngFor
  ],
  exports: [ SpinnerComponent],
  declarations: [ SpinnerComponent],
  providers: [Logger, SpinnerService]
})
export class CoreModule { }
