import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { filter } from 'minimatch';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { initialiseAgGridWithAngular1 } from 'ag-grid-community';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
   gridApi;
   gridColumnApi;
   columnDefs;
   defaultColDef;
   groupDefaultExpanded;
   search
   rowSelection;
   rowData;
   getRowClass;
   selectedEntity;
   defaultValue;

  api= 'https://vast-shore-74260.herokuapp.com/banks?city=';
  cityName='';


  constructor(private http: HttpClient ){

      this.columnDefs=[
        {
          headerName:"ID",
          field:"bank_id",
          width: 150,
          filter: false
    
        },
        {
          headerName:"NAME",
          field:"bank_name",
          width: 250,
          filter: true
        },
        {
          headerName:"IFSC",
          field:"ifsc",
          width: 250,
          filter: false
        },
        {
          headerName:"BRANCH",
          field:"branch",
          width: 250,
          filter: false
        },
        {
          headerName:"ADDRESS",
          field:"address",
          width: 500,
          filter: false
          
        },
        {
          
          checkboxSelection: true
        }
      ];

      this.rowSelection = "multiple";
  }


  onMoveToFav(category){
    var selectedRowData = this.gridApi.getSelectedRows();
    this.gridApi.updateRowData({update:selectedRowData});
    
  }


  onGridReady(params){
    this.gridApi= params.api;
    this.gridColumnApi=params.columnApi;
    let url='https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI';
    this.http.get(url).subscribe(data=>{
      params.api.setRowData(data);
    });
    
  }

  bankSearch(){
    this.gridApi.setQuickFilter(this.search);
  }
}
