import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Meal } from '../models/meal';
import { MealResponse } from '../models/meal-response';
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
      .get<MealResponse>('https://www.themealdb.com/api/json/v1/1/random.php')
      .subscribe((response: MealResponse) => this.setMeals(response.meals[0]));
  }

  public getMeals(): Observable<Array<Meal>> {
    return this.meals$ as Observable<Array<Meal>>;
  }

  private setMeals(meal: Meal): void {
    meal.searchUrl = this.prepareSearchUrl(meal.strMeal);

    this.meals$.next([meal, ...this.meals$.getValue()])
  }

  private prepareSearchUrl(name: string): string {
    const query = name.split(' ').join('+');

    return `https://www.google.com/search?q=order+online+${query}`;
  }
}
