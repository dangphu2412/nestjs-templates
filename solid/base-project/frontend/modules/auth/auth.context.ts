import {createContext} from "react";

export enum AuthState {
    IS_AUTHENTICATED = "IS_AUTHENTICATED",
    IS_LOGOUT = "IS_LOGOUT"
}


interface AuthContextProps {
    authState: AuthState,
    credentials?: {
        accessToken: string;
        refreshToken: string;
    },
    profile: any;
}

export const AuthContext = createContext<AuthContextProps>({
    authState: AuthState.IS_LOGOUT,
    profile: {}
})