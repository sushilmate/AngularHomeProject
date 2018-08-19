import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { AgGridNg2 } from "ag-grid-angular";
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

import { GidGsrMappingModel } from '../../shared/gidgsrmap.model';
import { DataService } from '../../shared/data.service';
import { Logger } from "../core/logger.service";
import { SpinnerService } from "../core/spinner/spinner.service";

@Component({
  selector: 'app-gidgsrmap',
  templateUrl: './gidgsrmap.component.html',
  styleUrls: ['./gidgsrmap.component.css']
})

export class GidGsrMapComponent {
  private negateMe: boolean;
  private rowData: GidGsrMappingModel[];
  @ViewChild("agGrid") agGrid: AgGridNg2;
  private arrayBuffer: any;
  private file: File;
  private dataService: DataService;

  constructor(dataService: DataService, private logger: Logger,
    private spinnerService: SpinnerService) {
    this.dataService = dataService;
  }

  ngOnInit() {
    this.spinnerService.show();

    this.dataService.getGidGsrMapping().subscribe(result => {
      this.rowData = result;
      this.spinnerService.hide();
    }, error => this.spinnerService.hide());
  }

  columnDefs = [
    { headerName: 'Id', field: 'id', editable: true },
    { headerName: 'GSR', field: 'gsr', editable: true },
    { headerName: 'GID', field: 'gid', editable: true }
  ];

  incomingfile(event) {
    this.file = event.target.files[0];
  }

  upload() {
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
        this.dataService.updateGidGsrMappings(this.rowData);
      }
      fileReader.readAsArrayBuffer(this.file);
      this.negateMe = false;
    } catch (ex) {
      alert(ex);
    }
  }

  downloadExcelFile() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowData);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }

  saveGidGsrMappings() {
    var updatedGidGsrMappings = this.agGrid.api.getEditingCells();
    updatedGidGsrMappings.forEach(function (cellDef) { alert(cellDef.column); });
  }

  deleteGidGsrMappings() {
    Swal({
      title: "Delete GID GSR Mapping",
      text: "Are you sure that you want to delete selected record?",
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        var selectedNodes = this.agGrid.api.getSelectedNodes();
        var selectedIds = selectedNodes.map(node => node.data);
        this.dataService.deleteGidGsrMappings(selectedIds.map(node => node.id));
      }
    });
  }
}
