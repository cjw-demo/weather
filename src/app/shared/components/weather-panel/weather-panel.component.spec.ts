import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MOCKWEATHERDATA } from 'data/test-stubs';
import { WeatherPanelComponent } from './weather-panel.component';

describe('WeatherPanelComponent', () => {
  let component: WeatherPanelComponent;
  let fixture: ComponentFixture<WeatherPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherPanelComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherPanelComponent);
    component = fixture.componentInstance;

    component.cityWeather = {
      location: 'London',
      weather: {
        pop: MOCKWEATHERDATA.hourly[0].pop * 100,
        temp: Math.round(MOCKWEATHERDATA.hourly[0].temp),
        humidity: MOCKWEATHERDATA.hourly[0].humidity
      }
    };

    fixture.detectChanges();
  });

  it('should display city', () => {
    const weatherTitle = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(weatherTitle.innerText).toBe('London');
  });

  it('should display weather information for city', () => {
    const weatherInfo = fixture.debugElement.queryAll(
      By.css('.weather-panel .weather-panel__flex .weather-panel__text')
    );
    expect(weatherInfo[0].nativeElement.innerText).toBe('Temperature:10°');
    expect(weatherInfo[1].nativeElement.innerText).toBe('Humidity:77%');
    expect(weatherInfo[2].nativeElement.innerText).toBe('Chance of rain:0%');
  });
});
