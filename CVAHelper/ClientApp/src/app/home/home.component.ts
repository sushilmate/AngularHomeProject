import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridNg2 } from "ag-grid-angular";
import { GidGsrMappingViewModel } from '../../common/types';
import * as XLSX from 'xlsx';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  negateMe: boolean;
  http: HttpClient;
  baseUrl: string;
  public rowData: GidGsrMappingViewModel[];
  @ViewChild("agGrid") agGrid: AgGridNg2;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.negateMe = true;
    this.http.get<GidGsrMappingViewModel[]>(this.baseUrl + 'api/GidGsrMapping/GetGidGsrMapping').subscribe(result => {
      this.rowData = result;
    }, error => console.error(error));
    this.negateMe = false;
  }

  columnDefs = [
    { headerName: 'Id', field: 'id', editable: true },
    { headerName: 'GSR', field: 'gsr', editable: true },
    { headerName: 'GID', field: 'gid', editable: true }
  ];

  defaultColDef = {
    editable: true
  }

  arrayBuffer: any;
  file: File;

  incomingfile(event) {
    this.file = event.target.files[0];
  }

  upload() {
    alert("hi");
    try {
      this.negateMe = true;
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        this.rowData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        alert(JSON.stringify(this.rowData));
        this.http.post(this.baseUrl + 'api/GidGsrMapping/UpdateGidGsrMappings', this.rowData, httpOptions).subscribe(result => {
          alert("Upload Result " + result);
        }, error => console.log('There was an error: '));
      }
      fileReader.readAsArrayBuffer(this.file);
      this.negateMe = false;
    } catch (ex) {
      alert(ex);
    }
  }

  downloadExcelFile() {
    // const selectedNodes = this.agGrid.api.getSelectedNodes();
    // const selectedData = selectedNodes.map(node => node.data);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowData);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }
}
