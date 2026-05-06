import { useEffect, useState } from "react";

export const useSessionStorageState = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = sessionStorage.getItem(key);

    if (!storedValue) {
      return initialValue;
    }

    try {
      return JSON.parse(storedValue) as T;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};
