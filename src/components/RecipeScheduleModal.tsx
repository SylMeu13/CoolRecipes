import Modal from "./Modal";
import styled from "styled-components";
import type { PartialRecipe } from "@/utils/types/Recipe";
import { useState } from "react";
import useRecipeStore, { selectAddRecipe } from "@/store/useRecipeStore";
import { getRecipe } from "@/utils/api";

const Title = styled.h4`
  margin: 0;
`;

export default function RecipeScheduleModal({
  recipe,
  onClose,
}: {
  recipe: PartialRecipe;
  onClose: () => void;
}) {
  const [consumeAt, setConsumeAt] = useState<Date>();
  const [isScheduling, setScheduling] = useState(false);
  const addRecipe = useRecipeStore(selectAddRecipe);

  function handleClick() {
    if (consumeAt && !isScheduling) {
      setScheduling(true);
      getRecipe(recipe.idMeal)
        .then((fullRecipe) => {
          addRecipe(fullRecipe, consumeAt);
          onClose();
        })
        .finally(() => setScheduling(false));
    }
  }

  return (
    <Modal onClose={onClose}>
      <Title>{recipe.strMeal}</Title>
      <input
        type="date"
        name="consumeAt"
        id="consumeAt"
        onChange={(e) => setConsumeAt(e.target.valueAsDate ?? undefined)}
      />
      <button onClick={handleClick} disabled={isScheduling || !consumeAt}>
        Add to Planning!
      </button>
    </Modal>
  );
}
