import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Channel } from 'src/app/models/channel.interface';
import { map } from 'rxjs/internal/operators/map';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css'],
})
export class MembersListComponent implements OnInit, OnChanges {
  channels: Channel[] = [];
  users: string[] | undefined = [];
  @Input() channel: Channel | undefined;

  constructor(private chatService: ChatService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.renderUsers();
  }

  private renderUsers() {
    this.chatService
      .getAllUsers()
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
