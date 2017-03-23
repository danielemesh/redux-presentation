import { createStore, applyMiddleware } from "redux";
import createLogger from "redux-logger";

import $ from "jquery";

import { todoApp } from "./reducers";
import { addTodo, toggleTodo, setVisibilityFilter, SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from "./actions";

const logger = createLogger();
const store = createStore(todoApp, applyMiddleware(logger));


store.dispatch(addTodo("Learn redux!!!"));
store.dispatch(toggleTodo(0));




