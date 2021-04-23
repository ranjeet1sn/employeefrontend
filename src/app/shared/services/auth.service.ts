import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenTimer: any;
  private authListener = new Subject<boolean>();
  isAuthenticated = false;
  isAdmin = false;
  profileColor: string;
  backgroundColor = new Subject<boolean>();
  checkAdmin = new Subject<boolean>();
  userId:string;
  constructor(
    private http: HttpClient,
    private router: Router) { }

  registerUser(data) {
    return this.http.post(environment.apiUrl + '/auth' + '/register', data);
  }

  loginUser(data) {
    return this.http.post(environment.apiUrl + '/auth' + '/login', data).pipe(
      map((res: any) => {
        if (res) {
          const token = res.token;
          const helper = new JwtHelperService();
          const decode = helper.decodeToken(token);
          if (decode.admin) {
            this.isAdmin = true;
            this.checkAdmin.next(true);
          } else {
            this.isAdmin = false;
            this.checkAdmin.next(false);
          }
          this.profileColor = decode.color;
          this.userId = decode.userId;
          this.backgroundColor.next(decode.color)
          this.isAuthenticated = true;
          const expireDuration = res.expiresIn;
          this.authListener.next(true);
          this.setAuthTime(expireDuration);
          const now = new Date();
          const expire = new Date(now.getTime() + expireDuration * 1000);
          this.setAuthData(token, expire);
          this.router.navigate(['/']);
        }
        return res;
      })
    )
  }

  setAuthTime(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.onLogout();
    }, duration * 1000);
  }

  isAuthenticate() {
    return this.authListener.asObservable();
  }

  setAuthData(token: string, expireIn: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expireIn.toISOString());
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return
    }
    const token = authInfo.token;
    const helper = new JwtHelperService();
    const decode = helper.decodeToken(token)
    if (decode.admin) {
      this.isAdmin = true;
      this.checkAdmin.next(true);
    }
    else {
      this.isAdmin = false;
      this.checkAdmin.next(false);
    }
    this.profileColor = decode.color;
    this.userId = decode.userId
    this.backgroundColor.next(decode.color)
    const now = new Date();
    const isFuture = authInfo.expiresInDate.getTime() - now.getTime();
    if (isFuture > 0) {
      this.setAuthTime(isFuture / 1000);
      this.isAuthenticated = true;
      this.authListener.next(true)
      // this.router.navigate(['/']);
    }
    else {
      this.onLogout();
    }
  }

  onLogout() {
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.isAuthenticated = false;
    this.authListener.next(false);
    this.profileColor = '';
    this.backgroundColor.next(null)
    this.router.navigate(['/auth/login']);
  }

  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    const expiresInDate = localStorage.getItem('expiration')
    if (!token && !expiresInDate) {
      return;
    }
    return {
      token: token,
      expiresInDate: new Date(expiresInDate)
    }
  }
   
  sendEmail(email){
    return this.http.post(environment.apiUrl + '/auth' + '/sendmail', email);
  }

  resetPassword(id,data){
    return this.http.post(environment.apiUrl + '/auth' + '/reset'  +'/' + `${id}`,   data)
  }
}
