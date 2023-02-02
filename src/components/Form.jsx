import { useForm } from 'react-hook-form';
import readXlsxFile from 'read-excel-file';

import Button from './Button';
import Emoji from './Emoji';
import { TrashIcon } from './Icons';
import Input from './Input';
import Textarea from './Textarea';

const IS_REQUIRED = { 
  required: { 
    value: true,
    message: 'El campo es requerido'
  }
}

const VALIDATION_CANTIDAD = { 
  required: IS_REQUIRED.required,
  valueAsNumber: true,
  validate: {
    valid: (cantidadInput, formValues)=> {
      const cantidadDeParticipantes = formValues.participantes.split(',').filter(Boolean).length

      return cantidadInput < cantidadDeParticipantes || 'Debe ser menor a la cantidad de participantes'
    }
  }
}

const VALIDATION_PARTICIPANTES = {
  required: IS_REQUIRED.required,
  validate: {
    cantidad_valida: (p) => p.split(',').filter(Boolean).length > 1 || 'Debe haber 2 o mas participantes.',
  },
};

const Form = ({ onSubmit }) => {
  const { handleSubmit, reset, register, formState: { errors }, setValue } = useForm();

  const handleOnSubmit = (data) => onSubmit(data);

  const handleClearAll = ()=> reset()

  const handleImportFromFile = (e) => {
    readXlsxFile(e.target.files[0])
      .then((rows) => {
        const participantesInString = rows.flat(1).join(', ');
        setValue('participantes', participantesInString)
        e.target.value = '';
      })
      .catch(console.log);
  };

  return (
    <>
      <header className='flex sm:flex-nowrap items-center justify-between flex-wrap'>
        <label htmlFor='participantes' className='font-bold mt-4 mb-1'>
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
    
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className='flex flex-col gap-5'
      >
        <Textarea 
          register={register}
          name='participantes'
          className='max-h-[200px]'
          validation={VALIDATION_PARTICIPANTES}
          placeholder='Carlos, Marcos, Pedro, Josefina'
          errors={errors}
        />
      
        <Input
          placeholder='Ingrese el premio'
          register={register}
          name='premio'
          validation={IS_REQUIRED}
          errors={errors}
          label='Premio'
        />
        
        <Input
          type='number'
          placeholder='Ingrese la cantidad de ganadores'
          min={1}
          max={3}
          register={register}
          name='cantidad_ganadores'
          validation={VALIDATION_CANTIDAD}
          errors={errors}
          className='disabled:text-slate-400 disabled:cursor-not-allowed'
          label='Cantidad de ganadores'
        />

        <Button
          type='submit'
          styles='bg-blue-600 disabled:bg-blue-500 disabled:cursor-not-allowed text-white block w-full sm:inline-block sm:w-60 py-2 text-xl '
        >
          Sortear
          <Emoji label='ganador' emoji='✨🎉🎊' />
        </Button>
      </form>
    </>
  );
};

export default Form;
