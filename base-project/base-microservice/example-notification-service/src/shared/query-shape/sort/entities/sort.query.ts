import { SortDirection } from '../constants/sort-direction.enum';

export type SortQuery<K extends string> = Record<K, SortDirection>;
