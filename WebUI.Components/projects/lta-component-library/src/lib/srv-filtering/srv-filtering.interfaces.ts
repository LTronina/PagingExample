export interface ITableWithFiltering<T> {
  columns: ITabColumn<T>[];
  showFilter: boolean;
}

export interface ITabColumn<T> {
  name: keyof T & string;
  filterColumn: boolean;
  enableSort: boolean;
  filter: { values: string[] };
  style?: { [klass: string]: any };
}
