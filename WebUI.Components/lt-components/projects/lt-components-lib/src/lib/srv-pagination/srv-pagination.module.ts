import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SrvPaginationComponent } from './srv-pagination.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SrvPaginationComponent],
  imports: [
    CommonModule,FormsModule

  ],
  exports:[SrvPaginationComponent]
})
export class SrvPaginationModule { }
