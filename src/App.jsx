import React, { useCallback, useState } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

import { XIcon } from './components/Icons';
import Modal, { ModalHeader, ModalContent } from './components/Modal';
import Button from './components/Button';
import Emoji from './components/Emoji';
import Header from './components/Header';
import Form from './components/Form';
import Screenshoot from './components/Screenshoot';

import useConfetti from './hooks/useConfetti';
import useScreenshoot from './hooks/useScreenshoot';
import useToggle from './hooks/useToggle';

import { toCapitalize, randomItems, conjuntionString } from './utils';

const INITIAL_SORTEO = {
  ganador: '', premio: '', ganadores: []
}

function App() {
  const { ref, imgURL, takeScreenshoot } = useScreenshoot();
  const { stopAnimation, startAnimation, getInstance } = useConfetti();

  const [bool, toggle] = useToggle();

  const [ { ganador, premio, ganadores }, setSorteo ] = useState(INITIAL_SORTEO)

  const onSubmit = data => {
    const participantes = [...data.participantes.split(',')]
    const ganadores = randomItems(participantes, data.cantidad_ganadores)
    
    const namesCapitalizes = ganadores.map(toCapitalize);
    const ganadoresFormateado = conjuntionString(namesCapitalizes);

    setSorteo({
      ganadores,
      ganador: ganadoresFormateado,
      premio: data.premio
    })

    startAnimation();
    toggle()
  };
 
  const clearGanador = useCallback(() => {
    if (ref.current === null) return;

    takeScreenshoot()
      .then(() => {
        stopAnimation();
        setSorteo(INITIAL_SORTEO)
        toggle();
      })
      .catch(console.error);
  }, [ref]);

  return (
    <div className='max-w-[800px] w-[80%] mx-auto my-12 font-sans'>
      <Header
        title='sortea.te'
        subtitle='Agrega los participantes y genera un ganador de manera aleatoria.'
      />

      <main className='my-10'>
        <Form 
          onSubmit={onSubmit}
        />
  
        {Boolean(imgURL) && <Screenshoot imgURL={imgURL} />}
      </main>

      <Modal show={bool} reference={ref}>
        <ReactCanvasConfetti
          refConfetti={getInstance}
          className='fixed w-full h-full top-0 left-0 pointer-events-none'
        />

        <ModalHeader className='flex justify-end'>
          <Button
            className=' rounded-md bg-black bg-opacity-80 text-white p-2 m-2 btn-non-visible'
            onClick={clearGanador}
          >
            <XIcon width={18} height={18} />
          </Button>
        </ModalHeader>

        <ModalContent>
          <div className='rounded-lg text-white p-4 '>
            <h2 className='font-bold text-3xl'>
              Felicitaciones {ganador} <Emoji emoji='🎉🎊' label='confetti' />
            </h2>
            <p className='text-neutral-400 font-semibold text-xl'>
              {ganadores.length > 1 ? 'Ganaron' : 'Ganaste'} {premio}
            </p>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default App;
