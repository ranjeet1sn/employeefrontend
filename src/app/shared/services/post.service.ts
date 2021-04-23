import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  userItem = [];

  constructor(private http: HttpClient) { }

  addUser(data) {
    return this.http.post(environment.apiUrl + '/post', data).pipe();
  }

  getPost(currentPage, PageSize, search?) {
    let query = `?currentPage=${currentPage}&PageSize=${PageSize}`;
    if (search) {
      query += `&text=${search}`
    }
    return this.http.get<any>(environment.apiUrl + '/post' + '/' + query).pipe(map((res: any) => {
      const token = localStorage.getItem('token');
      if (token) {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
       
        res.data = res.data.filter(item => item.userId == decodedToken.userId);
      }
      return res;
    }));
  }

  deleteUser(id) {
    return this.http.delete(environment.apiUrl + '/post' + '/' + id).pipe();
  }

  updateuser(id, data) {
    return this.http.put(environment.apiUrl + '/post' + '/' + id, data).pipe();
  }

  sendEmail(data) {
    return this.http.post(environment.apiUrl + '/post' + '/mail', data).pipe();
  }
  
  singlePost(id){
    return this.http.get(environment.apiUrl + '/post' + '/singlepost' +'/' + id).pipe();
  }

  uniqueemail(){
    return this.http.get(environment.apiUrl +'/post' + '/uniquemail' ).pipe();
  }
}
