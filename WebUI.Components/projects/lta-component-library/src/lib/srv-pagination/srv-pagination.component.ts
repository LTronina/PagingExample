import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IPaginationQuery,
  IPaginationVM,
  PaginationTranslation,
} from './srv-pagination.interfaces';

@Component({
  selector: 'srv-pagination',
  templateUrl: './srv-pagination.component.html',
  styleUrls: ['./srv-pagination.component.scss'],
})
export class SrvPaginationComponent implements OnInit {
  @Input() translation: PaginationTranslation = new PaginationTranslation();

  @Input() get config(): IPaginationVM {
    return this._config;
  }
  set config(config: IPaginationVM) {
    this._config = config;
    this.update();
  }

  @Input() pageSizes: number[] = [5, 10, 15, 20];
  @Output() pageChanged: EventEmitter<IPaginationQuery> = new EventEmitter();
  selectedPageSize: number = this.pageSizes[0];
  currentPage: number = 0;

  private _config: IPaginationVM ={
    recordStart: 0,
    recordEnd: 0,
    totalCount: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
    currentPage: 0,
    pageSize: 0
  };

  constructor() {}
  ngOnInit(): void {}

  previousNext(direction: number, event?: MouseEvent) {
    let page: number = this.config.currentPage;
    if (direction === -1) {
      if (page > 1) {
        page--;
      }
    } else {
      if (page < this.config.totalPages) {
        page++;
      }
    }
    this.changePage(page, event);
  }

  changePageFromInput(event: Event) {
    if (this.currentPage < 1 || this.currentPage > this.config.totalPages) {
      this.currentPage = this.config.currentPage;
      return;
    }

    this.pageChanged.emit({
      currentPage: this.currentPage,
      pageSize: this.config.pageSize,
    });
  }

  changePage(page: number, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    if (this.config.currentPage === page) {
      return;
    }
    this.pageChanged.emit({
      currentPage: page,
      pageSize: this.config.pageSize,
    });
  }

  changeSize($event: Event) {
    if (this.config.pageSize === this.selectedPageSize) {
      return;
    }
    this.pageChanged.emit({
      currentPage: this.config.currentPage,
      pageSize: this.selectedPageSize,
    });
  }

  last(event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
    }
    if (!this.config) {
      return;
    }
    if (this.config.currentPage === this.config.totalPages) {
      return;
    }
    this.pageChanged.emit({
      currentPage: this.config.totalPages,
      pageSize: this.selectedPageSize,
    });
  }

  first(event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
    }

    if (!this.config) {
      return;
    }

    if (this.config.currentPage === 1) {
      return;
    }

    this.pageChanged.emit({ currentPage: 1, pageSize: this.selectedPageSize });
  }

  //regenerate pages
  update(): void {
    if (!this.config) {
      return;
    }
    this.currentPage = this.config.currentPage;
    this.selectedPageSize = this.config.pageSize;
  }
}
