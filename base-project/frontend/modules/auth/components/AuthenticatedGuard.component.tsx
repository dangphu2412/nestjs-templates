import React, {PropsWithChildren, useState} from "react";
import {useRouter} from "next/router";
import {useProtectPublicPageGuard} from "../hooks/useProtectPublicPageGuard";

type AuthenticatedGuardProps = PropsWithChildren<{
    publicRoutes: string[];
    defaultRoute: string;
}>;

export function AuthenticatedGuard(props: AuthenticatedGuardProps): React.ReactElement {
    const [isLoading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const protectPublicPageGuard = useProtectPublicPageGuard({
        publicRoutes: props.publicRoutes,
        accessPathName: router.pathname,
    });

    React.useEffect(() => {
        async function protectPage() {
            if (!protectPublicPageGuard.canAccess()) {
                await router.push(props.defaultRoute);
            }
            setLoading(false);
        }
        protectPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    return (
        <>
            {!isLoading && props.children}
        </>
    );
}