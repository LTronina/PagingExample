import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ISrvPaginationResponse } from 'lta-component-library';
import { catchError } from 'rxjs';
import { GetWeatherForecastResponse, GetWeatherForecastResponseDto, IWeatherQuery } from './weather/weather.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  itemsFiltered: GetWeatherForecastResponseDto[] = [];
  weatherURL: string = 'https://localhost:55000/WeatherForecast';
  pagination!: ISrvPaginationResponse;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getWeather({
      currentPage: 1,
      pageSize: 10,
    });
  }

  public getWeather(query: IWeatherQuery) {
    this.itemsFiltered = [];
    let params = new HttpParams()
      .append('Metadata.PageSize', query.pageSize)
      .append('Metadata.CurrentPage', query.currentPage);

    if (query.filter) {
      params = params.appendAll({ Summaries: [query.filter] });
    }

    if (query.sortingParams) {
      Object.entries(query.sortingParams).forEach(([key, value], index) => {
        params = params.append(`Sorting[${key}]`, value);
      });
    }

    this.http
      .get<GetWeatherForecastResponse>(this.weatherURL, { params })
      .pipe(
        catchError((error) => {
          console.log('Error: ' + error);
          throw error;
        })
      )
      .subscribe((response) => {
        this.itemsFiltered = response.items;

        this.pagination = response.metadata;
      });
  }
}
