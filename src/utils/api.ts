import type Ingredient from "./types/Ingredient";
import type { PartialRecipe } from "./types/Recipe";
import type Recipe from "./types/Recipe";

const BASE_URI = "https://themealdb.com/api/json/v1/1/";

export async function request(
  endpoint: string,
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" = "GET",
  body = undefined,
) {
  return fetch(BASE_URI + endpoint, {
    method: method,
    body: body ? JSON.stringify(body) : undefined,
  }).then(async (res) => {
    if (res.ok) return res.json();
    else throw await res.text();
  });
}

export function getCategories(): Promise<
  { idCategory: number; strCategory: string }[]
> {
  return request("categories.php").then((data) => data.categories);
}

export function getRecipesByCategory(
  category: string,
): Promise<PartialRecipe[]> {
  return request(`filter.php?c=${category}`).then((data) => data.meals);
}

export function getRecipesByName(name: string): Promise<PartialRecipe[]> {
  return request(`search.php?s=${name}`).then((data) => data.meals);
}

export function getRecipe(id: string): Promise<Recipe> {
  return request(`lookup.php?i=${id}`).then((data) =>
    mapIngredients(data.meals[0]),
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapIngredients(recipe: Recipe & any): Recipe {
  const ingredients: Array<Ingredient> = [];
  for (let i = 1; i <= 20; i++) {
    const name: string = recipe["strIngredient" + i];
    if (name.trim().length > 0)
      ingredients.push({
        name,
        quantity: recipe["strMeasure" + i],
      });
  }
  return { ...recipe, ingredients };
}
