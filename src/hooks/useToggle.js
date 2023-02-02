import { useCallback, useState } from 'react';

const useToggle = () => {
  const [bool, setBool] = useState(false);

  const toggle = useCallback(() => setBool((prevBool) => !prevBool), []);

  return [bool, toggle];
};

export default useToggle;
