import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SrvPaginationModule } from '../../node_modules/lta-component-library/public-api';




@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule,SrvPaginationModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
