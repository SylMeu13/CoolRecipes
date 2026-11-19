import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import ShoppingListPage from "./pages/ShoppingListPage";
import PlanningPage from "./pages/PlanningPage";
import RecipePage from "./pages/RecipePage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/list" element={<ShoppingListPage />} />
          <Route path="/planning" element={<PlanningPage />} />
          <Route path="/recipe/:mealId" element={<RecipePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
