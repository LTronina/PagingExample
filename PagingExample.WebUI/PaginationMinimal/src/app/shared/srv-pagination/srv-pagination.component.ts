import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPaginationConfig } from './srv-pagination.interfaces';

@Component({
  selector: 'srv-pagination',
  templateUrl: './srv-pagination.component.html',
  styleUrls: ['./srv-pagination.component.scss'],
})
export class SrvPaginationComponent implements OnInit {
  @Input() get config(): ISrvPagination {
    return this._config;
  }
  set config(config: ISrvPagination) {
    this._config = config;
    this.update();
  }

  @Input() pageSizes: number[] = [5, 10, 15, 20];


  @Output() pageChanged: EventEmitter<IPaginationConfig> = new EventEmitter();

  pages: number[] = [];
  selectedPageSize: number = this.pageSizes[0];

  private _config!: ISrvPagination;

  constructor() { }
  ngOnInit(): void { }

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

  changePage(page: number, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    if (this.config.currentPage === page) {
      return;
    }

    this.pageChanged.emit({ page: page, pageSize: this.config.pageSize });
  }

  changeSize($event: Event) {
    if (this.config.pageSize === this.selectedPageSize) {
      return;
    }

    this.pageChanged.emit({ page: this.config.currentPage, pageSize: this.selectedPageSize });
  }




  //regenerate pages
  update(): void {
    this.pages.splice(0, this.pages.length);
    if (!this._config) {
      return;
    }

    this.selectedPageSize = this._config.pageSize;

    const slots = 5;

    if (this._config.currentPage == this.config.totalPages && this._config.currentPage == 1) {
      return;
    }

    if (this._config.currentPage == 1) {
      for (let index = 0; index < slots && index + this._config.currentPage < this._config.totalPages; index++) {
        this.pages.push(index + this._config.currentPage);
      }
    }
    else if (this._config.currentPage == this.config.totalPages) {
      for (let index = 0; index < slots && this._config.currentPage - index >= 1; index++) {
        this.pages = [this._config.currentPage - index, ...this.pages];
      }
    }
    else {

      let freeSlots = slots;
      for (let index = 0; index < Math.ceil(slots / 2) && this._config.currentPage - index >= 1; index++) {
        this.pages = [this._config.currentPage - index, ...this.pages];
        freeSlots--;
      }
      for (let index = 0; index < freeSlots && index + 1 + this._config.currentPage < this._config.totalPages; index++) {
        this.pages.push(index + 1 + this._config.currentPage);
      }


    }
  }
}

export interface ISrvPagination {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
