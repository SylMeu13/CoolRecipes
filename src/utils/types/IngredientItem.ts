import type Ingredient from "./Ingredient";
import type RecipeItem from "./RecipeItem";

export default interface IngredientItem {
  ingredient: Ingredient;
  count: number;
  from: RecipeItem;
}
