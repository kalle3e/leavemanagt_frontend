import { Component, OnInit } from '@angular/core';
import {Leave, LeaveColumns} from './Leave';
import { FormControl, FormGroup, FormBuilder, AbstractControl } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";
import { MatTable } from "@angular/material/table";
import { LeaveService } from "./leave.service";
import {Jsondata} from "./jsondata";
import { MatTableModule  } from "@angular/material/table";
import { Testdata } from "./Testdata";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'leavemngt';

  formGroup = FormGroup;
  constructor(private fb: FormBuilder,
              private leaveService: LeaveService
  )
  {}

  ngOnInit() {
    console.log("In ngOnInit :");

    this.getLeave();
    this.addLeave();
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // leaveDisplayColumns: string[] = ['txId', 'employeeName', 'leaveType', 'startDate', 'endDate', 'status'];
  leaveDisplayColumns: string[] = LeaveColumns.map((col) => col.column)


  columnsSchema: any = LeaveColumns;

  clickedRows = new Set<Leave>();

  isShowEdit: boolean = false;
  jsondata: Jsondata | undefined;

  testdata: Testdata = {name: 'Kathie', age: 20};

  success: string = '';
  errorm: string = '';


  leave: Leave[] = [];



  leaveForm = this.fb.group({
    txId: [''],
    startDate: [''],
    endDate: [''],
    employeeName: [''],
    days: [''],
    reason: [''],
    status: [''],
    searchText: ['']

  });

  addRow() {}

  save() {
    console.log("Record changed")
  }
  check() {
    console.log(`DisplayedColumns: ${this.leaveDisplayColumns}`)
  }
  getLeave() {
    this.leaveService.getLeave().subscribe(
      res => this.leave = res
    );
  }

  addLeave() {
    this.leaveService.addTeLeave(this.testdata).subscribe(
      () => {
        this.success = 'Created sucessfully';
      },
      (err) => (this.errorm = err.message)
    );
  }

  onSubmit() {}

}