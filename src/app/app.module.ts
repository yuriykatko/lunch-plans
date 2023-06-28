import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { IdeaGeneratorComponent } from './components/idea-generator/idea-generator.component';
import { LunchDetailsComponent } from './components/lunch-details/lunch-details.component';
import { MealService } from './services/meal.service';
import { IngredientsComponent } from './components/ingredients/ingredients.component';

@NgModule({
  declarations: [AppComponent, IdeaGeneratorComponent, LunchDetailsComponent, IngredientsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [MealService],
  bootstrap: [AppComponent],
})
export class AppModule {}
