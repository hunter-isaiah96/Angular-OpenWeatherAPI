import { Component } from "@angular/core";
import * as moment from "moment";
import { WeatherApiService } from "./service/weather-api.service";
import { ForecastModel } from "./models/forecast";
import { catchError } from "rxjs/operators";
import { handleError } from "./errorHandler";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  moment = moment;
  title = "weather-app";
  forecast: ForecastModel = new ForecastModel();
  date = moment().format(`hh:mm - dddd, D MMM 'YY`);
  menuOpen = false;

  constructor(private weatherService: WeatherApiService) {}

  ngOnInit() {
    this.weatherService
      .getForecast(!!navigator.geolocation)
      .pipe(catchError(handleError))
      .subscribe(forecast => (this.forecast = forecast));
  }

  getWeatherData(form) {
    this.weatherService
      .getForecast(false, { zip: form.form.value.zip })
      .pipe(catchError(handleError))
      .subscribe(forecast => (this.forecast = forecast));
  }
}
