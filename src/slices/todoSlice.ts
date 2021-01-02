import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State, TodoItem } from "../types";

const initialState: State = {
  ids: [1, 2],
  item: {
    1: { id: 1, description: "Remember to buy eggs" },
    2: { id: 2, description: "Learn Haskel" },
  },
};

const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    deleteItem(state, { payload }: PayloadAction<number>) {
      const filteredIds = state.ids.filter((id) => id !== payload);
      state.ids = filteredIds;

      let filteredItems: Record<number, TodoItem> = {};

      filteredIds.forEach((id) => (filteredItems[id] = state.item[id]));

      state.item = filteredItems;
    },
    addItem(state, { payload }: PayloadAction<TodoItem>) {
      state.ids.push(payload.id);

      state.item[payload.id] = payload;
    },
  },
});

export const { deleteItem, addItem } = todo.actions;

export default todo.reducer;
