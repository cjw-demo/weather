import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  catchError,
  EMPTY,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  of,
  shareReplay,
  switchMap,
  toArray
} from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';
import {
  CityInfo,
  GeoCodeInfo
} from 'src/app/shared/interfaces/location.interface';
import {
  WeatherDisplay,
  WeatherResponse
} from 'src/app/shared/interfaces/weather.interface';

const LOCATIONS: CityInfo[] = [
  { city: 'London', country: 'GB' },
  { city: 'Paris', country: 'FR' },
  { city: 'New York', country: 'USA' },
  { city: 'Los Angeles', country: 'USA' },
  { city: 'Tokyo', country: 'JP' }
];

@Component({
  selector: 'app-overview',
  templateUrl: './weather-overview.component.html',
  styleUrls: ['./weather-overview.component.scss']
})
export class WeatherOverviewComponent implements OnInit {
  constructor(
    private weatherServive: WeatherService,
    private route: ActivatedRoute
  ) {}

  error = false;
  weather$!: Observable<WeatherDisplay[]>;

  ngOnInit(): void {
    this.weather$ = this.route.queryParams.pipe(
      switchMap((params: any) => {
        return from(LOCATIONS).pipe(
          mergeMap((location: CityInfo) => {
            return forkJoin([
              of(location),
              this.weatherServive.getGeoCode(location, params.app_id)
            ]).pipe(
              switchMap(([location, geoCode]: [CityInfo, GeoCodeInfo[]]) => {
                return this.weatherServive
                  .getWeather(geoCode[0].lat, geoCode[0].lon, params.app_id)
                  .pipe(
                    map((weatherResponse: WeatherResponse) => ({
                      location: location.city,
                      weather: {
                        pop: weatherResponse.hourly[0].pop * 100,
                        temp: Math.round(weatherResponse.hourly[0].temp),
                        humidity: weatherResponse.hourly[0].humidity
                      }
                    }))
                  );
              })
            );
          }),
          toArray(),
          catchError(() => {
            this.error = true;
            return EMPTY;
          })
        );
      }),
      shareReplay()
    );
  }
}
