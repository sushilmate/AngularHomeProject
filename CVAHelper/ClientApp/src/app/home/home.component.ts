import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from "ag-grid-angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public rowData: any;
  @ViewChild("agGrid") agGrid: AgGridNg2;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    //http.get<WeatherForecast[]>(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
    //  this.rowData = result;
    //}, error => console.error(error));
    this.rowData = http.get(baseUrl + 'api/GidGsrMapping/GetGidGsrMapping');
  }

  columnDefs = [
    { headerName: 'Id', field: 'id', checkboxSelection: true },
    { headerName: 'GSR', field: 'gsr' },
    { headerName: 'GID', field: 'gid' }
  ];

  defaultColDef = {
      editable : true
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.Gsr + ' ' + node.Gid).join(', ');
    alert(selectedDataStringPresentation);
  }
}
