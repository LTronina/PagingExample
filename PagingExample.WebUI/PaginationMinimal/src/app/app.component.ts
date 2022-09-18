import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetResponse } from './shared/interfaces';
import { IPaginationQuery, IPaginationVM, PaginationTranslation } from '../../node_modules/lta-components-lib/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {


  itemsFiltered: GetWeatherForecastResponseDto[] = [];
  weatherURL: string = 'https://localhost:55000/WeatherForecast';
  pagination!: IPaginationVM;
  pagingSTranslation: PaginationTranslation;

  constructor(private http: HttpClient) {
    var tr = new PaginationTranslation();
    tr.pageInputTooltip = "Wpisz wartość i naciśnij Enter";
    tr.pageSizeLabel= "Rozmiar strony";
    this.pagingSTranslation = tr;

  }

  ngOnInit(): void {
    this.getWeather({ currentPage: 1, pageSize: 10 });

  }

  private getWeather(pagination: IPaginationQuery) {
    const params = new HttpParams()
      .append('Metadata.PageSize', pagination.pageSize)
      .append('Metadata.CurrentPage', pagination.currentPage);

    this.http
      .get<GetWeatherForecastResponse>(this.weatherURL, { params })
      .subscribe((response) => {
        this.itemsFiltered = response.items;

        var recStart = (response.metadata.currentPage == 1) ? 1 : response.metadata.currentPage * response.metadata.pageSize + 1 - response.metadata.pageSize;
        var recEnd = (response.metadata.currentPage == 1) ? response.metadata.pageSize : response.metadata.currentPage * response.metadata.pageSize;

        this.pagination = { ...response.metadata, recordStart: recStart, recordEnd: recEnd };

      });
  }

  pageChanged(pagination: IPaginationQuery) {
    this.getWeather(pagination);
  }
}

export interface GetWeatherForecastResponse
  extends GetResponse<GetWeatherForecastResponseDto> { }

export interface GetWeatherForecastResponseDto {
  id: number;
  date: Date;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
