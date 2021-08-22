import { Message } from './message.interface';
import { User } from './user.inteface';

export interface Channel {
  id?: string;
  name: string;
  users?: string[];
  pass?: string;
  messages?: Message[];
  creatorId: string;
}
