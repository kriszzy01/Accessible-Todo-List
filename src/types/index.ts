import { RootState } from "../slices";

export type { RootState };

type Ids = Array<number>;

export interface TodoItem {
  id: number;
  description: string;
}

export interface State {
  ids: Ids;
  item: Record<number, TodoItem>;
}
