import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskDetailComponent implements OnInit,OnDestroy {
  userTask = [];
  subscription :Subscription[] =[];
  constructor(
    private authService:AuthService,
    private taskService:TaskService
  ) { }

  ngOnInit(): void {
    this.subscription.push(this.taskService.getUserTask(this.authService.userId).subscribe((res:any)=>{
      this.userTask = res.data;
    }));
  }
  
  ngOnDestroy() {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
}
