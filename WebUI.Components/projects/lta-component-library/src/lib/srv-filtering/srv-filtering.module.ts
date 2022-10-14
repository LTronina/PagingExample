import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SrvFilteringComponent } from './srv-filtering.component';

@NgModule({
  declarations: [SrvFilteringComponent],
  imports: [CommonModule, FormsModule],
  exports: [SrvFilteringComponent],
})
export class SrvFilteringModule {}
