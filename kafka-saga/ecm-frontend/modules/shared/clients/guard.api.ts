export interface Guard<P> {
  canAccess(payload: P): boolean;
}
