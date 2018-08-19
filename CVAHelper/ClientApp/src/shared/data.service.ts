import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

import { GidGsrMappingModel } from "./gidgsrmap.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {
  private http: HttpClient;
  private baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'api/GidGsrMapping/';
  }

  getGidGsrMapping(): Observable<GidGsrMappingModel[]> {
    return this.http.get<GidGsrMappingModel[]>(this.baseUrl + 'GetGidGsrMapping').pipe(
      catchError(this.handleError("getMapping")));
  }

  updateGidGsrMappings(gidgsrMappings: GidGsrMappingModel[]) {
    return this.http.post(this.baseUrl + 'UpdateGidGsrMappings', gidgsrMappings, httpOptions).pipe(
      catchError(this.handleError("updateGidGsrMappings")));
  }

  public deleteGidGsrMappings(gidGsrMappinngIds: number[]) {
    alert(gidGsrMappinngIds);
    this.http.delete(this.baseUrl + "DeleteGidGsrMappings/" + gidGsrMappinngIds, httpOptions).subscribe(result => {
      alert(result);
    });
  }

  private handleError(operation: String) {
    return (err: any) => {
      let errMsg = 'error in ' + operation + 'retrieving ' + this.baseUrl;
      console.log(errMsg, err);
      if (err instanceof HttpErrorResponse) {
        console.log('status: ' + err.status + ', ' + err.statusText);
      }
      else {
        console.log(err);
      }
      return Observable.throw(errMsg);
    }
  }
}
