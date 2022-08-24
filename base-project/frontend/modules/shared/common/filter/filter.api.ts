import { FilterKey } from './constant';

type Range<T> = {
  from: T;
  to: T;
};

type FilterKeeper<K extends FilterKey, V> = {
  type: K;
  value: V;
};

export type Filter<T extends FilterKey> = T extends FilterKey.EXACT
  ? FilterKeeper<T, string>
  : T extends FilterKey.RANGE
  ? FilterKeeper<T, Range<string>>
  : T extends FilterKey.BOOLEAN
  ? FilterKeeper<T, boolean>
  : FilterKeeper<T, string>;

export type SearchFilter = {
  query: Filter<FilterKey.EXACT>;
};

export type CombineSearchFilter<T> = T & SearchFilter;

export type FilterParam<T extends Record<string, Filter<FilterKey>>> = {
  [K in keyof T]: T[K]['value'];
};
