import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridNg2 } from "ag-grid-angular";
import { GidGsrMappingViewModel } from '../../common/types';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public rowData: GidGsrMappingViewModel[];
  @ViewChild("agGrid") agGrid: AgGridNg2;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<GidGsrMappingViewModel[]>(baseUrl + 'api/GidGsrMapping/GetGidGsrMapping').subscribe(result => {
      this.rowData = result;
    }, error => console.error(error));
  }

  columnDefs = [
    { headerName: 'Id', field: 'id', checkboxSelection: true },
    { headerName: 'GSR', field: 'gsr' },
    { headerName: 'GID', field: 'gid' }
  ];

  defaultColDef = {
    editable: true
  }
  getSelectedRows(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    //const selectedDataStringPresentation = selectedData.map(node => node.gsr + ' ' + node.gid).join(', ');
    //alert(selectedDataStringPresentation);

    http.post(baseUrl + 'api/GidGsrMapping/UpdateGidGsrMappings', selectedData, httpOptions).subscribe(result => {
      console.log(result);
    }, error => console.log('There was an error: '));
  }
}
