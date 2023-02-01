import React, { useReducer, useCallback } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import readXlsxFile from 'read-excel-file'

import Button from "./components/Button";
import Emoji from "./components/Emoji";
import ButtonWithIcon from "./components/ButtonWithIcon";
import Header from "./components/Header";
import ListOfParticipantes from "./components/ListOfParticipantes";
import { ExcelIcon, TrashIcon, XIcon } from "./components/Icons";

import useConfetti from "./hooks/useConfetti";
import useScreenshoot from "./hooks/useScreenshoot";

import { toCapitalize, randomItems, conjuntionString } from "./utils";
import { DEF_SORTEO_STATE, sorteoReducer, TYPES } from "./reducer/sorteoReducer";

function App() {
  const [ sorteo, dispatch ] = useReducer(sorteoReducer, DEF_SORTEO_STATE);
  const { ref, imgURL, takeScreenshoot } = useScreenshoot()
  const { stopAnimation, startAnimation, getInstance } = useConfetti();
  
  const { participantes, participantesStr, ganador, premio, ganadores } = sorteo;

  const handleParticipantes = e => dispatch({ type: TYPES.SET_PARTICIPANTES, payload: e.target.value })
  const removeParticipante = participante => dispatch({ type: TYPES.REMOVE_PARTICIPANTE, payload: participante })

  const handleSorteo = (e) => {
    e.preventDefault();

    if (participantes.length > 1) {
      const participantesGanadores = randomItems([...participantes], ganadores)

      startAnimation();
 
      const namesCapitalizes = participantesGanadores.map(toCapitalize);
      const ganadoresFormateado = conjuntionString(namesCapitalizes)
      
      dispatch({ type: TYPES.SET_GANADOR, payload: ganadoresFormateado });
    }
  };

  const handlePremio = e => dispatch({ type: TYPES.SET_PREMIO, payload: e.target.value });
  const handleGanadores = e => dispatch({ type: TYPES.SET_GANADORES, payload: e.target.value });

  const clearAll = ()=> dispatch({ type: TYPES.CLEAR_ALL })
  const clearGanador = useCallback(()=> {
    if (ref.current === null) return;

    takeScreenshoot()
      .then(() => {
        stopAnimation();
        dispatch({ type: TYPES.SET_GANADOR, payload: "" });
      })
      .catch(console.error);
  }, [ref])

  const handleImportFromFile = (e)=> {
    readXlsxFile(e.target.files[0])
      .then((rows) => {
        console.log(rows);
        const participantesStr = rows.flat(1).join(', ');
        dispatch({ type: TYPES.SET_PARTICIPANTES, payload: participantesStr })
        e.target.value = ''
      })
      .catch(console.log)
  }

  return (
    <div className="container mx-auto my-12 font-sans">
      <Header
        title="sortea.te"
        subtitle="Agrega los participantes y genera un ganador de manera aleatoria."
      />

      <main className="my-12 grid grid-cols-12 sm:mx-0 mx-5">
        <div className="col-span-12 sm:col-span-8"> 
          <div className="flex items-start sm:items-center justify-between max-w-3xl mb-12 sm:flex-row flex-col ">
            <h3 className="text-2xl font-bold sm:my-0 my-2">Complete el formulario</h3>
            <Button
              type="submit"
              form="form-sorteo"
              styles="bg-blue-600 text-white block w-full sm:inline-block sm:w-60 py-2 text-xl "
            >
              Sortear
              <Emoji label="ganador" emoji="✨🎉🎊" />
            </Button>
          </div>

          <form className="flex flex-col max-w-3xl" id="form-sorteo" onSubmit={handleSorteo}>
            <header className="flex sm:flex-nowrap items-center justify-between flex-wrap">
              <label htmlFor="participantes" className="text-xl font-bold mt-4 mb-2"> Participantes </label>

              <div className="flex mb-2">
                <ButtonWithIcon
                  icon={<TrashIcon />}
                  onClick={clearAll}
                  styles="bg-red-700 text-white flex items-center justify-around mr-2"
                />

                <input className="w-full file:bg-green-800 file:border-0 file:rounded-md file:text-white file:px-4 file:py-2 file:font-bold file:mr-3 bg-gray-100 text-gray-600 rounded-md file:cursor-pointer" type="file" accept=".xlsx" onChange={handleImportFromFile} />
                {/* <ButtonWithIcon
                  icon={<ExcelIcon />}
                  onClick={()=> false}
                  styles="bg-green-700 text-white flex items-center justify-between mr-2 w-52"
                >
                  Importar desde excel
                </ButtonWithIcon> */}
              </div>
            </header>
            <textarea
              id="participantes"
              className="p-3 border-2 rounded outline-gray-500 max-h-40 min-h-40 h-40 resize-none"
              cols="30"
              rows="10"
              placeholder="Carlos, Maria, Pedro..."
              value={participantesStr}
              onChange={handleParticipantes}
            ></textarea>

            <section className={`my-2 p-2 bg-slate-200 rounded-md ${participantes.length ? "flex flex-wrap" : ""}`}>
              {participantes.length ? (
                <ListOfParticipantes 
                  participantes={participantes}
                  removeParticipante={removeParticipante}
                />
              ) : (
                <label className="text-center text-sm text-slate-500 block p-2" htmlFor="participantes">
                  + agrega al menos 2 participantes
                </label>
              )}
            </section>

            <div className="my-4">
              <label htmlFor="premio" className="text-xl font-bold mb-2 inline-block"> Premio </label>
              <input
                type="text"
                id="premio"
                placeholder="Ingrese el premio"
                className="p-3 border-2 rounded outline-gray-500 block w-full"
                onChange={handlePremio}
                value={premio}
              />
            </div>
            <div className="my-4">
              <label htmlFor="ganadores" className="text-xl font-bold mb-2 inline-block"> Ganadores </label>
              <input
                type="number"
                id="ganadores"
                min={1}
                disabled={!participantes.length}
                max={participantes.length}
                placeholder="Ingrese la cantidad de ganadores"
                className="p-3 border-2 rounded outline-gray-500 block w-full disabled:text-slate-400 disabled:cursor-not-allowed"
                onChange={handleGanadores}
                value={ganadores}
              />
            </div>
          </form>
        </div>

        {Boolean(imgURL) &&
          <aside className="col-span-12 sm:col-span-4">
            <img src={imgURL} className='rounded-lg' />
            <a href={imgURL} download='ganadores_sorte_te.png' className="text-base my-2 inline-block text-zinc-900 no-underline hover:underline hover:text-zinc-800"> ↓ Descargar </a>
          </aside>
        }
      </main>

      {!!ganador && 
        <div
          ref={ref}
          className='fixed backdrop-blur-sm bg-neutral-800 bg-opacity-80 top-0 left-0 w-full h-full items-center justify-center flex'
        >
          <button 
            className="absolute right-10 top-10 rounded-full bg-black bg-opacity-30 text-white p-3 btn-non-visible"
            onClick={clearGanador}
          >
            <XIcon width={24} height={24} />
          </button>

          <ReactCanvasConfetti
            refConfetti={getInstance}
            className="fixed w-full h-full top-0 left-0 pointer-events-none"
          />

          <div className="rounded-lg bg-slate-100 p-12 h-50 m-5">
            <h2 className="font-bold text-3xl">
              Felicitaciones {ganador} <Emoji emoji='🎉🎊' label='confetti' />
            </h2>
            <p className="text-zinc-400 font-semibold text-xl">
              {ganadores > 1 ? "Ganaron" : "Ganaste"} {premio}
            </p>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
