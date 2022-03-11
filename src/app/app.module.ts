import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherOverviewComponent } from './pages/weather-overview/weather-overview.component';
import { WeatherPanelComponent } from './shared/components/weather-panel/weather-panel.component';

@NgModule({
  declarations: [AppComponent, WeatherOverviewComponent, WeatherPanelComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
