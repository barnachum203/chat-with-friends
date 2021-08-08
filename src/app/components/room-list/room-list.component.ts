import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Channel } from 'src/app/models/channel.interface';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent implements OnInit {
  channels: Channel[] = [];
  @Output() channelChoosen = new EventEmitter<Channel>();

  constructor(private channelService: ChannelService) {}

  ngOnInit(): void {
    this.getAllChannels();
  }

  choosenChannel(channel: Channel) {
    this.channelChoosen.emit(channel);
  }

  addChannel() {
    console.log('Add room called');
  }

  private getAllChannels(): void {
    this.channelService
      .getAllChannels()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.channels = data;
        console.log(`channels found: ${data.length}`);
      });
  }
}
