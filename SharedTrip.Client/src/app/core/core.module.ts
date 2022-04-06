import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent,
    HomeComponent,
    NewsComponent,
    ChatComponent

],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    HeaderComponent, 
    FooterComponent]
})
export class CoreModule { }
