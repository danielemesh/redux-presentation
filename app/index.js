import $ from "jquery";

import { applyMiddleware, createStore } from "redux";
import createLogger from "redux-logger";

import { todoApp } from "./reducers"
import { addTodo, toggleTodo, setVisibilityFilter, SHOW_COMPLETED } from "./actions";


/* DOM elements
============================= */
const todoList = $(".todo-list");
const todoField = $(".todo-field");
const submitBtn = $(".submit-btn");

const render = () => {
    let todos = store.getState().todos;
    
    let listItems = todos.map(todo => {
        let completedClass = todo.completed ? "completed" : "";
        
        return `<li id="${todo.id}" class="todo-item ${completedClass}">${todo.text}</li>`;
    });
    
    todoList.html(listItems);
};

const logger = createLogger();
const store  = createStore(todoApp, applyMiddleware(logger));

store.subscribe(render);
render();


/* Dispatch actions
 ============================= */
store.dispatch(addTodo("Learn Redux!"));
store.dispatch(addTodo("Go home!"));
//store.dispatch(toggleTodo(1));
//store.dispatch(setVisibilityFilter(SHOW_COMPLETED));


/* UI related code
============================= */
submitBtn.click(event => {
    event.preventDefault();
    
    let todoText = todoField.val();
    
    if (todoText !== "") {
        store.dispatch(addTodo(todoText));
        todoField.val("");
    }
});

todoList.click(".todo-item", (event) => {
    let id = Number(event.target.id);
    
    if (!isNaN(id)) {
        store.dispatch(toggleTodo(id));
    }
});
