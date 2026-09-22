import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DisplayMode } from '../../models/display-mode';
import { Meal, TranslatedMeal } from '../../models/meal';
import { MealService } from '../../services/meal.service';

type TranslatableField = keyof Omit<TranslatedMeal, 'locale'>;

@Component({
    selector: 'lunch-details',
    templateUrl: './lunch-details.component.html',
    styleUrls: ['./lunch-details.component.scss'],
    standalone: false
})
export class LunchDetailsComponent implements OnInit {
  public meals$: Observable<Array<Meal>>;
  public allModes: typeof DisplayMode = DisplayMode;
  public readonly isSpanish = $localize.locale === 'es';

  constructor(private mealService: MealService) {
    this.meals$ = this.mealService.getMeals();
  }

  ngOnInit(): void {}

  // Falls back to English when the locale isn't 'es' or a translation hasn't arrived yet.
  public localize<K extends TranslatableField>(meal: Meal, field: K): Meal[K] {
    const translation = this.isSpanish ? meal.translations?.find((t) => t.locale === 'es') : undefined;
    return (translation?.[field] ?? meal[field]) as Meal[K];
  }

  public imageLoaded(id: string): void {
    this.mealService.setLoaded(id);
  }

  public remove(id: string): void {
    this.mealService.removeMeal(id);
  }

  public toggleMode(mealId: string): void {
    this.mealService.toggleDisplayMode(mealId);
  }
}
