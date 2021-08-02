import { User } from "./user.inteface";

export interface Message{
    messageId: string;
    content: string;
    timeStamp: Date;
    postedBy: User;
    
}