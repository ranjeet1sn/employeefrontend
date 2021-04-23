import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  statusArray = [];
  id: string;
  constructor(
    private http: HttpClient
  ) { }

  addStatus(data) {
    return this.http.post(environment.apiUrl + '/common', data);
  }

  getAllstatus() {
    this.statusArray = [];
    return this.http.get(environment.apiUrl + '/common').pipe(
      map((res: any) => {
        res.data.forEach(element => {
          this.id = element._id
          element.status.forEach(ele => {
            this.statusArray.push(ele);
          });
        });
        const obj = {
          data: this.statusArray,
          id: this.id
        }
        return obj;
      })
    );
  }

  updateStatus(id, data) {
    return this.http.put(environment.apiUrl + '/common' + `/${id}`, data)
  }
}
