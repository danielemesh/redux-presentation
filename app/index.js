import { createStore, applyMiddleware } from "redux";
import createLogger from "redux-logger";

import $ from "jquery";

import { todoApp } from "./reducers";
import { addTodo, toggleTodo, setVisibilityFilter, SHOW_ACTIVE } from "./actions";

const logger = createLogger();
const store  = createStore(todoApp, applyMiddleware(logger));

/* DOM elements
============================= */
const submitBtn = $(".submit-btn");
const todoField = $(".todo-field");
const todoList = $(".todo-list");

const render = () => {
    const todos = store.getState().todos;
    
    const listItems = todos.map(todo => {
        let completed  = todo.completed ? "completed" : "";
        
        return `<li id="${todo.id}" class="todo-item ${completed}">${todo.text}</li>`;
    });
    
    todoList.html(listItems);
};

store.subscribe(render);


/* Event handlers
============================= */
submitBtn.click(event => {
    event.preventDefault();
    
    const todoText = todoField.val();
    
    if (todoText !== "") {
        store.dispatch(addTodo(todoText));
    
        todoField.val("");
    }
});

todoList.click(".todo-item", event => {
    const todoId = Number(event.target.id);
    
    if (!isNaN(todoId)) {
        store.dispatch(toggleTodo(todoId));
    }
});

/* Dispatch actions
 ============================= */
store.dispatch(addTodo("Learn Redux"));
store.dispatch(addTodo("Do something!"));
//store.dispatch(toggleTodo(1));
//store.dispatch(setVisibilityFilter(SHOW_ACTIVE));