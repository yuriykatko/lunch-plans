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
    const filtered = meals.filter((meal) => meal.idmeal !== id);

    this.setMealsValue(filtered);
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

    this.setMealsValue([meal, ...this.getMealsValue()]);
  }

  private populateIngredients(meal: Meal): Ingredient[] {
    return Array.from({ length: 20 }, (skip, index) => index + 1)      
      .map((index) => {
        return {
          name: meal[`stringredient${index}`]?.trim(),
          quantity: meal[`strmeasure${index}`]?.trim(),
        };
      })
      .filter(ing => ing.name !== '');
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
