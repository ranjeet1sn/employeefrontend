import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  addProfile(data) {
    return this.http.post(environment.apiUrl + '/profile', data).pipe();
  }

  getProfile(email) {
    return this.http.get(environment.apiUrl + '/profile' + `/${email}`).pipe();
  }

  upateProfile(data,id){
    return this.http.put(environment.apiUrl + '/profile' + `/${id}`, data).pipe();
  }

  getUser(){
    return this.http.get(environment.apiUrl +'/auth' +'/user');
  }

  
}
