import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function useAsyncStorage<T>(key: string) {
  const [value, setValue] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((data) => {
        if (data) {
          setValue(JSON.parse(data));
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const saveValue = async (newValue: T) => {
    await AsyncStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  const removeValue = async () => {
    AsyncStorage.removeItem(key).then(() => setValue(null));
  };

  return { value, saveValue, isLoading, removeValue };
}
