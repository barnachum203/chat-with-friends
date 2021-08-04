import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  messageURL = 'http://localhost:8000/api/message';
  channelURL = 'http://localhost:8000/api/channel';
  constructor(private http: HttpClient) {}

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(
      this.messageURL + '/qfoXWPEFng6NCVxEolOJ',
      message
    );
  }

  getMessages(channelId: string): Observable<string> {
    return this.http.get<string>(this.channelURL + '/' + channelId);
  }
}
