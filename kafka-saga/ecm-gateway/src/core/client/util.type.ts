export type Nullable<T> = T | null;

export type Undefined<T> = T | undefined;

export type Constructor<T = any> = new (...args: any) => T;
