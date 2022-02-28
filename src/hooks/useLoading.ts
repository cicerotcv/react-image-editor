import { useState } from 'react';

type TObject = { [key: string]: boolean };

type TResponse<K extends TObject> = [K, (key: keyof K, value: boolean) => void];

export function useLoading<K extends TObject>(initialValues: K): TResponse<K> {
  const [isLoading, setLoading] = useState<typeof initialValues>(initialValues);

  function handleChange(key: keyof K, value: boolean) {
    setLoading((prev) => ({ ...prev, [key]: value }));
  }

  return [isLoading, handleChange];
}
