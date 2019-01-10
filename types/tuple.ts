
export interface Tuple<T extends any, L extends number> extends Array<T> {
  '0': T;
  length: L;
}
