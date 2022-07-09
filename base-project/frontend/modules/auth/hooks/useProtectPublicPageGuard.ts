import { Guard } from '../clients/guard.interface';
import {
  BrowserStorage,
  registerBrowserStorage
} from '../../shared/services/browser-storage';

type ProtectPublicPageGuardHookProps = {
  accessPathName: string;
  publicRoutes: string[];
};

export function useProtectPublicPageGuard(
  protectPublicPageGuardHookProps: ProtectPublicPageGuardHookProps
): Guard {
  return {
    canAccess(): boolean {
      if (typeof window !== 'undefined') {
        registerBrowserStorage('localStorage');
        const isNotLogInned = !BrowserStorage.get('accessToken');
        const isNotInPublicRoutes =
          !protectPublicPageGuardHookProps.publicRoutes.includes(
            protectPublicPageGuardHookProps.accessPathName
          );

        return isNotLogInned || isNotInPublicRoutes;
      }

      return false;
    }
  };
}
