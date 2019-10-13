import { Component } from '@angular/core';
import { WeatherApiService } from './service/weather-api.service';
import { WeatherModel } from './models/weather';
import { ForecastModel } from './models/forecast';
import * as moment from 'moment';
import * as _ from 'lodash'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  moment = moment
  title = 'weather-app'
  forecast: ForecastModel
  date = moment().format(`hh:mm - dddd, D MMM 'YY`)
  

  constructor(weatherService: WeatherApiService) {
    this.forecast = weatherService.getForecast()
    setInterval(() => this.date = moment().format(`hh:mm - dddd, D MMM 'YY`), 1000)
  }


}
