import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityInfo, GeoCodeInfo } from '../shared/interfaces/location.interface';
import { WeatherResponse } from '../shared/interfaces/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getGeoCode(cityInfo: CityInfo, appId: string): Observable<GeoCodeInfo[]> {
    return this.httpClient.get<GeoCodeInfo[]>(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityInfo.city},,${cityInfo.country}&limit=1&appid=${appId}`
    );
  }

  getWeather(
    lat: number,
    lon: number,
    appId: string
  ): Observable<WeatherResponse> {
    return this.httpClient.get<WeatherResponse>(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${appId}`
    );
  }
}
