import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/internal/operators/map';
import { DialogComponent } from 'src/app/components/room-list/dialog/dialog.component';
import { Channel } from 'src/app/models/channel.interface';
import { Message } from 'src/app/models/message.interface';
import { ChannelService } from 'src/app/services/channel.service';

export interface DialogData {
  name: string;
  pass: string;
  userId: string;
}

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent implements OnInit {
  channels: Channel[] = [];
  userId: string | null = '';
  pass: string = '';
  name: string = '';

  welcomeMsg: Message = {
    message: 'Welcome To B-Chat, fill free to invite your friends!',
    timeStamp: Date.now(),
    from: 'System',
    userId: '0000',
  };
  @Output() channelChoosen = new EventEmitter<Channel>();

  constructor(
    private channelService: ChannelService,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { name: this.name, pass: this.pass, userId: this.userId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.pass = result.pass;
      // this.name = result.name;
      const channel: Channel = {
        name: result.name,
        users: [],
        pass: result.pass || '',
        messages: [this.welcomeMsg],
        creatorId: result.userId,
      };

      this.addChannel(channel);
    });
  }

  ngOnInit(): void {
    this.getAllChannels();
  }

  choosenChannel(channel: Channel) {
    this.channelChoosen.emit(channel);
  }

  addChannel(channel: Channel) {
    // console.log('Add room called');
    this.channelService.addChannel(channel).subscribe(() => {});
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
