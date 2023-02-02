import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
const exclusionClasses = ['btn-non-visible'];

const filterElements = (node)=>{  
  if(node.tagName && node.tagName.toLowerCase() === "button"){
    return !exclusionClasses.some(classname=> [...node.classList].includes(classname));
  } 

  return true;
}

export default function useScreenshoot (){
  const ref = useRef(null)
  const [ imgURL, setImgURL ] = useState('')

  const takeScreenshoot = async ()=> {
    const dataURL = await toPng(ref.current, { cacheBust: true, filter: filterElements })
    setImgURL(dataURL)
  }

  const clearURL = ()=> setImgURL('')

  return {
    ref, 
    imgURL,
    takeScreenshoot,
    clearURL
  }
}