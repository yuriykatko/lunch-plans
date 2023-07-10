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
  [key: string]: any;
}

export interface Ingredient {
  name: string;
  quantity: string;
}
