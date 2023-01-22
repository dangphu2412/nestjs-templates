/**
 * @public !== null and undefined
 */
export function isNil<T>(value: T): value is Exclude<T, null | undefined> {
  return value !== undefined && value !== null;
}
