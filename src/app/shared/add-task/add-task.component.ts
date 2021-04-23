import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  users = [
  ];
  priority = [
    {value: 'low', viewValue: 'Low'},
    {value: 'high', viewValue: 'High'},
  ];
  taskForm:FormGroup;
  statusArray=[];
  constructor(
    private profileService:ProfileService,
    private dialgoRef:MatDialogRef<AddTaskComponent>,
    private coomonService:CommonService
    ) { }

  ngOnInit(): void {
    this.profileService.getUser().subscribe((res:any)=>{
      this.users =res.data
    });
    this.addTaskForm();
    this.coomonService.getAllstatus().subscribe((res:any)=>{
      this.statusArray=res.data
    })
  }
 
  
   addTaskForm(){
     this.taskForm =new FormGroup({
       'name':new FormControl(null,Validators.required),
       'description':new FormControl(null,Validators.required),
       'assignee':new FormControl(null,Validators.required),
       'priority':new FormControl(null,Validators.required),
       'date':new FormControl(null,Validators.required),
       'status':new FormControl(null,[Validators.required])
     });
   }

   onSubmit(){
    
    
     this.dialgoRef.close(this.taskForm.value);
   }
}
