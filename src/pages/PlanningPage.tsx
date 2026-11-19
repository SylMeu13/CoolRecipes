import useRecipeStore, {
  selectRecipes,
  selectSetRecipeConsumeDate,
} from "@/store/useRecipeStore";
import type RecipeItem from "@/utils/types/RecipeItem";
import type {
  EventClickInfo,
  EventDropInfo,
  EventInput,
} from "@fullcalendar/react";
import styled from "styled-components";

import FullCalendar from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/pulse"; // YOUR THEME
import dayGridPlugin from "@fullcalendar/react/daygrid";
import interactionPlugin from "@fullcalendar/react/interaction";

// stylesheets
import "@fullcalendar/react/skeleton.css"; // ALWAYS NEED SKELETON
import "@fullcalendar/react/themes/pulse/theme.css"; // YOUR THEME
import "@fullcalendar/react/themes/pulse/palettes/purple.css"; // YOUR THEME'S PALETTE
import { useState } from "react";
import RecipeEditModal from "@/components/RecipeEditModal";

const Content = styled.section`
  width: 100%;
  height: 80vh;
`;

function mapToEvent(recipe: RecipeItem): EventInput {
  return {
    allDay: true,
    id: recipe.id.toString(),
    title: recipe.recipe.strMeal,
    date: recipe.consumeAt,
    extendedProps: { recipe },
  };
}

export default function PlanningPage() {
  const recipes = useRecipeStore(selectRecipes);
  const setConsumeDate = useRecipeStore(selectSetRecipeConsumeDate);
  const [openedRecipe, setOpenedRecipe] = useState<RecipeItem>();

  function handleEventClick(info: EventClickInfo): void {
    setOpenedRecipe(info.event.extendedProps.recipe);
  }

  function handleEventMove(info: EventDropInfo): void {
    setConsumeDate(info.event.extendedProps.recipe, info.event.start!);
  }

  return (
    <main>
      <section>
        <h1>Planning</h1>
      </section>
      <Content>
        <FullCalendar
          colorScheme="dark"
          plugins={[themePlugin, dayGridPlugin, interactionPlugin]}
          initialView="dayGridWeek"
          height="100%"
          events={Array.from(recipes.values()).map(mapToEvent)}
          eventClick={handleEventClick}
          eventDrop={handleEventMove}
          eventStartEditable
        />
      </Content>
      {openedRecipe && (
        <RecipeEditModal
          recipe={openedRecipe}
          onClose={() => setOpenedRecipe(undefined)}
        />
      )}
    </main>
  );
}
