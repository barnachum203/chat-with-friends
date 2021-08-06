import { Component, OnInit, Output , EventEmitter } from '@angular/core';
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
    this.getChannels();
  }

  async getChannels(){
    this.channelService.getChannels().subscribe((data: any[]) =>{
      if(data){
        console.log(data);
        
      data.forEach((channel: Channel) => {
        this.channels.push(channel)
      });
      console.log(this.channels);
      
    }else{
      console.log("No data in channels");
      
    }
    })
  }


  choosenChannel(channel:Channel){
// console.log(channel);

    this.channelChoosen.emit(channel);
  }
}
