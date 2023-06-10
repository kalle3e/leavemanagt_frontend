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
import { Leavedb } from "./Leavedb";
import { MatTableDataSource } from "@angular/material/table";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'leavemngt';

  formGroup = FormGroup;
  dataSource = new MatTableDataSource();

  constructor(private fb: FormBuilder,
              private leaveService: LeaveService
  )
  {}

  ngOnInit() {
    console.log("In ngOnInit :");

    // this.getLeave();
    // this.addLeave();
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // leaveDisplayColumns: string[] = ['txId', 'employeeName', 'leaveType', 'startDate', 'endDate', 'status'];
  leaveDisplayColumns: string[] = LeaveColumns.map((col) => col.column)


  columnsSchema: any = LeaveColumns;

  clickedRows = new Set<Leave>();

  isShowEdit: boolean = false;
  jsondata: Jsondata | undefined;

  testdata: Testdata = {name: 'Kathie', age: 20};
  // leavedata: Leavedb = {txId: '15', employeeName: 'zzkathie', startDate: '2023-12-02', endDate: '2023-02-03', days: '2', leaveType: 'Vacation', reason: 'a', status: 'Approved'
  // }

  success: string = '';
  errorm: string = '';


  leave: Leavedb[] = [];



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
      // res => this.leave = res.
                  res => this.dataSource.data = res
    );
  }

  // addLeave() {
  //   this.leaveService.addTeLeave(this.testdata).subscribe(
  //     (res) => {
  //       this.success = 'Created sucessfully';
  //     },
  //     (err) => (this.errorm = err.message)
  //   );
  // }
  addLeave() {
    // this.leaveService.addLeavedb(this.leavedata).subscribe(
    //   (res: Leave) => {
    //
    //     this.success = 'Created sucessfully';
    //   },
    //   (err) => (this.errorm = err.message)
    // );
  }
  onSubmit() {}

}
