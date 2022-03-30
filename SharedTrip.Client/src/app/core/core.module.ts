import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { TripsComponent } from './trips/trips.component';
import { HomeComponent } from './home/home.component';
import { BooleanPipe } from 'src/pipes/boolean.pipe';



@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent,
    TripsComponent,
    HomeComponent,
    BooleanPipe
],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    HeaderComponent, 
    FooterComponent,
    TripsComponent]
})
export class CoreModule { }
