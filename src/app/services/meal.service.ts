import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ingredient, Meal } from '../models/meal';
import { MealResponse } from '../models/meal-response';
import { DisplayMode } from '../models/display-mode';
@Injectable({
  providedIn: 'root',
})
export class MealService {
  private meals$: BehaviorSubject<Array<Meal>>;

  constructor(private http: HttpClient) {
    this.meals$ = new BehaviorSubject<Meal[]>([]);
  }

  public generateLunchIdea(): void {
    this.http
      .get<Meal>('https://meal-api-rho.vercel.app/api/random-from-db')
      .subscribe((response: Meal) => this.setMeals(response));
  }

  public getMeals(): Observable<Array<Meal>> {
    return this.meals$ as Observable<Array<Meal>>;
  }

  public removeMeal(id: string): void {
    const meals = this.getMealsValue();
    const filtered = meals.filter((meal) => meal.idMeal !== id);

    this.setMealsValue(filtered);
  }

  public setLoaded(id: string): void {
    const meals = this.getMealsValue();
    const updated = meals.find((meal) => meal.idMeal === id);

    if (updated) {
      updated.isLoading = false;
    }

    this.setMealsValue(meals);
  }

  public toggleDisplayMode(mealId: string): void {
    const meals = this.getMealsValue();
    const meal = meals.find(item => item.idMeal === mealId);

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
    meal.searchUrl = this.prepareSearchUrl(meal.strMeal);
    meal.isLoading = true;
    meal.ingredients = this.populateIngredients(meal);
    meal.displayMode = DisplayMode.Image;

    this.setMealsValue([meal, ...this.getMealsValue()]);
  }

  private populateIngredients(meal: Meal): Ingredient[] {
    const emptyValues = ['', null];

    return Array.from({ length: 20 }, (skip, index) => index + 1)
      .filter(
        (index) =>
          !emptyValues.some((ev) => ev === meal[`strIngredient${index}`])
      )
      .map((index) => {
        return {
          name: meal[`strIngredient${index}`]?.trim(),
          quantity: meal[`strMeasure${index}`]?.trim(),
        };
      });
  }

  private setMealsValue(meals: Array<Meal>): void {
    this.meals$.next(meals);
  }

  private getMealsValue(): Array<Meal> {
    return this.meals$.getValue();
  }

  private prepareSearchUrl(name: string): string {
    const query = name.split(' ').join('+');

    return `https://www.google.com/search?q=order+online+${query}`;
  }
}
