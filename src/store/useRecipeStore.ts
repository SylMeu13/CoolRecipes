import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import recipeListSlice, { type RecipeMap } from "./slices/recipeListSlice";
import ingredientListSlice, {
  type IngredientList,
} from "./slices/ingredientListSlice";
import type { PersistStorage } from "zustand/middleware";
import SuperJSON from "superjson";

const browserStorage = localStorage;
const storage: PersistStorage<RecipeMap & IngredientList> = {
  getItem: (name) => {
    const str = browserStorage.getItem(name);
    if (!str) return null;
    return SuperJSON.parse(str);
  },
  setItem: (name, value) => {
    browserStorage.setItem(name, SuperJSON.stringify(value));
  },
  removeItem: (name) => browserStorage.removeItem(name),
};

export default create<RecipeMap & IngredientList>()(
  devtools(
    persist(
      (...set) => ({
        ...recipeListSlice(...set),
        ...ingredientListSlice(...set),
      }),
      { name: "recipe", storage },
    ),
  ),
);

export const selectRecipes = (state: RecipeMap) => state.recipes;
export const selectGetRecipe = (state: RecipeMap) => state.getRecipe;
export const selectAddRecipe = (state: RecipeMap & IngredientList) =>
  state.addRecipe;
export const selectRemoveRecipe = (state: RecipeMap & IngredientList) =>
  state.removeRecipe;
export const selectSetRecipeConsumeDate = (state: RecipeMap) =>
  state.setRecipeConsumeDate;

export const selectIngredients = (state: IngredientList) =>
  state.getIngredients;
export const selectSetIngredientCount = (state: IngredientList) =>
  state.setIngredientCount;
export const selectRemoveIngredient = (state: IngredientList) =>
  state.removeIngredient;
