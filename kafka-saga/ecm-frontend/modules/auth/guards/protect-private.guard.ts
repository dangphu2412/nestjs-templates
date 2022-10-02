import { Guard } from '../../shared/clients/guard.api';
import {
  BrowserStorage,
  registerBrowserStorage
} from '../../shared/services/browser-storage';

type ProtectPrivateGuardProps = {
  accessPathName: string;
  publicRoutes: string[];
};

export const ProtectPrivateGuard: Guard<ProtectPrivateGuardProps> = {
  canAccess(payload: ProtectPrivateGuardProps): boolean {
    if (typeof window !== 'undefined') {
      registerBrowserStorage('localStorage');
      const isLoggedIn = !!BrowserStorage.get('accessToken');
      const isNotInPublicRoutes = !payload.publicRoutes.includes(
        payload.accessPathName
      );

      return isLoggedIn && isNotInPublicRoutes;
    }

    return false;
  }
};
