import styled from "styled-components";
import QueryLoader from "./contentLoaders/QueryLoader";
import { getCategoriesQuery } from "@/utils/queries";

const SCategories = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: fit-content;
  gap: 0.5em 1em;
  padding: 1em;
  border-radius: 1em;
  background-color: var(--accent-bg);

  span {
    cursor: pointer;

    &.active {
      font-weight: bold;
      color: var(--text-h);
    }

    &:hover {
      color: var(--text-h);
    }
  }
`;

export default function Categories({
  onSelect,
  active,
}: {
  onSelect: (category: string) => void;
  active?: string;
}) {
  return (
    <SCategories>
      <QueryLoader
        queryOptions={getCategoriesQuery()}
        renderOnSuccess={(data) => {
          return data.map((category) => (
            <span
              key={category.idCategory}
              className={active == category.strCategory ? "active" : ""}
              onClick={() => onSelect(category.strCategory)}
            >
              {category.strCategory}
            </span>
          ));
        }}
      />
    </SCategories>
  );
}
