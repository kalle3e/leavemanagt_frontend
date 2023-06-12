import { Component } from '@angular/core';
import { Leavedb } from "../Leavedb";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
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


  constructor(private fb: FormBuilder) {}
  cancelEditForm()
  {

  }

  save() {}
}
