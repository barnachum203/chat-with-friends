import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Channel } from 'src/app/models/channel.interface';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.css']
})
export class ChatContainerComponent implements OnInit {
  conversations: any
  selectedConversation: boolean = true; // Change to false when out of dev mode
  text: string | undefined
  events: Array<any> = []
  choosenChan: any;

  constructor() { }

  
  buildConversationsArray() {
  }
 
  ngOnInit() {
  }
 
  selectConversation(conversationId: string) {
  }
 
  sendText(text: string) {
  }
 
  choosenChannel(channel: any){
    this.choosenChan = channel;
    console.log(this.choosenChan);
    this.selectedConversation = true;    
  }


}
