import { Component } from "@angular/core";
import { WeatherApiService } from "./service/weather-api.service";
import { ForecastModel } from "./models/forecast";
import * as moment from "moment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  moment = moment;
  title = "weather-app";
  forecast: ForecastModel;
  date = moment().format(`hh:mm - dddd, D MMM 'YY`);
  menuOpen = false;

  constructor(private weatherService: WeatherApiService) {
    if (navigator.geolocation)
      this.forecast = this.weatherService.getForecastGeo();
    else this.forecast = this.weatherService.getForecast("07104");

    setInterval(
      () => (this.date = moment().format(`hh:mm - dddd, D MMM 'YY`)),
      1000
    );
  }

  getWeatherData(form) {
    this.forecast = this.weatherService.getForecast(form.form.value.zip);
  }
}
