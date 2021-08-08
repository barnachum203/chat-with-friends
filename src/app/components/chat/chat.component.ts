import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Channel } from 'src/app/models/channel.interface';
import { Message } from 'src/app/models/message.interface';
import { User } from 'src/app/models/user.inteface';
import { AuthService } from 'src/app/services/auth.service';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnChanges {
  public text: string = '';
  user: User = {
    uid: 'null',
    email: 'null',
    displayName: 'null',
    photoURL: 'null',
  };
  messages: any[] = [];
  subscription: any;
  channelId: string = '0';
  sendingMessage: boolean = false;

  @Input() channel: Channel = {
    id: 'null',
    name: 'null',
    users: [],
    pass: 'null',
    messages: [],
  };

  constructor(
    private messagingService: MessagingService,
    private authService: AuthService
  ) {
    if (localStorage.getItem('userId')) {
      this.authService
        .getUserDetails(localStorage.getItem('userId') || '')
        .subscribe((data) => {
          if (data) {
            // console.log(data);
            this.user = data;
          }
        });
    }
  }

  ngOnInit(): void {
    // this.user = localStorage.getItem('userId')?.toString();
    // if(this.user){
    //   console.log(this.user);
    //   this.authService.getUserDetails(localStorage.getItem('userId') || '').subscribe(data =>{
    //     console.log(data);
    //     this.user = data;
    //   });
    // }
  }

  private getAllMessages(id: string) {
    this.messagingService.getAllMessages(id).subscribe((data) => {
      this.messages = data.payload.get('messages');
      console.log(this.messages);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.channel?.messages) {
      console.log(`${this.channel.messages.length} messages found`);

      //Subsucribe to new channel when choosed another room
      if (this.channel.id != this.channelId) {
        this.messages = [];
        this.channelId = <string>this.channel.id;
        this.getAllMessages(this.channelId);
      }
    } else {
      console.log('no messages');
    }
  }

  async sendMessage() {
    this.sendingMessage = true;
    const message: Message = {
      message: this.text,
      userId: this.user?.uid || 'null',
      from: this.user?.displayName || 'null',
      timeStamp: Date.now(),
    };
    const id = this.channel?.id;
    console.log(`Send message to ${id}`);

    if (id) {
      this.messagingService.sendMessage(message, id).subscribe(() => {
        this.text = '';
        this.sendingMessage = false;
      });
    }
  }
}
