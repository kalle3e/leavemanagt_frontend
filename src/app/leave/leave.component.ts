import {Component, OnInit} from '@angular/core';
import {FormBuilder, ValidatorFn, AbstractControl, ValidationErrors, FormControl} from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatButton } from "@angular/material/button";
import { MatTableDataSource } from "@angular/material/table";
import { PersonFilter} from "../PersonFilter";
import { Leave } from "../Leave";
import { Leavedb } from "../Leavedb";
import { LeaveService } from "../leave.service";
import  { Moment } from 'moment';
import * as moment from 'moment';

interface Leavetyps {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit{

  leavetyps: Leavetyps[] = [
    {value: "personal-0", viewValue: "Personal"},
    {value: "vacation-0", viewValue: "Vacation"},
    {value: "bereavement-0", viewValue: "Bereavement"},
    {value: "sick-0", viewValue: "Sick"},

  ]
  personFilters: PersonFilter[]=[];
  isShowEdit: boolean = false;
  isShowMini: boolean = false;
  isShowAddForm: boolean = false;

  leaveType: string[] = ['Personal', 'Sick', 'Vacation', 'Bereavement'];

  date = new FormControl(new Date('2023-12-12'));

  formGroup = this.fb.group({
    tx_id: [''],
    employee_name: [''],
    // start_date: [''], // error : <string | null> tobe defined somewher - see notes
      start_date: new FormControl(new Date('2023-12-12')),
    end_date: new FormControl(new Date('2023-12-12')),
    days: [''],
    leave_type: [''],
    reason: [''],
    status:['']
  });

  //  // https://angular.io/api/forms/FormGroup#create-a-form-group-with-a-group-level-validator
  // dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  //   const start = this.formGroup.get('start_date');
  //   const end = this.formGroup.get('end_date');
  //   console.log("validators called");
  //   return start?.value !== null && end?.value !== null && start?.value < end?.value
  //     ? null :{ dateValid:true };
  // }
  // Need data
  LeaveData:
    Leave[] =[{"tx_id":2222,"employee_name":"Shirley Mille","start_date":"28/09/2022","end_date":"29/09/2022","days":5,"leave_type":"Sick","reason":"a","status":"Approved"},
    {"tx_id":3333,"employee_name":"Hudson O'Brien","start_date":"28-09-2022","end_date":"01-10-2022","days":6,"leave_type":"Vacation","reason":"a","status":"Pending"},
    {"tx_id":4444,"employee_name":"Lily Wright","start_date":"28-09-2022","end_date":"24-10-2022","days":2,"leave_type":"Personal","reason":"a","status":"Approved"},
    {"tx_id":5555,"employee_name":"Claire Ryan","start_date":"25-09-2022","end_date":"26-09-2022","days":4,"leave_type":"Bereavement","reason":"a","status":"Approved"},
    {"tx_id":6666,"employee_name":"Edward Gray","start_date":"01-09-2022","end_date":"05-09-2022","days":10,"leave_type":"Personal","reason":"a","status":"Pending"},
    {"tx_id":7777,"employee_name":"Nate Jones","start_date":"03-01-2022","end_date":"10-01-2022","days":4,"leave_type":"Personal","reason":"a","status":"Pending"},
    {"tx_id":8888,"employee_name":"Amelia Bennett","start_date":"03-01-2022","end_date":"10-01-2022","days":5,"leave_type":"Personal","reason":"a","status":"Approved"},
    {"tx_id":9999,"employee_name":"Ellie Taylor","start_date":"03-01-2022","end_date":"10-01-2022","days":10,"leave_type":"Sick","reason":"a","status":"Approved"},];
  // dataSource = PERSON;
  dataSource = new MatTableDataSource(this.LeaveData)  // Need data
  dataSourceFilters = new MatTableDataSource(this.LeaveData); // Need data

  leaveDisplayColumns: string[] = ['txId', 'employeeName', 'startDate', 'endDate', 'days', 'leaveType', 'reason', 'status', 'inEdit'];
  leavedata: Leavedb = {employee_name: 'zzkathie', start_date: '2023-12-02', end_date: '2023-02-03', leave_type: 'Vacation',
    status: 'Approved'
  }

  success: string = '';
  errorm: string = '';


  // dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'inEdit'];
  constructor(private fb: FormBuilder,
              private leaveService: LeaveService
  )
  {}

