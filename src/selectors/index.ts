import { RootState } from "../slices";

export const getIds = (state: RootState) => state.todo.ids;
export const getItems = (state: RootState) => state.todo.item;
