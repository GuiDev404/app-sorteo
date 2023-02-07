import Button from './Button';
import Emoji from './Emoji';
import { TrashIcon } from './Icons';
import ListOfParticipantes from './ListOfParticipantes';

const Form = ({
  participantes,
  premio,
  ganadores,
  handleSubmitSorteo,
  participantesRawValue,
  handleChangeParticipantes,
  handleRemoveParticipante,
  handleChangePremio,
  handleChangeGanadores,
  handleClearAll,
  handleImportFromFile,
  error
}) => {
 
  const cantidadParticipantes = participantes.length
  const hayParticipantes = cantidadParticipantes > 0

  return (
    <form
      className='flex flex-col text-white'
      id='form-sorteo'
      onSubmit={handleSubmitSorteo}
    >
 
      <header className='flex sm:flex-nowrap items-center justify-between flex-wrap'>
        <label htmlFor='participantes' className='text-xl font-bold mt-4 mb-2'>
          Participantes
        </label>

        <div className='flex mb-2'>
          <Button
            onClick={handleClearAll}
            styles='border border-neutral-700 bg-neutral-800 text-white flex items-center justify-around mr-2'
          >
            <TrashIcon />
          </Button>

          <input
            className='w-full file:bg-neutral-800 file:border-0 border border-neutral-700 file:rounded-md file:text-white file:px-4 file:py-2 file:font-bold file:mr-3 bg-neutral-700 text-gray-100 rounded-md file:cursor-pointer'
            type='file'
            accept='.xlsx'
            onChange={handleImportFromFile}
          />
        </div>
      </header>


      <textarea
        id='participantes'
        className='p-3 border border-neutral-700 rounded-md bg-neutral-800  max-h-40 min-h-40 h-40 resize-none'
        cols='30'
        rows='10'
        placeholder='Carlos, Maria, Pedro...'
        value={participantesRawValue}
        onChange={handleChangeParticipantes}
      ></textarea>

      <section
        className={`my-2 p-2 bg-neutral-800 rounded-md border border-neutral-700 flex flex-wrap items-center ${hayParticipantes ? 'justify-start' : 'justify-center'}`}
      >
        {hayParticipantes ? (
          <ListOfParticipantes
            participantes={participantes}
            removeParticipante={handleRemoveParticipante}
          />
        ) : (
          <label
            className='text-center uppercase text-sm text-slate-500 p-2 gap-2'
            htmlFor='participantes'
          >
            <span> + agrega al menos 2 participantes </span>
          </label>
        )}
      </section>

      <div className='my-4'>
        <label htmlFor='premio' className='text-xl font-bold mb-2 inline-block'>
          Premio
        </label>
        <input
          type='text'
          id='premio'
          placeholder='Ingrese el premio'
          className='p-3 bg-neutral-800 rounded-md border border-neutral-700 block w-full'
          onChange={handleChangePremio}
          value={premio}
        />
      </div>

      <div className='my-4'>
        <label
          htmlFor='ganadores'
          className='text-xl font-bold mb-2 inline-block'
        >
          Ganadores
        </label>
        <input
          type='number'
          id='ganadores'
          min={1}
          disabled={cantidadParticipantes < 2}
          max={3}
          placeholder='Ingrese la cantidad de ganadores'
          className='p-3  bg-neutral-800 rounded-md border border-neutral-700 block w-full disabled:text-slate-400 disabled:cursor-not-allowed'
          onChange={handleChangeGanadores}
          value={ganadores}
        />

        <p className='text-neutral-400 mt-1 text-xs'> * Tiene que haber al menos 2 participantes </p>
      </div>
        <p className='text-red-400 text-sm my-4'> {error} </p>

      <Button
        disabled={!hayParticipantes}
        type='submit'
        form='form-sorteo'
        styles='bg-blue-600 disabled:bg-blue-500 disabled:cursor-not-allowed text-white block w-full sm:inline-block sm:w-60 py-2 text-xl '
      >
        Sortear
        <Emoji label='ganador' emoji='✨🎉🎊' />
      </Button>
    </form>
  );
};

export default Form;
