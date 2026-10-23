import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgb(15 23 42 / 65%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 1200;
`;

const Dialog = styled.div`
  position: relative;
  width: min(560px, 100%);
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 8px;
  top: 8px;
  border: none;
  background: transparent;
  line-height: 1;
`;

function Modal({ children, onClose }) {
  return createPortal(
    <Overlay>
      <Dialog>
        {children}
        <CloseButton type="button" onClick={() => onClose(false)} aria-label="Close modal">
          x
        </CloseButton>
      </Dialog>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

export default Modal;
