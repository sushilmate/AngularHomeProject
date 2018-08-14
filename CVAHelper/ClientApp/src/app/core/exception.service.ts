import { ErrorHandler } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

export class ExceptionService implements ErrorHandler {

  constructor() { }

  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      alert(error.message);
    } else {
    }     
  }

}
