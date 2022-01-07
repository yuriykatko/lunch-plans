import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'idea-generator',
  templateUrl: './idea-generator.component.html',
  styleUrls: ['./idea-generator.component.scss'],
})
export class IdeaGeneratorComponent implements OnInit {
  private getIdeaClicked = new Subject<boolean>();

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.getIdeaClicked
      .pipe(debounceTime(250))
      .subscribe(() => this.mealService.generateLunchIdea());
  }

  public getLunchIdea(): void {
    this.getIdeaClicked.next(true);
  }
}
