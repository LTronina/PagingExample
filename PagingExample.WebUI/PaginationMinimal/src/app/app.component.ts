import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetResponse } from './shared/interfaces';
import { ISrvPagination } from './shared/srv-pagination/srv-pagination.component';
import { IPaginationConfig } from './shared/srv-pagination/srv-pagination.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  itemsFiltered: GetWeatherForecastResponseDto[] = [];
  weatherURL: string = 'https://localhost:7248/WeatherForecast';
  pagination!: ISrvPagination;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getWeather({page:1,pageSize:10});
  }

  private getWeather(pagination:IPaginationConfig) {
    const params = new HttpParams()
      .append('Metadata.PageSize', pagination.pageSize)
      .append('Metadata.CurrentPage', pagination.page);

    this.http
      .get<GetWeatherForecastResponse>(this.weatherURL, { params })
      .subscribe((response) => {
        this.itemsFiltered = response.items;
        this.pagination = response.metadata;
      });
  }

  pageChanged( pagination: IPaginationConfig) {
    this.getWeather(pagination);
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
