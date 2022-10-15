import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITableWithFiltering } from './srv-filtering.interfaces';

@Component({
  selector: 'lib-srv-filtering',
  templateUrl: './srv-filtering.component.html',
  styleUrls: ['./srv-filtering.component.scss'],
})
export class SrvFilteringComponent implements OnInit {
  @Input()
  public get config(): ITableWithFiltering<any> {
    return this._config;
  }
  public set config(value: ITableWithFiltering<any>) {
    if (this._config == null) {
      this._config = value;
    }
  }

  @Output() filterChange = new EventEmitter<any>();

  ngOnInit(): void {}

  private _config!: ITableWithFiltering<any>;

  filterChanged() {
    this.filterChange.emit(this?.config?.columns);
  }

  clearFilter() {
    if (!this.config.showFilter) {
      this.config.columns.forEach((element) => {
        element.filter.values[0] = '';
      });
      this.filterChanged();
    }
  }
}
