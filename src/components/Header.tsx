import { Link, NavLink } from "react-router";
import styled from "styled-components";

const SHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em;
  border-bottom: 1px solid var(--border);
  height: 2em;
`;

const SNav = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2em;

  a {
    font-size: large;

    &.active {
      font-weight: bold;
      color: var(--text-h);
    }
  }
`;

const Logo = styled.span`
  font-size: xx-large;
  font-weight: bold;
  color: var(--text-h);
`;

export default function Header() {
  return (
    <SHeader>
      <Link to="/">
        <Logo>CoolRecipes</Logo>
      </Link>

      <SNav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/list">Shopping List</NavLink>
        <NavLink to="/planning">Planning</NavLink>
      </SNav>
    </SHeader>
  );
}
