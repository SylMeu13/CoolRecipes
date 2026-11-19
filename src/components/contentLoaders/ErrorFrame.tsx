import styled from "styled-components";

const Frame = styled.div`
  color: red;
  font-size: large;
  width: 100%;
  min-height: 40vh;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ErrorFrame({ error }: { error: Error }) {
  return (
    <Frame>
      <p>{error.message}</p>
    </Frame>
  );
}
