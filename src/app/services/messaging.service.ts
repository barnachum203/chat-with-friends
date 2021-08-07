import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

const httpOptionsWithAuthToken = (token: string) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    AuthToken: token,
  }),
});

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  messageURL = 'http://localhost:8000/api/message';
  channelURL = 'http://localhost:8000/api/channel';

  constructor(private http: HttpClient, private store: AngularFirestore) {}

  sendMessage(message: Message, id: string): Observable<Message> {
    return this.http.post<Message>(this.messageURL + '/' + id, message);
  }

  getMessages(channelId: string): Observable<string[]> {
    return this.http.get<string[]>(this.channelURL + '/' + channelId);
  }

  //Get realtime data from firebase (throghu AngularFirestore)
  getAllMessages(id: string) {
    return this.store.collection('channels').doc(id).snapshotChanges();
  }
}
