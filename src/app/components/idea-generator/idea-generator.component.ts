import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MealService } from '../../services/meal.service';
import { FlagsService } from '../../services/flags.service';

@Component({
    selector: 'idea-generator',
    templateUrl: './idea-generator.component.html',
    styleUrls: ['./idea-generator.component.scss'],
    standalone: false
})
export class IdeaGeneratorComponent implements OnInit {
  private getIdeaClicked = new Subject<boolean>();
  public isEmojiDisplayed = false;

  constructor(private mealService: MealService, private flagsService: FlagsService) {}

  ngOnInit(): void {
    this.getIdeaClicked
      .pipe(debounceTime(250))
      .subscribe(() => this.mealService.generateLunchIdea());

    this.flagsService.getIsEmojiDisplayed().then(value => {
      this.isEmojiDisplayed = value;
    });
  }

  public getLunchIdea(): void {
    this.getIdeaClicked.next(true);
  }
}
