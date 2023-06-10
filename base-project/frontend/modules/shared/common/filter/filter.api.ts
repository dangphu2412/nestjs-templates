import { FilterKey } from './constant';

export type Range<T> = {
  fromDate: T;
  toDate: T;
};

type EnumFilter<T> = {
  enumerable: T;
  value: string;
};

type FilterKeeper<K extends FilterKey, V> = {
  type: K;
  value: V;
};

export type Filter<T extends FilterKey, V = string> = T extends FilterKey.EXACT
  ? FilterKeeper<T, string>
  : T extends FilterKey.RANGE
  ? FilterKeeper<T, Range<V>>
  : T extends FilterKey.BOOLEAN
  ? FilterKeeper<T, boolean>
  : T extends FilterKey.ENUMERABLE
  ? FilterKeeper<T, EnumFilter<V>>
  : FilterKeeper<T, string>;

export type SearchFilter = {
  query: Filter<FilterKey.LIKE>;
};

export type CombineSearchFilter<T> = T & SearchFilter;

export type FilterParam<T extends Record<string, Filter<FilterKey>>> = Partial<{
  [K in keyof T]: T[K]['value'];
}>;

export type FilterQuery = Record<string, unknown>;
