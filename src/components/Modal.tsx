import { createPortal } from "react-dom";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SModal = styled.div`
  background-color: var(--bg);
  padding: 1em;
  border-radius: 1em;
  max-width: 90vw;
  max-height: 90vh;
`;

export default function Modal({
  children,
  onClose,
}: {
  children: React.JSX.Element | React.JSX.Element[];
  onClose: () => void;
}) {
  return createPortal(
    <ModalOverlay
      onClick={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <SModal onClick={(e) => e.stopPropagation()}>{children}</SModal>
    </ModalOverlay>,
    document.body,
  );
}
