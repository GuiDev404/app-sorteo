import React from "react";

const Emoji = ({ emoji, label }) => {
  return (
    <span role="img" aria-label={label} className='mx-2'>
      {emoji}
    </span>
  );
};

export default Emoji;
