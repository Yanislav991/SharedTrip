import { Component, OnInit } from '@angular/core';
import { IMessage } from 'src/interfaces/IMessage';
import { AuthService } from 'src/services/auth.service';
import { ChatService } from 'src/services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService, private auth:AuthService) {}

  ngOnInit(): void {
    this.chatService.retrieveMappedObject().subscribe( (receivedObj: IMessage) => { this.addToInbox(receivedObj);});   
    this.msgDto.Username = "yani" // get username                                        
  }

  msgDto: IMessage = new IMessage();
  msgInboxArray: IMessage[] = [];

  send(): void {
    if(this.msgDto) {
      if(this.msgDto.MessageText.length == 0){
        alert("Enter a message");
        return;
      } else {
        this.chatService.broadcastMessage(this.msgDto);
      }
    }
  }

  addToInbox(obj: IMessage) {
    let newObj: IMessage = new IMessage();
    newObj.Username = obj.Username;
    newObj.MessageText = obj.MessageText;
    this.msgInboxArray.push(newObj);

  }
}

