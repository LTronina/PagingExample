import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SrvSortingComponent } from './srv-sorting.component';



@NgModule({
  declarations: [
    SrvSortingComponent
  ],
  imports: [
    CommonModule
  ]
  ,exports:[SrvSortingComponent]
})
export class SrvSortingModule { }
