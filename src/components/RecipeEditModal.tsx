import type RecipeItem from "@/utils/types/RecipeItem";
import Modal from "./Modal";
import styled from "styled-components";
import useRecipeStore, { selectRemoveRecipe } from "@/store/useRecipeStore";

const SModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: space-between;

  h3,
  h4,
  ul {
    margin: 0;
  }
`;

const Panel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2em;

  width: 100%;

  img {
    width: 312px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default function RecipeEditModal({
  recipe,
  onClose,
}: {
  recipe: RecipeItem;
  onClose: () => void;
}) {
  const removeRecipe = useRecipeStore(selectRemoveRecipe);

  function handleDelete() {
    removeRecipe(recipe);
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <SModal>
        <Content>
          <Panel>
            <img src={recipe.recipe.strMealThumb} alt={recipe.recipe.strMeal} />
            <Content>
              <h3>{recipe.recipe.strMeal}</h3>
              <h4>Ingrédients</h4>
              <ul>
                {recipe.recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.name + ingredient.quantity}>
                    {ingredient.quantity} {ingredient.name}
                  </li>
                ))}
              </ul>
            </Content>
          </Panel>
          <h4>Instructions</h4>
          <p>{recipe.recipe.strInstructions}</p>
        </Content>
        <Row>
          <p>Consume at : {recipe.consumeAt.toLocaleDateString()}</p>
          <button onClick={handleDelete}>Delete</button>
        </Row>
      </SModal>
    </Modal>
  );
}
