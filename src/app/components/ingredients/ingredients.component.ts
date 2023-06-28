import { Component, Input } from '@angular/core';
import { Ingredient } from 'src/app/models/meal';

@Component({
  selector: 'ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent {
  @Input() ingredients: Array<Ingredient> = [];
}
