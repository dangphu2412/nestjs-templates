interface ISamlService {
    getLoginURL(): Promise<string>;
    redirectToSAMLIDP(url: string): void;
}

export const SamlService: ISamlService = {
    getLoginURL(): Promise<string> {
        return Promise.resolve('http://localhost:5000/test');
    },
    redirectToSAMLIDP(url: string) {

    }
}