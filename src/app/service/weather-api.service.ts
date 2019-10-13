import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherModel } from '../models/weather';
import { ForecastModel } from '../models/forecast';

@Injectable({
  providedIn: 'root'
})

export class WeatherApiService {

  private weather: WeatherModel = new WeatherModel()
  private forecast: ForecastModel = new ForecastModel()

  constructor(private http: HttpClient) {}
  url = (type: string) => `http://api.openweathermap.org/data/2.5/${type}?zip=07104&units=imperial&appid=2f700b156c75ca2109da827f99465c40`
  
  getWeather() {
    this.http.get(this.url('weather')).toPromise().then(data => Object.assign(this.weather, data))
    return this.weather
  }

  getForecast() {
    this.http.get(this.url('forecast/daily')).toPromise().then(data => Object.assign(this.forecast, data))
    return this.forecast
  }

  
  

}
