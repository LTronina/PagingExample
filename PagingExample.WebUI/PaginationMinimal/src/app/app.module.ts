import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SrvPaginationModule } from 'lta-component-library';




@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule,SrvPaginationModule],
  providers: [],
  bootstrap: [AppComponent],
  exports:[SrvPaginationModule]
})
export class AppModule {}
