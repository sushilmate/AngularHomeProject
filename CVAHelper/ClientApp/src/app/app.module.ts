import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';

import { PidPsrMapComponent } from './pidpsrmap/pidpsrmap.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    PidPsrMapComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: PidPsrMapComponent, pathMatch: 'full' }
    ]),
    AgGridModule.withComponents([]),
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
