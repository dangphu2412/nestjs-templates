export type Predicate<S extends T, T> = (
  value: T,
  index: number,
  array: T[],
) => value is S;
