
export namespace PlaceActions {
  export enum Type {

  }
}

export type PlaceActions = Omit<typeof PlaceActions, 'Type'>;
