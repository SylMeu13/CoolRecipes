import useToggle from "@/hooks/useToggle";
import styled from "styled-components";
import { Link } from "react-router";
import type { PartialRecipe } from "@/utils/types/Recipe";
import RecipeScheduleModal from "./RecipeScheduleModal";

const SRecipe = styled.article`
  background-color: var(--accent-bg);
  border: 1px solid var(--accent-border);
  border-radius: 1em;
  width: 256px;

  transition: transform 0.4s;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.4s;
  }

  & > * {
    width: 100%;
    height: 100%;
    border-radius: inherit;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25em;

    img {
      width: 100%;
      border-top-left-radius: 1em;
      border-top-right-radius: 1em;
    }

    h3 {
      font-size: medium;
      margin-block: auto;
    }

    button {
      width: 85%;
    }
  }
`;

export default function Recipe({ recipe }: { recipe: PartialRecipe }) {
  const [isModalOpen, toggleModal] = useToggle();

  return (
    <SRecipe>
      <Link to={`/recipe/${recipe.idMeal}`}>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <h3>{recipe.strMeal}</h3>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleModal();
          }}
        >
          Add to Planning
        </button>
        {isModalOpen && (
          <RecipeScheduleModal recipe={recipe} onClose={toggleModal} />
        )}
      </Link>
    </SRecipe>
  );
}
