import { Component, Input, OnInit } from '@angular/core';
import { IProfile } from 'src/interfaces/IProfile';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor() { }
  @Input() profile!: IProfile
  ngOnInit(): void {
  }

}
