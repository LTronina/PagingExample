import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IPaginationQuery,
  ISrvPaginationResponse,
  PaginationTranslation,
} from 'lta-component-library';
import {
  GetWeatherForecastResponseDto,
  IWeatherQuery,
} from './weather.interfaces';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  @Input() pagination!: ISrvPaginationResponse;
  @Input() itemsFiltered: GetWeatherForecastResponseDto[] = [];
  @Output() onPaging = new EventEmitter<IWeatherQuery>();
  filter: string = '';
  pagingSTranslation: PaginationTranslation;

  constructor() {
    var tr = new PaginationTranslation();
    tr.pageInputTooltip = 'Wpisz wartość i naciśnij Enter';
    tr.pageSizeLabel = 'Rozmiar strony';
    this.pagingSTranslation = tr;
  }

  ngOnInit(): void {}

  pageChanged(pagination: IPaginationQuery) {
    const query = { ...pagination, filter: this.filter };
    this.onPaging.emit(query);
  }

  Search() {
    this.onPaging.emit({ currentPage: 1, pageSize: 10, filter: this.filter });
  }

  Sort(sortingParams: { [name: string]: string }) {
    this.onPaging.emit({
      currentPage: 1,
      pageSize: 10,
      sortingParams: sortingParams,
      filter: this.filter,
    });
  }
}
