import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidenav')sidenav:MatSidenav;
  isAuthenticated:boolean =false;
  constructor(
    private taskService:TaskService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated =this.authService.isAuthenticated;
    this.authService.isAuthenticate().subscribe(res=>{
      this.isAuthenticated =res;
    })
    this.taskService.sidebarToggle.subscribe(res=>{
      if(res){
      this.toggleSidebar();
    }});
  }
  
   toggleSidebar(){
     this.sidenav.toggle();
   }
}
