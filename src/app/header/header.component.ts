import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  isAuthenticated: boolean = false;
  public isCollapsed = true;
  backgroundColor:string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private taskService:TaskService
  ) { }

  ngOnInit(): void {
    this.backgroundColor =this.authService.profileColor;
    this.authService.backgroundColor.subscribe((res:any)=>{
      this.backgroundColor=res;
    })
    
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authService.isAuthenticate().subscribe(res => {
      if (res) {
        this.isAuthenticated = res;
      }
      else {
        this.isAuthenticated = res;
      }
    })
  }

  ngOnChanges() {
    this.isAuthenticated = this.authService.isAuthenticated;
  }

  onLogout() {
    this.authService.onLogout();
  }

  onRedirect() {
    this.router.navigate(['/chat']);
  }

  onHome() {
    this.router.navigate(['/']);
  }
  toggleSidebar(){
    this.taskService.sidebarToggle.next('toggle');
  }
}
