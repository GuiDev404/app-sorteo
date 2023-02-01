import React from "react";

const Button = ({ children, styles, type, ...props }) => {
  return (
    <button type={type} className={`${styles} px-4 py-2 rounded-md font-bold`} {...props}>
      {children}
    </button>
  );
};

export default Button;
