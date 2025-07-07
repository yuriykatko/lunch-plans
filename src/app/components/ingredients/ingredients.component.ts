import { Component, Input } from '@angular/core';
import { Ingredient } from 'src/app/models/meal';

@Component({
    selector: 'ingredients',
    templateUrl: './ingredients.component.html',
    styleUrls: ['./ingredients.component.scss'],
    standalone: false
})
export class IngredientsComponent {
  @Input() ingredients: Array<Ingredient> = [];
}
