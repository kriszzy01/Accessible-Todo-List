import { combineReducers } from "redux";
import todoReducer from "./todoSlice";

const rootReducer = combineReducers({
  todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export * from "./todoSlice";

export default rootReducer;
