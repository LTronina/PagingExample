import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SrvPaginationComponent } from './srv-pagination.component';



@NgModule({
  declarations: [SrvPaginationComponent],
  imports: [
    CommonModule

  ],
  exports:[SrvPaginationComponent]
})
export class SrvPaginationModule { }
