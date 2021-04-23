import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { PostService } from '../shared/services/post.service';
import { SocketService } from '../shared/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  userName = [];
  name: any;
  user: any;
  messageList = [];
  message: any;
  subscription: Subscription[] = [];
  room = [
    { name: 'Delux' },
    { name: 'Private' },
    { name: 'Hr' }
  ]
  constructor(
    private postService: PostService,
    private chatService: SocketService,
    private spinner:NgxSpinnerService
  ) {
    this.chatService.newUserJoin().subscribe(res => {
      this.messageList.push(res)
    },
      (error => {
      })
    );

    this.chatService.userLeft().subscribe(res => {
      this.messageList.push(res)
    },
      (error => {
      })
    );

    this.chatService.onMessageSend().subscribe(res => {
      this.messageList.push(res);
    },
      (error => {
      })
    );
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.subscription.push(this.chatService.getName().subscribe((res: any) => {
      this.userName = res.data;
    })
    );
  }

  joinRoom() {
    const data = {
      user: this.name,
      room: this.user
    }
    this.chatService.joinRoom(data);
  }

  leaveRoom() {
    const data = {
      user: this.name,
      room: this.user
    }
    this.chatService.leaveRoom(data);
  }

  sendMessage() {
    const data = {
      user: this.name,
      room: this.user,
      message: this.message
    }
    this.chatService.sendMessage(data);
  }

  ngOnDestroy() {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
}
