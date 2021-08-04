import { User } from "./user.inteface";

export interface Message{
    // messageId: string;
    message: string;
    timeStamp: number;
    user: string | undefined;
    
}