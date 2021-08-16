import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Channel } from 'src/app/models/channel.interface';
import { ChannelService } from 'src/app/services/channel.service';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css'],
})
export class MembersListComponent implements OnInit, OnChanges {
  channels: Channel[] = [];
  users: string[] | undefined = [];
  @Input() channel: Channel | undefined;

  constructor(private channelService: ChannelService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.renderUsers();
  }

  private renderUsers() {
    this.channelService
      .getAllUsers()
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
        data.forEach((element) => {
          if (element.id == this.channel?.id) {
            this.users = element.users;
          }
        });
      });
  }

  ngOnInit(): void {}
}
