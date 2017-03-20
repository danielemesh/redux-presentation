/* Todos Actions
============================= */
export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

/* Filter Actions
============================= */
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";
export const SHOW_ALL = "SHOW_ALL";
export const SHOW_ACTIVE = "SHOW_ACTIVE";
export const SHOW_COMPLETED = "SHOW_COMPLETED";

let nextTodoId = 0;

/* Action Creators
============================= */
export const addTodo = (text) => {
    return {
        id: nextTodoId++,
        type: ADD_TODO,
        text
    };
};

export const toggleTodo = (id) => {
    return {
        type: TOGGLE_TODO,
        id
    };
};

export const setVisibilityFilter = (filter) => {
    return {
        type: SET_VISIBILITY_FILTER,
        filter
    };
};