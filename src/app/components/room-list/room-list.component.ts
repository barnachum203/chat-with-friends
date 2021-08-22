import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { DialogComponent } from 'src/app/components/room-list/dialog/dialog.component';
import { Channel } from 'src/app/models/channel.interface';
import { Message } from 'src/app/models/message.interface';
import { ChatService } from 'src/app/services/chat.service';

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
  channels$: Observable<Channel[]>;
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

  constructor(private chatService: ChatService, public dialog: MatDialog) {
    this.channels$ = this.chatService.getAllChannels();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { name: this.name, pass: this.pass, userId: this.userId },
    });

    dialogRef.afterClosed().subscribe((result) => {
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

  ngOnInit(): void {}

  choosenChannel(channel: Channel) {
    this.channelChoosen.emit(channel);
  }

  addChannel(channel: Channel) {
    this.chatService.addChannel(channel).subscribe(() => {});
  }
}
