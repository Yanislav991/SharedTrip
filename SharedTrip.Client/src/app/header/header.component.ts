import { Component, OnInit } from '@angular/core';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }
  logout(){
    this.auth.logout();
  }
  get isLogged(){
    return this.auth.getToken() !=null;
  }

}
