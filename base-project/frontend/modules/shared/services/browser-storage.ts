type BrowserStorageType = 'localStorage' | 'sessionStorage';

let storage: Storage;

export function registerBrowserStorage(type?: BrowserStorageType): void {
  if (!type || type === 'localStorage') {
    if (!localStorage) {
      throw new Error('Not found localStorage');
    }
    storage = localStorage;
    return;
  }

  if (!localStorage) {
    throw new Error('Not found sessionStorage');
  }

  storage = sessionStorage;
}

export const BrowserStorage = {
  get(key: string): string | null {
    if (!storage) {
      return null;
    }

    return storage.getItem(key);
  },
  set(key: string, value: string): void {
    if (!storage) {
      throw new Error('Unregister browser storage');
    }

    storage.setItem(key, value);
  },
  remove(key: string): void {
    if (!storage) {
      throw new Error('Unregister browser storage');
    }

    storage.removeItem(key);
  }
};
