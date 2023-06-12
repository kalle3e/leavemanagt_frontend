import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Leavedb} from "../Leavedb";
import { FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  @Output() newLeaveEvent = new EventEmitter<Leavedb>();


  leavetypes: string[] = ['Personal', 'Vacation', 'Bereavement', 'Sick'];

  formGroup = this.fb.group({
    txId: [''],
    employeeName: [''],
    startDate: [new Date(), Validators.required],
    endDate: [new Date(), Validators.required],
    days: ['', Validators.required],
    leaveType: ['', Validators.required],
    reason: ['', Validators.required],
    status:['', Validators.required]

  })
  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute
              )
  {
  }
  ngOnInit() {
    this.initialiseForm();
  }
  add() {
    this.newLeaveEvent.emit();
  }

  initialiseForm() {
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
    // this.isShowAdd = true;
  }
  cancelAddForm() {
    this.router.navigate(['../list'], {relativeTo: this.activatedRoute});
  }




}
