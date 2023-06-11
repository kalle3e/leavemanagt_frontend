import {Component, OnInit} from '@angular/core';
import {FormBuilder, ValidatorFn, AbstractControl, ValidationErrors, FormControl, Validators} from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatButton } from "@angular/material/button";
import { MatTableDataSource } from "@angular/material/table";
import { PersonFilter} from "../PersonFilter";
import { Leave } from "../Leave";
import { Leavedb } from "../Leavedb";
import { LeaveService } from "../leave.service";
import  { Moment } from 'moment';
import * as moment from 'moment';
import { FlexModule } from "@ngbracket/ngx-layout";


interface Leavetyps {
  value: string;
}
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit{

  LeaveData: any;
  leavetyps: Leavetyps[] = [
    {value: "Personal"},
    {value: "Vacation"},
    {value: "Bereavement"},
    {value: "Sick"},

  ]

  // personFilters: PersonFilter[]=[];
  isShowEdit: boolean = false;
  // isShowMini: boolean = false;
  isShowAdd: boolean = false;
  isShowAddForm: boolean = false;
  isShowEditForm: boolean = false;

  leaveType: string[] = ['Personal', 'Sick', 'Vacation', 'Bereavement'];

  date = new FormControl(new Date('2023-12-12'));

  formGroup = this.fb.group({

    // txId:  FormControl,
    txId:  [''],
    employeeName: ['', Validators.required],
    startDate: [new Date(), Validators.required],
    endDate: [new Date(), Validators.required],
    days: ['', Validators.required],
    leaveType: ['', Validators.required],
    reason: ['', Validators.required],
    status:['', Validators.required]
  });

  //  // https://angular.io/api/forms/FormGroup#create-a-form-group-with-a-group-level-validator
  // dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  //   const start = this.formGroup.get('start_date');
  //   const end = this.formGroup.get('end_date');
  //   console.log("validators called");
  //   return start?.value !== null && end?.value !== null && start?.value < end?.value
  //     ? null :{ dateValid:true };
  // }


  dataSource = new MatTableDataSource(); // Need data
  dataSourceFilters = new MatTableDataSource(); // Need data
  // dataSource = this.LeaveData;
  // dataSourceFilters = this.LeaveData;

  leaveDisplayColumns: string[] = ['txId', 'employeeName', 'startDate', 'endDate', 'days', 'leaveType', 'reason', 'status', 'inEdit'];
  // leavedata: Leavedb = {txId: 15, employeeName: 'zzkathie', startDate: '2023-12-02', endDate: '2023-02-03', days: 2, leaveType: 'Vacation', reason: 'a', status: 'Approved'
  // }

  success: string = '';
  errorm: string = '';
  // isHide: boolean = false;
  isForm: boolean = false;
  isList: boolean = false;
  isEditForm: boolean = false;
  isAddForm: boolean = false;
  isCreate: boolean = false;

  // dataSource = ELEMENT_DATA;
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'inEdit'];
  constructor(private fb: FormBuilder

  )
  {}
  // private leaveService: LeaveService
  ngOnInit(): void {
    console.log('In ngOnInit -----');
    // this.getLeave();
    // // this.dataSource = this.LeaveData;
    // this.dataSource = new MatTableDataSource(this.LeaveData)  // Need data
    // this.dataSourceFilters = new MatTableDataSource(this.LeaveData); // Need data
    // this.dataSourceFilters = this.LeaveData;

    this.dataSourceFilters.filterPredicate = function (record,filter) {
      return true;
    }
    //Resets flags
    this.isShowEdit = false;
    // this.isShowMini = false;
    this.isEditForm = false;
    this.isShowAddForm = false;

  }
  // checkingEndDate(startDate: string, endDate: string) : ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const start = this.formGroup.get('startDate').value;
  //     const end = this.this.formGroup.get('endDate').value
  //
  //     if (start < end) { return {'startDateLess': true}}
  //
  //     return null
  //
  //   }
  // }
  // getLeave() {
  //   this.leaveService.getLeave().subscribe(
  //     // res => this.leave = res.
  //     (res: Leavedb[]) => {
  //                  // this.LeaveData = res;
  //                   this.LeaveData = res;
  //     });
  // }
  showAdd() {
    this.formGroup.reset({
      txId: null,
      employeeName: '',
      startDate: new Date(),
      endDate: new Date(),
      days: null,
      leaveType: '',
      reason: '',
      status: ''

    });

    this.isForm = !this.isForm;
    this.isShowAdd = true;
  }

  add() {
    this.isCreate = true;
    this.save();
  }

  save() {
    if (this.isCreate) {
      this.isCreate = false;
      this.isShowAdd = false;
    } else {
      this.isShowEdit = false;
    }

    const model = this.formGroup?.value;

  model.txId =  this.formGroup.get('txId')?.value ;
  model.employeeName = this.formGroup.get('employeeName')?.value;


  // const startFormat = this.formGroup.get('startDate')?.value;
  model.startDate = this.formGroup.get('startDate')?.value;
  model.endDate = this.formGroup.get('endDate')?.value;

  const startDb = moment(model.startDate, "ddd mmm dd yyyy HH:mm:ss").format("\"YYYY-MM-DD\"");
  const endDb = moment(model.endDate, "ddd mmm dd yyyy HH:mm:ss").format("\"YYYY-MM-DD\"");
  // console.log(`Typeof startDB: ${typeof startDb}`) ;
    // console.log(`Moment format long date from Edit Input Thu Jun 15 2023 10:00:00`)
    // console.log(startDb);
    // console.log(endDb);
  model.startDate = new Date(startDb);
  model.endDate = new Date(endDb);
  console.log(`Typeof model.startDate new Date() ${typeof model.startDate}`)
  model.days = this.formGroup.get('days')?.value;
  model.leaveType = this.formGroup.get('leaveType')?.value;
  model.reason = this.formGroup.get('reason')?.value;
  model.status = this.formGroup.get('status')?.value;

  console.log(`LeaveType: ${model.leaveType}`);
  console.log(`In save(), model.startDate: ${model.startDate}`)

    // If tx_id avail add/create service else update service
    //
    // this.leaveService.addLeavedb(this.leavedata).subscribe(
    // this.leaveService.addLeavedb(model).subscribe(
    //   (res: Leavedb) => {
    //     // this.LeaveData.push(model);
    //     this.LeaveData(); // refetch update
    //     this.success = 'Created sucessfully';
    //   },
    //   (err) => (this.errorm = err.message)
    // );
    // Load data for datasource
    // this.getLeave();
  }

  // showEditForm(element: Leave) {

  showEditForm(element: Leavedb) {

    let momentA = moment("21/10/14", "DD/MM/YY").format("MM/DD/YY");
    console.log(`MomentA: ${momentA}`);

    let startyyyymmdd = moment(element.startDate, "YYYY-MM-DD").format("YYYY-MM-DD");
    let endyyyymmdd = moment(element.endDate, "YYYY-MM-DD").format("YYYY-MM-DD");

    console.log(`Date edit in showEdit: ${element.startDate}`) // convert this for Edit field datepicker

    // let dateformat = element.startDate;
    // let start = this.format(dateformat);
    // console.log(`Returned date formatted: ${start}`)
    console.log(`Date to edit: ${element.startDate}`);
    console.log(`Date after momentFormt: ${startyyyymmdd}`)


    this.formGroup.get('txId')?.setValue(`${element.txId}`?? '');
    this.formGroup.get('employeeName')?.setValue(`${element.employeeName}` ?? '');
    this.formGroup.get('startDate')?.setValue(new Date(startyyyymmdd));
    // this.formGroup.get('startDate')?.setValue(new Date(element.startDate));
    // this.formGroup.get('endDate')?.setValue(element.endate);
    // this.formGroup.get('endDate')?.setValue(new Date(element.endDate));
    this.formGroup.get('endDate')?.setValue(new Date(endyyyymmdd));
    this.formGroup.get('days')?.setValue(`${element.days}` ?? '');
    this.formGroup.get('leaveType')?.setValue(element.leaveType ?? '');
    this.formGroup.get('reason')?.setValue(element.reason ?? '');
    this.formGroup.get('status')?.setValue(element.status ?? '');
    //  Needs for displaying the form
    this.isShowEdit = true;

  }

  cancelEditForm() {
    this.isList = !this.isList;
    this.isShowEdit = !this.isShowEdit
  }
  cancelAddForm() {
    this.isList = !this.isList;
    this.isShowAdd = false;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

