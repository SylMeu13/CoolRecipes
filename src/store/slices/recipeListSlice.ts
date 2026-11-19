import type RecipeItem from "@/utils/types/RecipeItem";
import type { StateCreator } from "zustand";
import type { IngredientList } from "./ingredientListSlice";
import type Recipe from "@/utils/types/Recipe";

import { deleteFromMap, mutateFromMap } from "@/utils/maps";

export interface RecipeMap {
  recipes: Map<number, RecipeItem>;
  nextId: number;
  getRecipe: (id: number) => RecipeItem | undefined;
  addRecipe: (recipe: Recipe, consumeAt: Date) => void;
  removeRecipe: (recipe: RecipeItem) => void;
  setRecipeConsumeDate: (recipe: RecipeItem, consumeAt: Date) => void;
}

const recipeListSlice: StateCreator<
  RecipeMap & IngredientList,
  [],
  [],
  RecipeMap
> = (set, get) => ({
  recipes: new Map(),
  nextId: 1,
  getRecipe: (id) => get().recipes.get(id),
  addRecipe: (recipe, consumeAt) => {
    const recipeItem: RecipeItem = { recipe, consumeAt, id: get().nextId };
    set((state) => ({
      recipes: new Map(state.recipes).set(recipeItem.id, recipeItem),
      nextId: state.nextId + 1,
    }));
    get().addIngredientsFromRecipe(recipeItem);
  },
  removeRecipe: (recipe) => {
    set((state) => ({
      recipes: deleteFromMap(new Map(state.recipes), recipe.id),
    }));
    get().removeIngredientsFromRecipe(recipe);
  },
  setRecipeConsumeDate: (recipe, consumeAt) => {
    set((state) => ({
      recipes: mutateFromMap(
        new Map(state.recipes),
        recipe.id,
        (value) => (value.consumeAt = consumeAt),
      ),
    }));
  },
});

export default recipeListSlice;
