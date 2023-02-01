export const toCapitalize = (word)=>{
  const splitter = word.split(' ')
  return splitter.map((part)=> part.charAt(0).toUpperCase() + part.slice(1) ).join(' ')
}

export const randomInRange = (min, max)=> {
  return Math.random() * (max - min) + min;
}

export const getAnimationSettings = (originXA, originXB)=> {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
  };
}

export const conjuntionString = (arrayStr) => {
  const formatter = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' });
  return formatter.format(arrayStr);
};

export const randomItems = (items, cantidad)=> {
  const itemsResult = [];

  for (let i = 0; i < cantidad; i++) {
    const suffleParticipantes = items.sort(() => Math.random() - 0.5);
    const idxRandom = Math.floor(Math.random() * items.length);

    const ganador = suffleParticipantes[idxRandom];
    itemsResult.push(ganador);

    suffleParticipantes.splice(idxRandom, 1);
  }

  return itemsResult
}