import { Tuple } from '../../../types/tuple';

export const ADDRESS_COLUMN_INDEX = 0;
export const CITY_COLUMN_INDEX = 1;
export const STATE_COLUMN_INDEX = 2;
export const ZIP_CODE_COLUMN_INDEX = 3;
export const CATEGORY_COLUMN_INDEX = 4;

export type Place = Tuple<string, 5>;
