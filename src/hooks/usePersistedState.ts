import { useEffect, useState, Dispatch, SetStateAction } from 'react';

type TResponse<T> = [T, Dispatch<SetStateAction<T>>];

export function usePersistedState<T = any>(
  key: string,
  initialState: any
): TResponse<T> {
  const [state, setState] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue) {
      return JSON.parse(storedValue);
    }

    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
