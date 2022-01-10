import { useState, useEffect } from 'react';

/**
 *
 * @param {string} localStorageKey - The local storage key where the value should be stored.
 * @returns {array} The state value and update function.
 */

const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = useState(
    localStorage.getItem(localStorageKey) === 'true' || false
  );
  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);
  return [value, setValue];
};

export default useStateWithLocalStorage;
