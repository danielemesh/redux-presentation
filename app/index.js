import $ from "jquery";

import { applyMiddleware, createStore } from "redux";
import createLogger from "redux-logger";

import { todoApp } from "./reducers"
import { addTodo, toggleTodo, setVisibilityFilter, SHOW_COMPLETED } from "./actions";


const render = () => {
    let todos = store.getState().todos;
    
    let listItems = todos.map(todo => {
        return `<li id="todo_${todo.id}">${todo.text}</li>`;
    });
    
    $(".todo-list").html(listItems);
};

const logger = createLogger();
const store  = createStore(todoApp, applyMiddleware(logger));

store.subscribe(render);
render();


/* Dispatch actions
 ============================= */
store.dispatch(addTodo("Learn Redux!"));
store.dispatch(addTodo("Go home!"));
store.dispatch(toggleTodo(1));
store.dispatch(setVisibilityFilter(SHOW_COMPLETED));


/* UI related code
============================= */
$("#submitBtn").click(event => {
    event.preventDefault();
    
    let todoField = $("#todoField");
    let todoText = todoField.val();
    
    store.dispatch(addTodo(todoText));
    
    todoField.val("");
});
