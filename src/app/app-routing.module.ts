import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherOverviewComponent } from './pages/weather-overview/weather-overview.component';

const routes: Routes = [
  { path: '', redirectTo: '/weather-overview', pathMatch: 'full' },
  { path: 'weather-overview', component: WeatherOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
