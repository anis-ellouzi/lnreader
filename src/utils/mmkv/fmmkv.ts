import { MMKV } from 'react-native-mmkv';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Listener = (key: string) => void;

export class MMKVFaker {
  private data: { [key: string]: string | undefined } = {};
  private listeners: Listener[] = [];

  getString(key: string): string | undefined {
    return this.data[key];
  }

  set(key: string, value: string): void {
    this.data[key] = value;
    this.notifyListeners(key);
  }

  delete(key: string): void {
    delete this.data[key];
    this.notifyListeners(key);
  }

  clearAll(): void {
    this.data = {};
    Object.keys(this.data).forEach(key => this.notifyListeners(key));
  }

  addOnValueChangedListener(listener: Listener): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(key: string): void {
    this.listeners.forEach(listener => listener(key));
  }
  getAllKeys(): readonly string[] {
    return Object.keys(this.data);
  }
}

export class MMKVFakerAsync {
  private data: { [key: string]: string | undefined } = {};
  private listeners: Listener[] = [];

  constructor() {
    this.loadData();
  }

  private async loadData(): Promise<void> {
    const keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet(keys);
    values.forEach(([key, value]) => {
      this.data[key] = value || undefined;
    });
  }

  getString(key: string): string | undefined {
    return this.data[key];
  }

  set(key: string, value: string): void {
    this.data[key] = value;
    AsyncStorage.setItem(key, value); // Persist data asynchronously
    this.notifyListeners(key);
  }

  delete(key: string): void {
    delete this.data[key];
    AsyncStorage.removeItem(key); // Remove from storage asynchronously
    this.notifyListeners(key);
  }

  clearAll(): void {
    this.data = {};
    AsyncStorage.clear(); // Clear storage asynchronously
    this.notifyListeners('all'); // Notify that all keys are cleared
  }

  addOnValueChangedListener(listener: Listener): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(key: string): void {
    this.listeners.forEach(listener => listener(key));
  }

  getAllKeys(): readonly string[] {
    return Object.keys(this.data);
  }
}

export function getStorageInstance(id: string) {
  const store = __DEV__ ? new MMKVFakerAsync() : new MMKV({ id: id });
  return store;
}
