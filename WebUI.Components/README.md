# LtaComponentLibrary
Small lib for Angular with few components paging, sorting etc



# Usage 

Sorting
   <th lib-srv-sorting [name]="'TemperatureC'" (onSorting)="Sort($event)">
          TemperatureC
    </th>

Filtering 
<lib-srv-pagination
    [config]="pagination"
    (pageChanged)="pageChanged($event)"
    [pageSizes]="[5, 10, 15, 20]"
    class="srv-pagination"
    [translation]="pagingSTranslation"
  ></lib-srv-pagination>


## Development server
ng build --project=lta-component-library --watch
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.3.
