export const TYPES = {
  SET_PARTICIPANTES: 'SET_PARTICIPANTES',
  REMOVE_PARTICIPANTE: 'REMOVE_PARTICIPANTE',
  CLEAR_ALL: 'CLEAR_ALL',
  SET_GANADOR: 'SET_GANADOR',
  SET_PREMIO: 'SET_PREMIO',
  SET_GANADORES: 'SET_GANADORES',
}

export const DEF_SORTEO_STATE = {
  participantes: [],
  participantesStr: '',
  ganador: '',
  premio: '',
  ganadores: 1,
  hasGanadores: false
}

export const sorteoReducer = (state, action)=> {
  const ACTIONS =  {
    [TYPES.SET_PARTICIPANTES]: ()=> {
      const participantes = action.payload
        .split(",")
        .map((participante) => participante.trim())
        .filter(Boolean);

      const parcipantesSinRepetidos = [
        ...new Set(
          participantes.map((participante) => participante.toLowerCase())
        ),
      ];

      return {
        ...state,
        participantesStr: action.payload,
        participantes: parcipantesSinRepetidos
      }
    },
    [TYPES.REMOVE_PARTICIPANTE]: ()=> {
      const participantesUpdated = state.participantes.filter(participante=> participante !== action.payload);

      return {  
        ...state,
        participantes: participantesUpdated,
        participantesStr: participantesUpdated.join(', ')
      }
    },
    [TYPES.CLEAR_ALL]: ()=> {
      return {
        ...state,
        participantes: [],
        participantesStr: '',
      }
    },
    [TYPES.SET_GANADOR]: ()=> ({...state, ganador: action.payload }),
    [TYPES.SET_PREMIO]: ()=> {
      return {...state, premio: action.payload }
    },
    [TYPES.SET_GANADORES]: ()=> {
      return {...state, ganadores: action.payload }
    }
  }

  return ACTIONS[action.type]() || state
}