import React from 'react'

const Header = ({ title, subtitle }) => {
  return (
    <header>
      <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text break-words text-center bg-gradient-to-br from-blue-400 to-blue-600">
        {title}
      </h1>
      <p className="text-neutral-400 font-wold text-xl text-center">{subtitle}</p>
    </header>
  );
}

export default Header