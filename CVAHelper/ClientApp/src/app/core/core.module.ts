import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Logger } from './logger.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { ExceptionService } from './exception.service';

@NgModule({
  imports: [
    CommonModule // we use ngFor
  ],
  exports: [SpinnerComponent],
  declarations: [SpinnerComponent],
  providers: [Logger, SpinnerService, { provide: ErrorHandler, useClass: ExceptionService }]
})
export class CoreModule { }
