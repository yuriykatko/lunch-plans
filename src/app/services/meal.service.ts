import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Meal } from '../models/meal';
import { MealResponse } from '../models/meal-response';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private meal$: BehaviorSubject<Meal | null>;

  constructor(private http: HttpClient) {
    this.meal$ = new BehaviorSubject<Meal | null>(null);
  }

  public generateLunchIdea(): void {
    this.http
      .get<MealResponse>('https://www.themealdb.com/api/json/v1/1/random.php')
      .subscribe((response: MealResponse) => this.setMeal(response.meals[0]));
  }

  public getMeal(): Observable<Meal> {
    return this.meal$ as Observable<Meal>;
  }

  private setMeal(meal: Meal): void {
    meal.searchUrl = this.prepareSearchUrl(meal.strMeal);

    this.meal$.next(meal);
  }

  private prepareSearchUrl(name: string): string {
    const query = name.split(' ').join('+');

    return `https://www.google.com/search?q=order+online+${query}`;
  }
}
