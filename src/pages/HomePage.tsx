import { useState } from "react";
import Categories from "@/components/Categories";
import Recipes from "@/components/Recipes";
import SearchBar from "@/components/SearchBar";
import {
  getRecipesByCategoryQuery,
  getRecipesByNameQuery,
} from "@/utils/queries";

export default function HomePage() {
  const [category, setCategory] = useState<string>("Beef");
  const [search, setSearch] = useState<string>();

  return (
    <main>
      <SearchBar onSearch={setSearch} />
      {!search && <Categories onSelect={setCategory} active={category} />}
      <Recipes
        queryOptions={
          search
            ? getRecipesByNameQuery(search)
            : getRecipesByCategoryQuery(category)
        }
      />
    </main>
  );
}
