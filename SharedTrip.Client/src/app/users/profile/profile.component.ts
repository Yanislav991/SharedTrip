import { Component, OnInit } from '@angular/core';
import { IProfile } from 'src/interfaces/IProfile';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profile!:IProfile;
  public editMode:boolean = false;
  public noProfilePictureImage : string = 'https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png'
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe(user=>{
      this.profile = user;
      if(this.profile.avatarUrl==""){
        this.profile.avatarUrl = this.noProfilePictureImage;
      }
    })
  }
  toggleEdit(){
    this.editMode= !this.editMode;
  }
}
