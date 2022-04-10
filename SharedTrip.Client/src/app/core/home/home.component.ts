import { Component, OnInit } from '@angular/core';
import { WeatherStatisticsService } from 'src/services/weather-statistics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public weatherData!: any;
  public Kelvin: number = 273;
  constructor(private weather: WeatherStatisticsService) {
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((pos) => {
      var key: string = '52b6d75929b03ed3144cc6e333f2de81'
      var path: string = `http://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${key}`
      this.weather.getWeatherData(path).subscribe(res => {
        this.weatherData = res
        this.weatherData.main.temp = Math.round(res.main.temp - this.Kelvin)
        this.weatherData.main.temp_max = Math.round(res.main.temp_max - this.Kelvin)
        this.weatherData.main.temp_min = Math.round(res.main.temp_min - this.Kelvin)
        console.log(this.weatherData)
      })
    })
  }
  get isDataLoaded() {
    return this.weatherData != null;
  }
}



