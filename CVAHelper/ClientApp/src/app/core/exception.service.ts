import { ErrorHandler } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import Swal from 'sweetalert2';

export class ExceptionService implements ErrorHandler {
  constructor() { }

  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      Swal("Oops!", error.message, "error");
    } else {
    }
  }
}
