import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {
  MatBottomSheetModule
} from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  BrowserModule,
  HammerModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { IdeaGeneratorComponent } from './components/idea-generator/idea-generator.component';
import { LunchDetailsComponent } from './components/lunch-details/lunch-details.component';
import { MealService } from './services/meal.service';
import { NotificationService } from './services/notification.service';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { LocaleListComponent } from './components/locale-list/locale-list.component';

import * as hammer from 'hammerjs';

export class LunchPlansSwipeConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { direction: hammer.DIRECTION_HORIZONTAL },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    IdeaGeneratorComponent,
    LunchDetailsComponent,
    IngredientsComponent,
    LocaleListComponent
  ],
  bootstrap: [AppComponent], imports: [BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    MatSnackBarModule
  ], providers: [
    MealService,
    NotificationService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: LunchPlansSwipeConfig,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ]
})
export class AppModule { }
