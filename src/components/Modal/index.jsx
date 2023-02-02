import React, { createContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const ModalContext = createContext();

export * from './Header';
export * from './Content';

const Modal = ({ show = false, children, className, size, reference }) => {
  useEffect(() => {
    document.body.style.overflowY = show ? 'hidden' : 'scroll';
  }, [show]);

  return (
    show &&
    createPortal(
      <ModalContext.Provider value={size}>
        <div className='fixed backdrop-blur-sm bg-neutral-800 bg-opacity-80 top-0 left-0 w-full h-full items-center justify-center flex'>
          <div
            ref={reference}
            className={`rounded-md w-2/4 bg-white h-56 ${className}`}
          >
            {children}
          </div>
        </div>
      </ModalContext.Provider>,
      document.getElementById('modal')
    )
  );
};

export default Modal;
