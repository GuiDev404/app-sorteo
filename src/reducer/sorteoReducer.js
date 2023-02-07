export const TYPES = {
  SET_PARTICIPANTES: 'SET_PARTICIPANTES',
  REMOVE_PARTICIPANTE: 'REMOVE_PARTICIPANTE',
  CLEAR_ALL: 'CLEAR_ALL',
  SET_GANADOR: 'SET_GANADOR',
  SET_PREMIO: 'SET_PREMIO',
  SET_GANADORES: 'SET_GANADORES',
  SET_ERRORES: 'SET_ERRORES',
}

export const DEF_SORTEO_STATE = {
  participantes: [],
  participantesRawValue: '',
  ganador: '',
  premio: '',
  ganadores: 1,
  hasGanadores: false,
  error: ''
}

export const sorteoReducer = (state, action)=> {

  const ACTIONS =  {
    [TYPES.SET_PARTICIPANTES]: ()=> {
      const participantes = action.payload
        .split(",")
        .map((participante) => participante.trim())
        .filter(Boolean);

      const participantesSinRepetidos = [
        ...new Set(
          participantes.map((participante) => participante.toLowerCase())
        ),
      ];

      return {
        ...state,
        participantesRawValue: action.payload,
        participantes: participantesSinRepetidos
      }
    },
    [TYPES.REMOVE_PARTICIPANTE]: ()=> {
      const participantesUpdated = state.participantes.filter(participante=> participante !== action.payload);

      return {  
        ...state,
        participantes: participantesUpdated,
        participantesRawValue: participantesUpdated.join(', ')
      }
    },
    [TYPES.CLEAR_ALL]: ()=> {
      return {
        ...state,
        participantes: [],
        participantesRawValue: '',
      }
    },
    [TYPES.SET_GANADOR]: ()=> ({...state, ganador: action.payload }),
    [TYPES.SET_PREMIO]: ()=> {
      return {...state, premio: action.payload }
    },
    [TYPES.SET_GANADORES]: ()=> {
      return {...state, ganadores: action.payload }
    },
    [TYPES.SET_ERRORES]: ()=> {

      return {...state, error: action.payload }
    }
  }

  return ACTIONS[action.type]() || state
}