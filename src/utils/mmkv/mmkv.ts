import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { getStorageInstance } from './fmmkv';
export type MMKVHook<T> = [
  value: T | undefined,
  setValue: (
    value: T | ((current: T | undefined) => T | undefined) | undefined,
  ) => void,
];

export const PluginStorage = getStorageInstance('plugin-storage');
export const MMKVStorage = getStorageInstance('wk-storage');
export class MMKVStorageD {
  static delete(key: string): void {
    AsyncStorage.removeItem(key);
  }

  static set(key: string, value: any) {
    try {
      AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  }
  static getString(key: string): string {
    let result: string = '';
    const getObject = async () => {
      const object = await AsyncStorage.getItem(key);
      result = object ? JSON.parse(object) : null;
    };

    getObject();
    return result;
  }
  static addOnValueChangedListener(key: string): string {
    let result: string = '';
    return result;
  }

  fetchAllItems = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);

      return items;
    } catch (error) {
      console.log(error, 'problemo');
    }
  };
  static getAllKeys(): readonly string[] {
    let result: readonly string[] = []; //
    const getObjects = async () => {
      try {
        result = await AsyncStorage.getAllKeys();
      } catch (error) {
        console.log(error, 'problemo');
      }
    };

    getObjects();
    return result;
  }
}

export function useMMKVBoolean(key: string): MMKVHook<boolean> {
  return useMMKVObject<boolean>(key);
}
export function useMMKVString(key: string): MMKVHook<string> {
  return useMMKVObject<string>(key);
}
export function useMMKVNumber(key: string): MMKVHook<number> {
  return useMMKVObject<number>(key);
}
export function setMMKVObject(key: string, value: any) {
  MMKVStorage.set(key, JSON.stringify(value));
}

export function getMMKVObject<T>(key: string): T | undefined {
  const object = MMKVStorage.getString(key);
  return object ? JSON.parse(object) : undefined;
}

export function useMMKVObject<T>(key: string): MMKVHook<T> {
  const currentInstance = MMKVStorage;
  //const [valueState, setValueState] = useState<T | undefined>(undefined);

  function getInitialValue(): T | undefined {
    const object = currentInstance.getString(key);
    return object ? JSON.parse(object) : undefined;
  }
  function setValue(value?: T | ((prev?: T) => T | undefined)) {
    const newValue: T | undefined = value instanceof Function ? value() : value;
    currentInstance.set(key, JSON.stringify(newValue));
    setValueState(newValue);
  }
  const [valueState, setValueState] = useState<T | undefined>(getInitialValue);

  return [valueState, setValue];
}
export function useMMKVObjectAsync<T>(
  key: string,
): [
  T | undefined,
  (value?: T | ((prev?: T) => T | undefined)) => Promise<void>,
] {
  const [valueState, setValueState] = useState<T | undefined>(undefined);

  // Function to get the initial value
  const getInitialValue = async (): Promise<T | undefined> => {
    const object = await AsyncStorage.getItem(key);
    return object ? JSON.parse(object) : undefined;
  };

  // useEffect to load the initial value
  useEffect(() => {
    const loadValue = async () => {
      const initialValue = await getInitialValue();
      setValueState(initialValue);
    };
    loadValue();
  }, [key]); // Dependency array to reload if the key changes

  // Async function to set a new value
  const setValue = async (
    value?: T | ((prev?: T) => T | undefined),
  ): Promise<void> => {
    const newValue: T | undefined =
      value instanceof Function ? value(valueState) : value;

    await AsyncStorage.setItem(key, JSON.stringify(newValue)); // Await if set is asynchronous
    setValueState(newValue);
  };

  return [valueState, setValue];
}
