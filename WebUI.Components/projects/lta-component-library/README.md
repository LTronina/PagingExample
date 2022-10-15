# LtaComponentLibrary

Small lib for Angular with few components paging, sorting etc

# Usage

## Sorting

<th lib-srv-sorting [name]="'TemperatureC'" (onSorting)="Sort($event)">
          TemperatureC
        </th>

## Pagination

<lib-srv-pagination
[config]="vm.metadata"
(pageChanged)="pageChanged($event)"
[pageSizes]="[5, 10, 15, 20]"
class="srv-pagination"
[translation]="pagingSTranslation" ></lib-srv-pagination>

## Filtering

<lib-srv-filtering
[config]="vm.config"
(filterChange)="filterChangedHandler($event)" >

<tbody>
<tr *ngFor="let item of vm.clients">
<td *ngFor="let column of vm.config.columns">
{{ item[column.name] }}
</td>
</tr>
</tbody>

## in case of local development

//lib side
ng build --project=lta-component-library --watch

//in consumer
npm link lta-component-library
angular.json "preserveSymlinks": true,

#publish package
ng build --project=lta-component-library -c=production
#increment version
npm login
cd .\dist\lta-component-library\
npm publish
