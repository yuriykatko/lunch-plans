import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DisplayMode } from 'src/app/models/display-mode';
import { Meal } from 'src/app/models/meal';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'lunch-details',
  templateUrl: './lunch-details.component.html',
  styleUrls: ['./lunch-details.component.scss'],
})
export class LunchDetailsComponent implements OnInit {
  public meals$: Observable<Array<Meal>>;
  public allModes: typeof DisplayMode = DisplayMode;

  constructor(private mealService: MealService) {
    this.meals$ = this.mealService.getMeals();
  }

  ngOnInit(): void {}

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
