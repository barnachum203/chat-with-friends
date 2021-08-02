import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.css']
})
export class ChatContainerComponent implements OnInit {
  conversations: any
  selectedConversation: boolean = true;
  text: string | undefined
  events: Array<any> = []
  constructor() { }

  
  buildConversationsArray() {
  }
 
  ngOnInit() {
  }
 
  selectConversation(conversationId: string) {
  }
 
  sendText(text: string) {
  }
 


}
