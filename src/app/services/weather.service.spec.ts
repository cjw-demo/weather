import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MOCKGEODATA, MOCKWEATHERDATA } from 'data/test-stubs';
import { GeoCodeInfo } from '../shared/interfaces/location.interface';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return geo codes from getGeoCode', () => {
    service
      .getGeoCode({ city: 'London', country: 'GB' }, '123456')
      .subscribe((response: GeoCodeInfo[]) =>
        expect(response).toEqual(MOCKGEODATA)
      );

    const req = httpMock.expectOne(
      'http://api.openweathermap.org/geo/1.0/direct?q=London,,GB&limit=1&appid=123456'
    );

    expect(req.request.method).toEqual('GET');

    req.flush(MOCKGEODATA);
  });

  it('should return weather from getWeather', () => {
    service
      .getWeather(0, 1, '123456')
      .subscribe((response) => expect(response).toEqual(MOCKWEATHERDATA));

    const req = httpMock.expectOne(
      'https://api.openweathermap.org/data/2.5/onecall?lat=0&lon=1&exclude=current,minutely,daily,alerts&units=metric&appid=123456'
    );

    expect(req.request.method).toEqual('GET');

    req.flush(MOCKWEATHERDATA);
  });
});
