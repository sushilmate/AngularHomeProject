import { ErrorHandler } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import swal from "sweetalert";

export class ExceptionService implements ErrorHandler {
  constructor() { }

  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      swal("Oops!", error.message, "error");
    } else {
    }
  }
}
