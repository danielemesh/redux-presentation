import { createStore, applyMiddleware } from "redux";
import createLogger from "redux-logger";

import $ from "jquery";

import { todoApp } from "./reducers";
import { addTodo, toggleTodo, setVisibilityFilter, filters, SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from "./actions";

const logger = createLogger();
const store  = createStore(todoApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(logger));

/* DOM elements
 ============================= */
const submitBtn   = $(".submit-btn");
const todoField   = $(".todo-field");
const todoList    = $(".todo-list");
const filtersElem = $(".filters");

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case SHOW_ALL:
            return todos;
        case SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        case SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
};

const render = () => {
    renderTodoItems();
    renderFilters();
};

const renderTodoItems = () => {
    const todos = getVisibleTodos(store.getState().todos, store.getState().visibilityFilter);
    
    const listItems = todos.map(todo => {
        let completed = todo.completed ? "completed" : "";
        
        return `<li id="${todo.id}" class="todo-item ${completed}">${todo.text}</li>`;
    });
    
    todoList.html(listItems);
};

const renderFilters = () => {
    const currFilter = store.getState().visibilityFilter;
    
    const filtersHtml = filters.map(filter => {
        if (currFilter === filter.id) {
            return `<span id="${filter.id}">${filter.display}</span>&nbsp;`;
        }
        
        return `<a id="${filter.id}" class="filter-btn" href="#">${filter.display}</a>&nbsp;`;
    });
    
    filtersElem.html(filtersHtml);
};

store.subscribe(render);
render();

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

filtersElem.click(".filter-btn", event => {
    event.preventDefault();
    
    const filter = event.target.id;
    
    if (filter) {
        store.dispatch(setVisibilityFilter(filter));
    }
});