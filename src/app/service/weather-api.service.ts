import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ForecastModel } from "../models/forecast";
import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class WeatherApiService {
  constructor(private http: HttpClient) {}

  url =
    "https://api.openweathermap.org/data/2.5/forecast/daily?&units=imperial&appId=2f700b156c75ca2109da827f99465c40";

  getForecast = (
    geoLocation: boolean = false,
    params: Object = { zip: "07104" }
  ): Observable<ForecastModel> => {
    // Check for GeoLocation/Navigator API
    if (geoLocation) {
      // Create Observable for GeoLocation/Navigator coordinates
      const geolocation = Observable.create((sub: any) => {
        navigator.geolocation.getCurrentPosition(position => {
          sub.next(position["coords"]);
          sub.complete();
        });
      });
      // Chain Observables
      return geolocation.pipe(
        mergeMap((position: any) =>
          // Checking if coordinates exist, if not use the default api call
          position.latitude
            ? this.callApi({
                lat: position["latitude"],
                lon: position["longitude"]
              })
            : this.callApi({ zip: params["zip"] })
        )
      );
    }
    // If geolocation is false use the default api call
    return this.callApi({ zip: params["zip"] });
  };

  callApi = (params: any): Observable<ForecastModel> =>
    this.http.get<ForecastModel>(this.url, { params: params });
}
