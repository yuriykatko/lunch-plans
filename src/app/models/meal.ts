import { DisplayMode } from "./display-mode";

export interface Meal {
  idmeal: string;
  strmeal: string;
  strmealthumb: string;
  strinstructions: string;
  strsource: string;
  searchurl: string;
  strarea: string;
  strcategory: string;
  ingredients: Array<Ingredient>;
  isLoading: boolean;
  displayMode: DisplayMode;
  translations: Array<TranslatedMeal>;
  [key: string]: any;
}

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface TranslatedMeal {
  locale: string;
  strmeal: string;
  strcategory: string;
  strarea: string;
  strinstructions: string;
  ingredients: Array<Ingredient>;
}
