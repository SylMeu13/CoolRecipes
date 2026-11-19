import type { UseQueryOptions } from "@tanstack/react-query";
import {
  getCategories,
  getRecipe,
  getRecipesByCategory,
  getRecipesByName,
} from "./api";
import type { PartialRecipe } from "./types/Recipe";
import type Recipe from "./types/Recipe";

export function getCategoriesQuery(): UseQueryOptions<
  {
    idCategory: number;
    strCategory: string;
  }[]
> {
  return { queryKey: ["categories"], queryFn: getCategories };
}

export function getRecipesByCategoryQuery(
  category: string,
): UseQueryOptions<PartialRecipe[]> {
  return {
    queryKey: ["recipes", "category", category],
    queryFn: () => getRecipesByCategory(category),
  };
}

export function getRecipesByNameQuery(
  name: string,
): UseQueryOptions<PartialRecipe[]> {
  return {
    queryKey: ["recipes", "name", name],
    queryFn: () => getRecipesByName(name),
  };
}

export function getRecipeQuery(id: string): UseQueryOptions<Recipe> {
  return {
    queryKey: ["recipe", id],
    queryFn: () => getRecipe(id),
  };
}
