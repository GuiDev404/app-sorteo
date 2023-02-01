import React from 'react'
import Button from './Button'

const ButtonWithIcon = ({ children, icon, ...props }) => {

  return (
   <Button {...props}>
     {icon}
     {children}
   </Button>
  )
}

export default ButtonWithIcon