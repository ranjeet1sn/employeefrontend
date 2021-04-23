import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  sidebarToggle = new Subject<any>();
  constructor(
    private http: HttpClient
  ) { }

  addTask(data) {
    return this.http.post(environment.apiUrl + '/task', data)
  }

  getAllTask(pageSize, currentPage, assignee?) {
    let query = `?pageSize=${pageSize}&currentPage=${currentPage}`;
    if (assignee) {
      query += `&assignee=${assignee}`
    }
    return this.http.get(environment.apiUrl + '/task' + query);
  }

  getUserTask(id) {
    return this.http.get(environment.apiUrl + '/task' + '/' + id);
  }

  getChart() {
    return this.http.get(environment.apiUrl + '/task' + '/assigntask');
  }

  deleteTask(item) {
    item = JSON.stringify(item);
    let query = `?item=${item}`;
    return this.http.delete(environment.apiUrl + '/task' + query);
  }
}
