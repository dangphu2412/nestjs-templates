export type ErrorDeps = {};
export type ErrorHandler = (error: unknown) => void;

export type ErrorUseCase = (deps?: ErrorDeps) => ErrorHandler;
