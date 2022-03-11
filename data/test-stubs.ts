import { Observable, of } from 'rxjs';
import mockGeoData from './location.json';
import mockWeatherData from './weather.json';

export const MOCKGEODATA = mockGeoData;
export const MOCKWEATHERDATA = mockWeatherData;

export class WeatherServiceStub {
  getGeoCode(city: any): Observable<any> {
    return of(MOCKGEODATA);
  }
  getWeather(lat: string, lon: string): Observable<any> {
    return of(MOCKWEATHERDATA);
  }
}
