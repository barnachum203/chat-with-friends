import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
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
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = this.messages;

  public text: string = '';
  user: string | undefined;
  messages$ = new Subject<Message>();
  messages: any[] = [];
  subscription: any;
  channelId: string = "0";
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
    // this.messages = this.messages$.asObservable().subscribe((data) =>{
    // });
    // this.subscription = this.messagingService
    //   .getMessages('qfoXWPEFng6NCVxEolOJ')
    //   .subscribe((message: any) => {
    //     console.log(message);
    //     if (message) {
    //       this.messages = message.messages;
    //     } else {
    //       // clear messages when empty message received
    //       this.messages = [];
    //     }
    //   });
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('userId')?.toString();

    this.getMessages();

    // this.messages$.subscribe(async (data: any) => {
    //   this.messages.push(data);
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('NG ON CHANGE CALLD');
    console.log(this.channel.id);
    if (this.channel?.messages) {
      console.log(`${this.channel.messages.length} messages found`);

      if (this.channel.id != this.channelId) {
      this.messages = [];
      this.channelId = <string>this.channel.id ;
      console.log(this.channelId);
      }

      this.channel?.messages?.forEach((msg) => {
        this.messages.push(msg);
      });
      // console.log(this.messages);
    } else {
      console.log('empty messages');
    }
  }

  async sendMessage() {
    this.sendingMessage = true;
    const message: Message = {
      message: this.text,
      timeStamp: Date.now(),
      user: this.user,
    };
    const id = this.channel?.id;
    console.log(`Send message to ${id}`);

    if (id) {
      this.messagingService.sendMessage(message, id).subscribe(() => {
        this.text = '';
        // this.messages$.next(message);
        this.messages.push(message)
        this.getMessages();
        this.sendingMessage = false;
      });
    }
  }

  async getMessages() {
    const id = this.channelId;

    if (id) {
     this.messagingService.getMessages(id).subscribe((data) => {
        // console.log(data);
        this.messages = data;
        // this.messages$.next(data.messages);
        // console.log(this.messages$);
      });
    }
  }
}
