import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Channel } from '../models/channel.interface';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  channelURL = 'http://localhost:8000/api/channel';

  constructor(private http: HttpClient) {}

  getChannels(): Observable<any[]> {
    return this.http.get<any[]>(this.channelURL);
  }

  addChannel(channel: Channel): Observable<Channel> {
    return this.http.post<Channel>(this.channelURL, channel);
  }

  getChannelById(id: string): Observable<Channel>{
    return this.http.get<Channel>(this.channelURL + id)
  }
}
