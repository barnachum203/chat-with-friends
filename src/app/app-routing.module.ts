import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';
import { HomeComponent } from './components/home/home.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'chat',
    component: ChatContainerComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'chat/:roomId',
    component: ChatContainerComponent,
    canActivate: [AuthGuardService],
  },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
