import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetResponse } from './shared/interfaces';
import { ISrvPagination } from './shared/srv-pagination/srv-pagination.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  itemsFiltered: GetWeatherForecastResponseDto[] = [];
  weatherURL: string = 'https://localhost:7248/WeatherForecast';
  pagination!: ISrvPagination;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getWeather(1);
  }

  private getWeather(page: number) {
    const params = new HttpParams()
      .append('Metadata.PageSize', 10)
      .append('Metadata.CurrentPage', page);

    this.http
      .get<GetWeatherForecastResponse>(this.weatherURL, { params })
      .subscribe((response) => {
        this.itemsFiltered = response.items;
        this.pagination = response.metadata;
      });
  }

  pageChanged(page: number) {
    this.getWeather(page);
  }
}

export interface GetWeatherForecastResponse
  extends GetResponse<GetWeatherForecastResponseDto> {}

export interface GetWeatherForecastResponseDto {
  id: number;
  date: Date;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
