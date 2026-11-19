import QueryLoader from "@/components/contentLoaders/QueryLoader";
import { getRecipeQuery } from "@/utils/queries";
import { useParams } from "react-router";
import styled from "styled-components";

const Page = styled.main`
  flex-direction: row;
  align-items: flex-start;

  img {
    width: 256px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export default function RecipePage() {
  const { mealId } = useParams();

  return mealId ? (
    <QueryLoader
      queryOptions={getRecipeQuery(mealId)}
      renderOnSuccess={(recipe) => (
        <Page>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <Content>
            <h1>{recipe.strMeal}</h1>
            <p>{recipe.strInstructions}</p>
          </Content>
        </Page>
      )}
    />
  ) : (
    <p>Recipe Not Found!</p>
  );
}
