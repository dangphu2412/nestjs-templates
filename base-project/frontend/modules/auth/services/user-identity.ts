import {
  BrowserStorage,
  registerBrowserStorage
} from '@modules/shared/services/browser-storage';

export const UserIdentity = {
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      registerBrowserStorage('localStorage');

      return !!BrowserStorage.get('accessToken');
    }

    return false;
  }
};
