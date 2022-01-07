import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from 'src/app/models/meal';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'lunch-details',
  templateUrl: './lunch-details.component.html',
  styleUrls: ['./lunch-details.component.scss'],
})
export class LunchDetailsComponent implements OnInit {
  public meal$: Observable<Meal>;

  constructor(private mealService: MealService) {
    this.meal$ = this.mealService.getMeal();
  }

  ngOnInit(): void {}
}
