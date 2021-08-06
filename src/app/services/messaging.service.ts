import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Message } from '../models/message.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

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
  constructor(private http: HttpClient, private auth: AngularFireAuth) {}

  //Send message by channel id
  //TODO: pass channel id
  sendMessage(message: Message, id: string): Observable<Message> {
    // return new Observable<Message>((observer) => {
    //   this.auth.user.subscribe((user) => {
    //     user &&
    //       user.getIdToken().then((token) => {
    //         if (user && token) {
    //           console.log('SENDING....');

    //           this.http
    //             .post<Message>(
    //               this.messageURL + '/' + id,
    //                message ,
    //               httpOptionsWithAuthToken(token)
    //             )
    //             .subscribe(
    //               (message) => {
    //                 console.log('succeess in Service sendMessage()');
                    
    //                 observer.next(message);
    //               },
    //               (error) => {
    //                 console.log('error caught in service');
    //                 console.error(error);
    //                 return throwError(error);
    //               }
    //             );
    //         } else {
    //           console.log('problem in Service sendMessage()');
    //           observer.next();
    //         }
    //       });
    //   });
    // });
    return this.http.post<Message>(this.messageURL + '/' + id, message);
  }

  getMessages(channelId: string): Observable<string[]> {
    // return new Observable<string[]>(observer => {
    //   this.auth.user.subscribe(user => {
    //     user && user.getIdToken().then(token => {
    //         if (user && token) {
    //           this.http.get<string[]>(this.channelURL + '/' + channelId, httpOptionsWithAuthToken(token))
    //             .subscribe((messages) => {
    //               observer.next(messages);
    //             });
    //         }else{
    //           observer.next([]);
    //         }
    //       });
    //   });
    // });

    return this.http.get<string[]>(this.channelURL + '/' + channelId);
  }
}
