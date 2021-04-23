import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket = io('http://localhost:3000/');
  constructor(private http:HttpClient) { }

  joinRoom(data) {
    this.socket.emit('join', data);
  }

  leaveRoom(data) {
    this.socket.emit('leave', data);
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  newUserJoin() {
    let observable = new Observable<any>(observer => {
      this.socket.on('new user joined', (data) => {
        observer.next(data)
      })
      return () => { this.socket.disconnect() }
    })
    return observable
  }

  userLeft() {
    let observable = new Observable<any>(observer => {
      this.socket.on('left room', (data) => {
        observer.next(data)
      })
      return () => { this.socket.disconnect() }
    })
    return observable
  }

  onMessageSend(){
    let observable = new Observable<any>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data)
      })
      return () => { this.socket.disconnect() }
    })
    return observable
  }

  getName(){
    return this.http.get(environment.apiUrl +'/post' + '/single' ).pipe();
  }
}
