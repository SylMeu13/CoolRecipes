import type Recipe from "./Recipe";

export default interface RecipeItem {
  id: number;
  recipe: Recipe;
  consumeAt: Date;
}
