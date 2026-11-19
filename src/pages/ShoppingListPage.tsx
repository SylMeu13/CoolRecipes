import Ingredient from "@/components/Ingredient";
import useRecipeStore, { selectIngredients } from "@/store/useRecipeStore";
import styled from "styled-components";

const Content = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr) fit-content();
  grid-gap: 0.5rem;
  justify-content: space-between;

  width: 100%;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: subgrid;
  grid-column-start: 1;
  grid-column-end: 6;

  width: 100%;
  padding-inline: 1em;

  > :first-child {
    text-align: left;
  }

  > :last-child {
    text-align: right;
  }
`;

export default function ShoppingListPage() {
  useRecipeStore((state) => state.recipes);
  useRecipeStore((state) => state.ingredients);
  const ingredients = useRecipeStore(selectIngredients)();

  return (
    <main>
      <section>
        <h1>Shopping List</h1>
      </section>
      <Content>
        {ingredients.length > 0 ? (
          <>
            <Header>
              <p>Title</p>
              <p>Quantity</p>
              <p>From Recipe</p>
              <p>Consume at</p>
              <p>Actions</p>
            </Header>

            {ingredients.map((ingredient) => (
              <Ingredient
                key={ingredient.from.id + ingredient.ingredient.name}
                ingredient={ingredient}
              />
            ))}
          </>
        ) : (
          <p>No ingredients found</p>
        )}
      </Content>
    </main>
  );
}
