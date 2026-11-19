import type Ingredient from "@/utils/types/Ingredient";
import type IngredientItem from "@/utils/types/IngredientItem";
import type RecipeItem from "@/utils/types/RecipeItem";
import type { StateCreator } from "zustand";
import type { RecipeMap } from "./recipeListSlice";

interface InternalIngredientItem {
  ingredient: Ingredient;
  count: number;
  from: number;
}

function equals(a: InternalIngredientItem, b: IngredientItem) {
  return (
    a.ingredient.name == b.ingredient.name &&
    a.ingredient.quantity == b.ingredient.quantity &&
    a.from == b.from.id
  );
}

export interface IngredientList {
  ingredients: Array<InternalIngredientItem>;
  getIngredients: () => Array<IngredientItem>;
  addIngredient: (ingredient: IngredientItem) => void;
  addIngredientsFromRecipe: (recipe: RecipeItem) => void;
  removeIngredient: (ingredient: IngredientItem) => void;
  removeIngredientsFromRecipe: (recipe: RecipeItem) => void;
  setIngredientCount: (ingredient: IngredientItem, count: number) => void;
}

const ingredientListSlice: StateCreator<
  RecipeMap & IngredientList,
  [],
  [],
  IngredientList
> = (set, get) => ({
  ingredients: [],
  getIngredients: () => {
    const state = get();
    return state.ingredients.map((ingredient) => ({
      ...ingredient,
      from: state.getRecipe(ingredient.from)!,
    }));
  },
  addIngredient: (ingredient) =>
    set((state) => ({
      ingredients: [
        ...state.ingredients,
        {
          ...ingredient,
          from: ingredient.from.id,
        },
      ],
    })),
  addIngredientsFromRecipe: (recipe) =>
    set((state) => ({
      ingredients: [
        ...state.ingredients,
        ...recipe.recipe.ingredients.map((ingredient) => ({
          ingredient,
          count: 1,
          from: recipe.id,
        })),
      ],
    })),
  removeIngredient: (ingredient) => {
    set((state) => ({
      ingredients: state.ingredients.filter(
        (intIngredient) => !equals(intIngredient, ingredient),
      ),
    }));
  },
  removeIngredientsFromRecipe: (recipe) =>
    set((state) => ({
      ingredients: state.ingredients.filter(
        (intIngredient) =>
          !recipe.recipe.ingredients.includes(intIngredient.ingredient),
      ),
    })),
  setIngredientCount: (ingredient, count) => {
    set((state) => ({
      ingredients: state.ingredients.map((intIngredient) =>
        equals(intIngredient, ingredient)
          ? { ...intIngredient, count: count }
          : intIngredient,
      ),
    }));
  },
});

export default ingredientListSlice;
