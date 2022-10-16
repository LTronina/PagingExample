import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SrvFilteringComponent } from './srv-filtering.component';
import { SrvSortingModule } from '../srv-sorting/srv-sorting.module';

@NgModule({
  declarations: [SrvFilteringComponent],
  imports: [CommonModule, FormsModule, SrvSortingModule],
  exports: [SrvFilteringComponent],
})
export class SrvFilteringModule {}
