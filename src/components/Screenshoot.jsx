import React from 'react';
import Emoji from './Emoji';

const Screenshoot = ({ imgURL }) => {
  return (
    <aside className='my-5'>
      <img src={imgURL} className='rounded-lg w-full' />
      <a
        href={imgURL}
        download='ganadores_sorteo.png'
        className='  text-base my-2 inline-block text-zinc-100 no-underline  hover:text-white'
      >
        <Emoji emoji='⬇️' label='flecha abajo' /> Descargar imagen
      </a>
    </aside>
  );
};

export default React.memo(Screenshoot);
