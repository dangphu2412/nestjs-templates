import {Guard} from "../clients/guard.interface";

type ProtectPublicPageGuardHookProps = {
    accessPathName: string;
    publicRoutes: string[];
}

export function useProtectPublicPageGuard(protectPublicPageGuardHookProps: ProtectPublicPageGuardHookProps): Guard {
    return {
        canAccess(): boolean {
            if (typeof window !== 'undefined') {
                const isNotLogInned = !window.localStorage.getItem('accessToken');
                const isNotInPublicRoutes = !protectPublicPageGuardHookProps
                    .publicRoutes
                    .includes(protectPublicPageGuardHookProps.accessPathName);

                return isNotLogInned || isNotInPublicRoutes;
            }

            return false;
        }
    }
}