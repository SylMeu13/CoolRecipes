import type Ingredient from "./Ingredient";

export interface PartialRecipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  ingredients: Array<Ingredient>;
}
