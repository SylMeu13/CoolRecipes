import useRecipeStore, {
  selectRemoveIngredient,
  selectSetIngredientCount,
  selectSetRecipeConsumeDate,
} from "@/store/useRecipeStore";
import type IngredientItem from "@/utils/types/IngredientItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import z from "zod";

const SIngredient = styled.article`
  display: grid;
  grid-template-columns: subgrid;
  grid-column-start: 1;
  grid-column-end: 6;

  padding: 0.4em;
  box-sizing: border-box;
  border: 1px solid var(--accent-border);
  border-radius: 1em;
  background-color: var(--accent-bg);

  > :first-child {
    text-align: left;
  }

  > :last-child {
    text-align: right;
  }

  > form {
    display: grid;
    grid-template-columns: subgrid;
    grid-column-start: 1;
    grid-column-end: 6;

    > :first-child {
      text-align: left;
    }

    > :last-child {
      text-align: right;
    }
  }

  h3 {
    margin: 0;
    font-size: large;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2em;
  justify-content: end;
`;

const Error = styled.p`
  color: red;
  font-size: small;
`;

export default function Ingredient({
  ingredient,
}: {
  ingredient: IngredientItem;
}) {
  const deleteIngredient = useRecipeStore(selectRemoveIngredient);
  const setIngredientCount = useRecipeStore(selectSetIngredientCount);
  const setConsumeAt = useRecipeStore(selectSetRecipeConsumeDate);

  const [isEditing, setEditing] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    values: {
      count: ingredient.count,
      consumeAt: ingredient.from.consumeAt.toISOString().split("T")[0],
    },
    resolver: zodResolver(
      z.object({
        count: z.number(),
        consumeAt: z.coerce.date(),
      }),
    ),
  });

  function handleDelete() {
    deleteIngredient(ingredient);
  }

  function onsubmit({ count, consumeAt }: { count: number; consumeAt: Date }) {
    if (count != ingredient.count) setIngredientCount(ingredient, count);
    if (+consumeAt != +ingredient.from.consumeAt)
      setConsumeAt(ingredient.from, consumeAt);

    setEditing(false);
  }

  return (
    <SIngredient>
      {!isEditing ? (
        <>
          <h3>
            {ingredient.ingredient.name} {ingredient.ingredient.quantity}
          </h3>
          <p>{ingredient.count}</p>
          <p>{ingredient.from.recipe.strMeal}</p>
          <p>{ingredient.from.consumeAt.toLocaleDateString()}</p>
          <Buttons>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </Buttons>
        </>
      ) : (
        <form onSubmit={handleSubmit(onsubmit)}>
          <h3>
            {ingredient.ingredient.name} {ingredient.ingredient.quantity}
          </h3>
          <div>
            <input
              type="number"
              {...register("count", { valueAsNumber: true })}
            />
            {errors.count && <Error>{errors.count.message}</Error>}
          </div>
          <p>{ingredient.from.recipe.strMeal}</p>
          <div>
            <input
              type="date"
              {...register("consumeAt", { valueAsDate: true })} // Doesn't display the original value?
            />
            {errors.consumeAt && <Error>{errors.consumeAt.message}</Error>}
          </div>
          <Buttons>
            <button type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
            <button type="submit">Apply</button>
          </Buttons>
        </form>
      )}
    </SIngredient>
  );
}
