import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Channel } from '../models/channel.interface';
// import {
//   AngularFirestore,
//   AngularFirestoreCollection,
// } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  channelURL = 'http://localhost:8000/api/channel';

  constructor() {}

  // getChannels(): Observable<any[]> {
  //   return this.http.get<any[]>(this.channelURL);
  // }

  // addChannel(channel: Channel): Observable<Channel> {
  //   return this.http.post<Channel>(this.channelURL, channel);
  // }

  // getChannelById(id: string): Observable<Channel> {
  //   return this.http.get<Channel>(this.channelURL + id);
  // }

  // addUserToChannel(cid: string, uid: string) {
  //   return this.http.put<string>(`${this.channelURL}/${cid}/${uid}`, uid);
  // }

  // removeUserFromChannel(cid: string, uid: string) {
  //   return this.http.put(`${this.channelURL}/${cid}`, {uid});
  // }

  // //Get realtime data from firebase (throghu AngularFirestore)
  // getAllChannels(): AngularFirestoreCollection<Channel> {
  //   return this.store.collection('/channels');
  // }

  // //Get realtime data from firebase (throghu AngularFirestore)
  // getAllUsers(): AngularFirestoreCollection<Channel> {
  //   return this.store.collection('/channels');
  // }
}
