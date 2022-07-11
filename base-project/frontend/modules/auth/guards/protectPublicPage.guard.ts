import { Guard } from '../clients/guard.interface';
import {
  BrowserStorage,
  registerBrowserStorage
} from '../../shared/services/browser-storage';

type ProtectPublicPageGuardHookProps = {
  accessPathName: string;
  publicRoutes: string[];
};

export const ProtectPublicPageGuard: Guard<ProtectPublicPageGuardHookProps> = {
  canAccess(payload: ProtectPublicPageGuardHookProps): boolean {
    if (typeof window !== 'undefined') {
      registerBrowserStorage('localStorage');
      const isNotLogInned = !BrowserStorage.get('accessToken');
      const isNotInPublicRoutes = !payload.publicRoutes.includes(
        payload.accessPathName
      );

      return isNotLogInned || isNotInPublicRoutes;
    }

    return false;
  }
};
