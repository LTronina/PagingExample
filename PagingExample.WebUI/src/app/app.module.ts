import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WeatherModule } from './weather/weather.module';





@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule,WeatherModule],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule {}
