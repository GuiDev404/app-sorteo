import React from 'react'

export const ModalContent = ({ children, className }) => {
  return (
    <div className={`${className}`}>{children}</div>
  )
}
