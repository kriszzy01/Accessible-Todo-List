import { RootState } from "../slices";

export type { RootState };

export type Ids = Array<number>;

export interface TodoItem {
  id: number,
  title: string;
  description: string;
}

export interface State {
  ids: Ids;
  item: Record<number, TodoItem>;
}
