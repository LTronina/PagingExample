import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetResponse } from './shared/interfaces';
import {
  IPaginationQuery,
  ISrvPaginationResponse,
  PaginationTranslation,
} from 'lta-component-library';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  itemsFiltered: GetWeatherForecastResponseDto[] = [];
  weatherURL: string = 'https://localhost:55000/WeatherForecast';
  pagination!: ISrvPaginationResponse;
  pagingSTranslation: PaginationTranslation;
  @Input() filter: string = '';

  constructor(private http: HttpClient) {
    var tr = new PaginationTranslation();
    tr.pageInputTooltip = 'Wpisz wartość i naciśnij Enter';
    tr.pageSizeLabel = 'Rozmiar strony';
    this.pagingSTranslation = tr;
  }

  ngOnInit(): void {
    this.getWeather({ currentPage: 1, pageSize: 10 });
  }

  private getWeather(
    pagination: IPaginationQuery,
    sortingParams?: { [name: string]: string }
  ) {
    let params = new HttpParams()
      .append('Metadata.PageSize', pagination.pageSize)
      .append('Metadata.CurrentPage', pagination.currentPage);

    if (this.filter) {
      params = params.appendAll({ Summaries: [this.filter] });
    }

    if (sortingParams) {
      Object.entries(sortingParams).forEach(([key, value], index) => {
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

        this.pagination = response.metadata


      });
  }

  pageChanged(pagination: IPaginationQuery) {
    this.getWeather(pagination);
  }

  Search() {
    this.itemsFiltered = [];
    this.getWeather({ currentPage: 1, pageSize: 10 });
  }

  Sort(sortingParams: { [name: string]: string }) {
    this.itemsFiltered = [];
    this.getWeather({ currentPage: 1, pageSize: 10 }, sortingParams);
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
