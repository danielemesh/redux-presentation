import { createStore, applyMiddleware } from "redux";
import createLogger from "redux-logger";

import { todoApp } from "./reducers";
import { addTodo, toggleTodo, setVisibilityFilter, SHOW_ACTIVE } from "./actions";

const logger = createLogger();
const store  = createStore(todoApp, applyMiddleware(logger));

/* Dispatch actions
 ============================= */
store.dispatch(addTodo("Learn Redux"));
store.dispatch(addTodo("Do something!"));
store.dispatch(toggleTodo(1));
store.dispatch(setVisibilityFilter(SHOW_ACTIVE));