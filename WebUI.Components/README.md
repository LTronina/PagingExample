# LtaComponentLibrary

Small lib for Angular with few components paging, sorting etc

# Usage

Sorting

<th lib-srv-sorting [name]="'TemperatureC'" (onSorting)="Sort($event)">
          TemperatureC
</th>

Pagination

<lib-srv-pagination
[config]="pagination"
(pageChanged)="pageChanged($event)"
[pageSizes]="[5, 10, 15, 20]"
class="srv-pagination"
[translation]="pagingSTranslation"

> </lib-srv-pagination>

Filtering

<lib-srv-filtering
[config]="vm.config"
(filterChange)="filterChangedHandler($event)" >

<tbody>
 your table 
</tbody>
</lib-srv-filtering>

## Development server

ng build --project=lta-component-library --watch
//in consumer
npm link lta-component-library
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.3.

#publish package
ng build --project=lta-component-library -c=production
npm login
cd .\dist\lta-component-library\
npm publish
