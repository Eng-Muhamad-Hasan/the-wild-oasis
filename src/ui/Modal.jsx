import {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    fill: var(--color-grey-500);
    stroke: var(--color-grey-500);
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [windowName, setWindowName] = useState("");
  const close = () => setWindowName("");
  const open = (windowName) => setWindowName(windowName);
  return (
    <ModalContext.Provider value={{ windowName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Toggle({ opens: windowName, children }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(windowName),
  });
}

function Window({ children, name }) {
  const { windowName, close: onCloseModal } = useContext(ModalContext);
 const {ref: modalRef} = useOutsideClick(onCloseModal);

  if (name !== windowName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={modalRef}>
        <Button onClick={onCloseModal}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal })}</div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
}

Modal.Toggle = Toggle;
Modal.Window = Window;

export default Modal;
