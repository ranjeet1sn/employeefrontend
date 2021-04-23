import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/common.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-status-box',
  templateUrl: './status-box.component.html',
  styleUrls: ['./status-box.component.css']
})
export class StatusBoxComponent implements OnInit ,OnDestroy{
  form: FormGroup;
  updateCondition: boolean = false;
  id: string;
  val:any;
  subscription:Subscription[]=[]
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private dialgoRef: MatDialogRef<StatusBoxComponent>,
    private toastr:ToastrService
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      mainstatus: this.fb.array([]),
    });
    this.subscription.push(this.commonService.getAllstatus().subscribe((res: any) => {  
      if (res &&res.id!=undefined) {  
        this.id = res.id;
        this.updateCondition = true;
        res.data.forEach(element => {
          this.val = this.fb.group({
            status: [element.status],
            color: [element.color]
          });
          const form = this.form.get('mainstatus') as FormArray;
          form.push(this.val);
        });
      } 
    }));
  }

  addGroup() {
    const val = this.fb.group({
      status: [''],
      color: ['#fff']
    });
    const form = this.form.get('mainstatus') as FormArray;
    form.push(val);

  }

  removeGroup(index) {
    const form = this.form.get('mainstatus') as FormArray;
    form.removeAt(index);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  onSubmit() {
    const data = this.form.value;
    if (!this.updateCondition) {
      this.commonService.addStatus(data).subscribe(res => {
        this.dialgoRef.close(res);
      })
    }
    else {
      this.commonService.updateStatus(this.id, data).subscribe(res => {
        this.dialgoRef.close(res);
        this.toastr.success('Status Updated Successfully');
      });
    }
  }
  ngOnDestroy(){
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  // drop(event: CdkDragDrop<any>) {
  //   const form = this.form.get('mainstatus') as FormArray;
  //   moveItemInArray(form, event.previousIndex, event.currentIndex);
  // }
}
