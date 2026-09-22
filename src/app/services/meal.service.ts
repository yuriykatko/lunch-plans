import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ingredient, Meal } from '../models/meal';
import { DisplayMode } from '../models/display-mode';
import { environment } from '../../environments/environment';
import { NotificationService } from './notification.service';
import { TranslationService } from './translation.service';
@Injectable({
  providedIn: 'root',
})
export class MealService {
  private meals$: BehaviorSubject<Array<Meal>>;

  constructor(private http: HttpClient,
              private notificationService: NotificationService,
              private translationService: TranslationService) {
    this.meals$ = new BehaviorSubject<Meal[]>([]);
  }

  public generateLunchIdea(): void {
    this.http
      .get<Meal>(`${environment.apiUrl}/api/random-from-db`)
      .pipe(
        catchError(() => {
          this.notificationService.showNotification($localize`Failed to get lunch idea. Please try again.`);
          return EMPTY;
        })
      )
      .subscribe((response: Meal) => this.setMeals(response));
  }

  public getMeals(): Observable<Array<Meal>> {
    return this.meals$ as Observable<Array<Meal>>;
  }

  public removeMeal(id: string): void {
    const meals = this.getMealsValue();
    const filtered = meals.filter((meal) => meal.idmeal !== id);

    this.setMealsValue(filtered);
    this.notificationService.showNotification($localize`Meal deleted!`);
  }

  public setLoaded(id: string): void {
    const meals = this.getMealsValue();
    const updated = meals.find((meal) => meal.idmeal === id);

    if (updated) {
      updated.isLoading = false;
    }

    this.setMealsValue(meals);
  }

  public toggleDisplayMode(mealId: string): void {
    const meals = this.getMealsValue();
    const meal = meals.find(item => item.idmeal === mealId);

    switch (meal?.displayMode) {
      case DisplayMode.Image:
        meal.displayMode = DisplayMode.Ingredients;
        break;
      case DisplayMode.Ingredients:
        meal.displayMode = DisplayMode.Image;
        break;
      default:
        break;
    }

    this.setMealsValue(meals);
  }

  private setMeals(meal: Meal): void {
    meal.searchurl = this.preparesearchurl(meal.strmeal);
    meal.isLoading = true;
    meal.ingredients = this.populateIngredients(meal);
    meal.displayMode = DisplayMode.Image;

    meal = this.addTranslations(meal);

    this.setMealsValue([meal, ...this.getMealsValue()]);
  }

  private addTranslations(meal: Meal): Meal {
    meal.translations = [];

    // Fire-and-forget: meal is already shown in English; translation arrives and re-renders later.
    this.translateMeal(meal).catch(() => undefined);

    return meal;
  }

  private async translateMeal(meal: Meal): Promise<void> {
    const [strmeal, strcategory, strarea, strinstructions, ingredients] = await Promise.all([
      this.translationService.translateText(meal.strmeal),
      this.translationService.translateText(meal.strcategory),
      this.translationService.translateText(meal.strarea),
      this.translationService.translateText(meal.strinstructions),
      this.translateIngredients(meal.ingredients),
    ]);

    meal.translations = [
      ...meal.translations,
      { locale: 'es', strmeal, strcategory, strarea, strinstructions, ingredients },
    ];

    this.setMealsValue(this.getMealsValue());
  }

  private translateIngredients(ingredients: Array<Ingredient>): Promise<Array<Ingredient>> {
    return Promise.all(
      ingredients.map(async (ingredient) => ({
        name: await this.translationService.translateText(ingredient.name),
        quantity: await this.translationService.translateText(ingredient.quantity),
      }))
    );
  }

  private populateIngredients(meal: Meal): Ingredient[] {
    return Array.from({ length: 20 }, (skip, index) => index + 1)
      .map((index) => {
        return {
          name: meal[`stringredient${index}`]?.trim(),
          quantity: meal[`strmeasure${index}`]?.trim(),
        };
      })
      .filter(ing => Boolean(ing.name));
  }

  private setMealsValue(meals: Array<Meal>): void {
    this.meals$.next(meals);
  }

  private getMealsValue(): Array<Meal> {
    return this.meals$.getValue();
  }

  private preparesearchurl(name: string): string {
    const query = name.split(' ').join('+');

    return `https://www.google.com/search?q=order+online+${query}`;
  }
}
