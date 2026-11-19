import styled from "styled-components";
import Recipe from "./Recipe";
import type { PartialRecipe } from "@/utils/types/Recipe";
import QueryLoader from "./contentLoaders/QueryLoader";
import type { UseQueryOptions } from "@tanstack/react-query";

const SRecipes = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2em;
`;

export default function Recipes({
  queryOptions,
}: {
  queryOptions: UseQueryOptions<PartialRecipe[]>;
}) {
  return (
    <QueryLoader
      queryOptions={queryOptions}
      renderOnSuccess={(data) =>
        data ? (
          <SRecipes>
            {data.map((recipe) => (
              <Recipe key={recipe.idMeal} recipe={recipe} />
            ))}
          </SRecipes>
        ) : (
          <p>No recipe found!</p>
        )
      }
    />
  );
}
