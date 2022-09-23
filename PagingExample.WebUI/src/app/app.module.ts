import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SrvPaginationModule,SrvSortingModule } from 'lta-component-library';




@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule,FormsModule,SrvSortingModule,SrvPaginationModule],
  providers: [],
  bootstrap: [AppComponent],
  exports:[SrvPaginationModule,SrvPaginationModule]
})
export class AppModule {}
