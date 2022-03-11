import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MOCKGEODATA, WeatherServiceStub } from 'data/test-stubs';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';
import { WeatherPanelComponent } from 'src/app/shared/components/weather-panel/weather-panel.component';
import { WeatherOverviewComponent } from './weather-overview.component';

const LOCATIONS = [
  { city: 'London', country: 'GB' },
  { city: 'Paris', country: 'FR' },
  { city: 'New York', country: 'USA' },
  { city: 'Los Angeles', country: 'USA' },
  { city: 'Tokyo', country: 'JP' }
];

describe('OverviewComponent', () => {
  let component: WeatherOverviewComponent;
  let fixture: ComponentFixture<WeatherOverviewComponent>;
  let weatherServive: WeatherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WeatherOverviewComponent,
        MockComponent(WeatherPanelComponent)
      ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: WeatherService, useClass: WeatherServiceStub },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ app_id: '123456' })
          }
        }
      ]
    }).compileComponents();

    weatherServive = TestBed.inject(WeatherService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherOverviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call location endpoint 5 times with different data', () => {
    const spy = spyOn(weatherServive, 'getGeoCode').and.callThrough();

    fixture.detectChanges();

    expect(spy.calls.allArgs()).toEqual([
      [{ city: 'London', country: 'GB' }, '123456'],
      [{ city: 'Paris', country: 'FR' }, '123456'],
      [{ city: 'New York', country: 'USA' }, '123456'],
      [{ city: 'Los Angeles', country: 'USA' }, '123456'],
      [{ city: 'Tokyo', country: 'JP' }, '123456']
    ]);
  });

  it('should call weather endpoint 5 times with different data', () => {
    MOCKGEODATA.map((element) => ({ ...element, lat: 0, lon: 1 }));

    spyOn(weatherServive, 'getGeoCode').and.returnValues(
      of(MOCKGEODATA.map((element) => ({ ...element, lat: 0, lon: 1 }))),
      of(MOCKGEODATA.map((element) => ({ ...element, lat: 2, lon: 3 }))),
      of(MOCKGEODATA.map((element) => ({ ...element, lat: 4, lon: 5 }))),
      of(MOCKGEODATA.map((element) => ({ ...element, lat: 6, lon: 7 }))),
      of(MOCKGEODATA.map((element) => ({ ...element, lat: 8, lon: 9 })))
    );
    const spy = spyOn(weatherServive, 'getWeather').and.callThrough();

    fixture.detectChanges();

    expect(spy.calls.allArgs()).toEqual([
      [0, 1, '123456'],
      [2, 3, '123456'],
      [4, 5, '123456'],
      [6, 7, '123456'],
      [8, 9, '123456']
    ]);
  });

  it('should build weather$ observable with location and hourly weather', () => {
    spyOn(weatherServive, 'getGeoCode').and.callThrough();
    spyOn(weatherServive, 'getWeather').and.callThrough();

    fixture.detectChanges();

    component.weather$.subscribe((weatherData) => {
      weatherData.forEach((e: any, i: number) => {
        expect(e).toEqual({
          location: LOCATIONS[i].city,
          weather: {
            temp: 10,
            humidity: 77,
            pop: 0
          }
        });
      });
    });
  });
});
