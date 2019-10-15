import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ForecastModel } from "../models/forecast";

@Injectable({
  providedIn: "root"
})
export class WeatherApiService {
  private forecast: ForecastModel = new ForecastModel();

  constructor(private http: HttpClient) {}

  getForecastGeo() {
    navigator.geolocation.getCurrentPosition(position => {
      this.http
        .get(
          `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=2f700b156c75ca2109da827f99465c40`
        )
        .toPromise()
        .then(data => Object.assign(this.forecast, data));
    });
    return this.forecast;
  }

  getForecast(zip: string) {
    this.http
      .get(
        `http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zip}&units=imperial&appid=2f700b156c75ca2109da827f99465c40`
      )
      .toPromise()
      .then(data => Object.assign(this.forecast, data));
    return this.forecast;
  }
}
