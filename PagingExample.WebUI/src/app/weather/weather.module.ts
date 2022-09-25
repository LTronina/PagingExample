import { NgModule } from '@angular/core';
import { WeatherComponent } from './weather.component';
import { SrvPaginationModule, SrvSortingModule } from 'lta-component-library';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [WeatherComponent],
  imports: [CommonModule, FormsModule, SrvSortingModule, SrvPaginationModule],
  exports: [WeatherComponent],
})
export class WeatherModule {}
