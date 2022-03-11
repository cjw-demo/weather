export interface WeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  hourly: WeatherDetail[];
}

export interface WeatherDisplay {
  location: string;
  weather: WeatherSubset;
}

export interface WeatherSubset {
  pop: number;
  temp: number;
  humidity: number;
}

interface WeatherDetail {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherMetaData[];
  pop: number;
}

interface WeatherMetaData {
  id: number;
  main: string;
  description: string;
  icon: string;
}
