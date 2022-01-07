import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { IdeaGeneratorComponent } from './components/idea-generator/idea-generator.component';
import { LunchDetailsComponent } from './components/lunch-details/lunch-details.component';
import { MealService } from './services/meal.service';

@NgModule({
  declarations: [AppComponent, IdeaGeneratorComponent, LunchDetailsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [MealService],
  bootstrap: [AppComponent],
})
export class AppModule {}
