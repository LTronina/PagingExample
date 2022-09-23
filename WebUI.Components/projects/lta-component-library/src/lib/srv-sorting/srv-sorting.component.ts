import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortingDir } from './srv-sorting.interfaces';

@Component({
  selector: '[lib-srv-sorting]',
  templateUrl: './srv-sorting.component.html',
  styleUrls: ['./srv-sorting.component.scss'],
})
export class SrvSortingComponent implements OnInit {
  @Input() name: string = '';
  @Output() onSorting =new EventEmitter< { [name: string]: string }>();
  sortingDir: SortingDir = SortingDir.desc;
  sortingEnum = SortingDir;
  constructor() {}

  ngOnInit(): void {}

  changeSorOrder() {
    if (this.sortingDir == this.sortingEnum.asc) {
      this.sortingDir = this.sortingEnum.desc;
    } else if (this.sortingDir == this.sortingEnum.desc) {
      this.sortingDir = this.sortingEnum.asc;
    }

   var sortingState: { [name: string]: string } = {};
   sortingState[this.name] =this.sortingDir;

    this.onSorting.emit(sortingState);
  }
}
