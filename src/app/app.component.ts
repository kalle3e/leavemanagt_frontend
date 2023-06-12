import {Component, OnInit,} from '@angular/core';
import { LeaveService } from "./leave.service";
import { Leavedb } from "./Leavedb";
import { MatTableDataSource } from "@angular/material/table";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'leavemanagt';

  dataSource = new MatTableDataSource();
  dataSourceFilters = new MatTableDataSource();
  LeaveData: any;

  leaveDisplayColumns: string[] = ['txId', 'employeeName', 'startDate', 'endDate', 'days', 'leaveType', 'reason', 'status', 'inEdit'];

  isShowEdit: Boolean = false;
  isShowAdd: Boolean = false;


  constructor(private leaveService: LeaveService) {
  }

  ngOnInit() {
    this.getLeave();
    this.dataSourceFilters = new MatTableDataSource(this.LeaveData);
    this.dataSourceFilters.filterPredicate = function (record,filter) {
      return true;
    }
    this.isShowAdd = false;
    this.isShowEdit = false;
  }

  showAdd() {
    // this.formGroup.reset({
    //   txId: null,
    //   employeeName: '',
    //   startDate: new Date(),
    //   endDate: new Date(),
    //   days: null,
    //   leaveType: '',
    //   reason: '',
    //   status: ''
    //
    // });

    // this.isForm = !this.isForm;
    this.isShowAdd = true;
  }
  showEditForm() {
    this.isShowEdit = true;
  }

  getLeave() {
    this.leaveService.getLeave().subscribe(
      // res => this.leave = res.
      (res: Leavedb[]) => {
                   // this.LeaveData = res;
                    this.LeaveData = res;
      });
  }
  addLeave(leaveRow: Leavedb) {
    // this.LeaveData.push();
  }
}
