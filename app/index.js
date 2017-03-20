import { createStore, applyMiddleware } from "redux";
import createLogger from "redux-logger";

import $ from "jquery";

import { todoApp } from "./reducers";
import { addTodo, toggleTodo, setVisibilityFilter, SHOW_ACTIVE } from "./actions";

const logger = createLogger();
const store  = createStore(todoApp, applyMiddleware(logger));

/* DOM elements
============================= */
const todoField = $(".todo-field");
const todoList = $(".todo-list");

const render = () => {
    const todos = store.getState().todos;
    
    let listItems = todos.map(todo => {
        return `<li>${todo.text}</li>`;
    });
    
    todoList.html(listItems);
};

store.subscribe(render);


$(".submit-btn").click(event => {
    event.preventDefault();
    
    const todoText = todoField.val();
    
    store.dispatch(addTodo(todoText));
    
    todoField.val("");
});

/* Dispatch actions
 ============================= */
//store.dispatch(addTodo("Learn Redux"));
//store.dispatch(addTodo("Do something!"));
//store.dispatch(toggleTodo(1));
//store.dispatch(setVisibilityFilter(SHOW_ACTIVE));