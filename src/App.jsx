import React, { useReducer, useCallback } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import readXlsxFile from 'read-excel-file';

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
import { DEF_SORTEO_STATE, sorteoReducer, TYPES } from './reducer/sorteoReducer';

function App() {
  const [sorteo, dispatch] = useReducer(sorteoReducer, DEF_SORTEO_STATE);
  const { ref, imgURL, takeScreenshoot } = useScreenshoot();
  const { stopAnimation, startAnimation, getInstance } = useConfetti();

  const { participantes, ganador, premio, ganadores, participantesRawValue } = sorteo;

  const [bool, toggle] = useToggle();

  const handleSorteo = (e) => {
    e.preventDefault();

    if (participantes.length > 1) {
      const participantesGanadores = randomItems([...participantes], ganadores);

      startAnimation();

      const namesCapitalizes = participantesGanadores.map(toCapitalize);
      const ganadoresFormateado = conjuntionString(namesCapitalizes);

      dispatch({ type: TYPES.SET_GANADOR, payload: ganadoresFormateado });
      toggle();
    }
  };

  const handleChangeParticipantes = (e) => dispatch({ type: TYPES.SET_PARTICIPANTES, payload: e.target.value });

  const handleRemoveParticipante = useCallback(participante =>
      dispatch({ type: TYPES.REMOVE_PARTICIPANTE, payload: participante }),
  []);

  const handleChangePremio = (e) =>  dispatch({ type: TYPES.SET_PREMIO, payload: e.target.value });
  const handleChangeGanadores = (e) => dispatch({ type: TYPES.SET_GANADORES, payload: e.target.value });

  const handleClearAll = () => dispatch({ type: TYPES.CLEAR_ALL });

  const handleImportFromFile = (e) => {
    readXlsxFile(e.target.files[0])
      .then((rows) => {
        console.log(rows);
        const participantesStr = rows.flat(1).join(', ');
        dispatch({ type: TYPES.SET_PARTICIPANTES, payload: participantesStr });
        e.target.value = '';
      })
      .catch(console.log);
  };

  const clearGanador = useCallback(() => {
    if (ref.current === null) return;

    takeScreenshoot()
      .then(() => {
        stopAnimation();
        dispatch({ type: TYPES.SET_GANADOR, payload: '' });
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
          participantesRawValue={participantesRawValue}
          participantes={participantes}
          ganadores={ganadores}
          premio={premio}
          handleSubmitSorteo={handleSorteo}
          handleChangeParticipantes={handleChangeParticipantes}
          handleRemoveParticipante={handleRemoveParticipante}
          handleChangePremio={handleChangePremio}
          handleChangeGanadores={handleChangeGanadores}
          handleClearAll={handleClearAll}
          handleImportFromFile={handleImportFromFile}
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
          <div className='rounded-lg text-black p-4 '>
            <h2 className='font-bold text-3xl'>
              Felicitaciones {ganador} <Emoji emoji='🎉🎊' label='confetti' />
            </h2>
            <p className='text-zinc-400 font-semibold text-xl'>
              {ganadores > 1 ? 'Ganaron' : 'Ganaste'} {premio}
            </p>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default App;
