import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Channel } from 'src/app/models/channel.interface';
import { Message } from 'src/app/models/message.interface';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnChanges {
  public text: string = '';
  user: string | undefined;
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

  constructor(private messagingService: MessagingService) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('userId')?.toString();
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
      timeStamp: Date.now(),
      user: this.user,
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