  ngOnInit(): void {
    console.log("In console.log ----")
    this.dataSourceFilters.filterPredicate = function (record,filter) {
      return true;
    }
    //Resets flags
    this.isShowAddForm = false;
    this.isShowEdit = false;
    this.isShowMini = false;
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
  showAddForm() {
    this.formGroup.reset({
      tx_id: '',
      employee_name: '',
      start_date: new Date(),
      end_date: new Date(),
      days: '',
      leave_type: '',
      reason: '',
      status: ''

    });

    this.isShowAddForm = true;
  }

  save() {
    // save then
    // this.isShowAddForm = !this.isShowAddForm;
    // this.isShowEdit = !this.isShowEdit;
    this.isShowEdit = false;
    this.isShowAddForm = false;
    console.log("In save ---")

    console.log(this.formGroup.get('start_date')?.value);

    // If tx_id avail add/create service else update service
    //
    this.leaveService.addLeavedb(this.leavedata).subscribe(
      (res: Leave) => {

        this.success = 'Created sucessfully';
      },
      (err) => (this.errorm = err.message)
    );
    // const data = this.formGroup.value;
    // console.log(`Data to save: ${data.employee_name}`)

    // save to DB
  }
  add() {
    console.log('In Add')

    // this.formGroup.get('name')?.setValue('');
    // this.formGroup.reset();
    // this.name.setValue('');


    // const groupval = this.formGroup.value;
    // groupval.name
    // console.log(`Form Value: ${groupval}`)
  }

  showEditForm(element: Leave) {

    console.log(`Date edit: ${element.start_date}`) // convert this for Edit field datepicker

    // Date(moment("21/10/2023", "DD/MM/YYYY").format("YYYY-MM-DD"))
    // const formatStart =  moment("21/10/14", "DD/MM/YY").format("MM/DD/YY");
    // const newdate = new Date(formatStart)
    const ti = `${element.tx_id}`;


    this.formGroup.get('tx_id')?.setValue(ti);
    this.formGroup.get('employee_name')?.setValue(element.employee_name);
    this.formGroup.get('start_date')?.setValue(new Date('2023-12-12'));
    // this.formGroup.get('end_date')?.setValue(element.end_date);
    this.formGroup.get('end_date')?.setValue(new Date('2023-12-12'));
    // this.formGroup.get('start_date')?.setValue(element.start_date);
    // this.formGroup.get('end_date')?.setValue(element.end_date);
    this.formGroup.get('days')?.setValue(`${element.days}`);
    this.formGroup.get('leave_type')?.setValue(element.leave_type);
    this.formGroup.get('reason')?.setValue(element.reason);
    //  Needs for displaying the form
    this.isShowEdit = true;

  }

  // private formatDate(date)  {
  //   const d = new Date(date);
  //   let month = '' + (d.getMonth() + 1);
  //   let day = '' + d.getDate();
  //   const year = d.getFullYear();
  //   if (month.length < 2) month = '0' + month;
  //   if (day.length < 2) day = '0' + day;
  //   return [year, month, day].join('-');
  // }
  // edit(element: PeriodicElement) {
  // //   Call Edit Service
  // // const a = element.name;
  // //   console.log(`Name for editing: ${a}` )
  // }


  // showMiniEditForm(element: Person) {
    // this.editMini(element);
    // Load controls with values
    // this.isShowMini = true;
    // this.formGroup.get('name')?.setValue(element.name);
    // this.formGroup.get('start_date')?.setValue(element.start_date);
    // this.formGroup.get('end_date')?.setValue(element.end_date);


    // const el: Person = element;
    // const startdt = new Date(el.start_date);
    // const enddt = new Date(el.end_date)

    // this.formGroup.setValue({
    //   name: element.name
    //   // start_date: '01-01-2023',
    //   // end_date: '01-01-2023'
    //   // start_date: startdt.toString(),
    //   // end_date: enddt.toString()
    // });
    // this.name.setValue(element.name);
    // this.age.setValue(element.age);
    // or this.formGroup.get('name')?.setValue()
  // }


  // editMini() {
  //   // call Service
  //   // this.formGroup.setValue(element);
  //
  //
  //   // console.log(`Element: ${element.name} . '   ' . ${element.start_date}`);
  //   // console.log(`In editMini --`);
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

