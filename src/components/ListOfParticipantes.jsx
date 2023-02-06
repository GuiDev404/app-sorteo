import React from 'react'
import Button from './Button'
import { TrashIcon } from './Icons'

const ListOfParticipantes = ({ participantes, removeParticipante }) => {
  const handleRemoveParticipante = (participante) => ()=> removeParticipante(participante)

  return participantes.map((participante) => (
      <Button
        key={participante}
        styles="grid place-items-center overflow-hidden m-1 text-white bg-neutral-600 relative text-sm before:content-[''] hover:before:w-full hover:before:h-full hover:before:bg-red-700 hover:before:bg-opacity-75 hover:before:absolute hover:before:top-0 hover:before:left-0 hovered"
        onClick={handleRemoveParticipante(participante)}
      >
        <TrashIcon className='absolute  bottom-10 transition-all ease-in duration-200' />
        {participante}
      </Button>
    ))
  
}

export default React.memo(ListOfParticipantes)