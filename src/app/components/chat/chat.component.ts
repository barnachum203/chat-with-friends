import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Message } from 'src/app/models/message.interface';
import { User } from 'src/app/models/user.inteface';
import { AuthService } from 'src/app/services/auth.service';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  public text: string = '';
  user: string | undefined;
  messages$ = new Subject<Message[]>();
  messages: any[] = [];
  subscription: any;

  constructor(
    private messagingService: MessagingService,
    private authService: AuthService
  ) {
    // this.messages = this.messages$.asObservable();
    this.subscription = this.messagingService
      .getMessages('qfoXWPEFng6NCVxEolOJ')
      .subscribe((message: any) => {
        console.log(message);
        
        if (message) {
          this.messages = message.messages;
        } else {
          // clear messages when empty message received
          this.messages = [];
        }
      });
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('userId')?.toString();

    // this.getMessages();
  }

  sendMessage() {
    const message: Message = {
      message: this.text,
      timeStamp: Date.now(),
      user: this.user,
    };
    this.messagingService.sendMessage(message).subscribe(() => {
      this.text = '';
      this.getMessages();
    });
  }

  getMessages() {
    this.messagingService
      .getMessages('qfoXWPEFng6NCVxEolOJ')
      .subscribe((data: any) => {
        console.log(data);

        this.messages$.next(data.messages);
        console.log(this.messages$);
      });
  }
}
