import { DisplayMode } from "./display-mode";

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strSource: string;
  searchUrl: string;
  strArea: string;
  strCategory: string;
  ingredients: Array<Ingredient>;
  isLoading: boolean;
  displayMode: DisplayMode;
  [key: string]: any;
}

export interface Ingredient {
  name: string;
  quantity: string;
}
