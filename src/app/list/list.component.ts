import {Component, OnInit} from '@angular/core';
import { LeaveService } from "../leave.service";
import { Leavedb } from "../Leavedb";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  // @Input() leaveList: Leavedb = [];

  dataSourceFilters = new MatTableDataSource();
  LeaveData: any;
  leaveDisplayColumns: string[] = ['txId', 'employeeName', 'startDate', 'endDate', 'days', 'leaveType', 'reason', 'status', 'inEdit'];

  isShowEdit: Boolean = false;
  isShowAdd: Boolean = false;

  constructor(private leaveService: LeaveService) {}
  ngOnInit() {
    this.getLeave();
    this.dataSourceFilters = new MatTableDataSource(this.LeaveData);
    this.dataSourceFilters.filterPredicate = function (record,filter) {
      return true;
    }
  }

  showAdd() {}
  showEditForm() {}
  getLeave() {
    this.leaveService.getLeave().subscribe(
      // res => this.leave = res.
      (res: Leavedb[]) => {
        // this.LeaveData = res;
        this.LeaveData = res;
      });
  }
}
