import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Channel } from '../models/channel.interface';
import { Message } from '../models/message.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  messageURL = 'https://chat--with-friends.herokuapp.com/api/message';
  channelURL = 'https://chat--with-friends.herokuapp.com/api/channel';

  constructor(private http: HttpClient, private store: AngularFirestore) {}

  /**************************
   ********* Message ********
   **************************/

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

  /**************************
   ********* CHANNEL ********
   **************************/
  getChannels(): Observable<any[]> {  
    return this.http.get<any[]>(this.channelURL);
  }

  addChannel(channel: Channel): Observable<Channel> {
    return this.http.post<Channel>(this.channelURL, channel);
  }

  getChannelById(id: string): Observable<Channel> {
    return this.http.get<Channel>(this.channelURL + id);
  }

  addUserToChannel(cid: string, uid: string) {
    this.http.put(`${this.channelURL}/${cid}/${uid}`, {uid}).subscribe((result) =>{
      console.log(result);
      
    },(error) =>{
      console.log(error);
      
    });
  }

  removeUserFromChannel(cid: string, uid: string) {
    this.http.put(`${this.channelURL}/${cid}`, {uid}).subscribe((result) =>{
      console.log(result);
      
    }
    ,(error) =>{
      console.log(error);
      
    });
  }

  //Get realtime data from firebase (throghu AngularFirestore)
  getAllChannels(): Observable<Channel[]> {
    return this.store
      .collection('/channels')
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map((snap) => {
            const id = snap.payload.doc.id;
            const data: Channel = <Channel>snap.payload.doc.data();
            return <Channel>{
              ...data,
              id,
            };
          });
        })
      );
  }

  //Get realtime data from firebase (throghu AngularFirestore)
  getAllUsers(): Observable<Channel[]> {
    // return this.store.collection('/channels');
    return this.store
    .collection('/channels')
    .snapshotChanges()
    .pipe(
      map((snaps) => {
        return snaps.map((snap) => {
          const id = snap.payload.doc.id;
          const data: Channel = <Channel>snap.payload.doc.data();
          return <Channel>{
            ...data,
            id,
          };
        });
      })
    );
  }

  removeChannel(cid: string, uid: string) {
    return this.http.delete(`${this.channelURL}/${cid}/${uid}`);

  }
}
