import { Component, Input } from '@angular/core';
import { WeatherDisplay } from '../../interfaces/weather.interface';

@Component({
  selector: 'app-weather-panel',
  templateUrl: './weather-panel.component.html',
  styleUrls: ['./weather-panel.component.scss']
})
export class WeatherPanelComponent {
  @Input() cityWeather!: WeatherDisplay;
}
