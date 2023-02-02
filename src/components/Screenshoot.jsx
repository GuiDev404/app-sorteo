import React from 'react';

const Screenshoot = ({ imgURL }) => {
  return (
    <aside className='my-5'>
      <img src={imgURL} className='rounded-lg w-full' />
      <a
        href={imgURL}
        download='ganadores_sorte_te.png'
        className='text-base my-2 inline-block text-zinc-100 no-underline hover:underline hover:text-zinc-300'
      >
        ↓ Descargar
      </a>
    </aside>
  );
};

export default React.memo(Screenshoot);
