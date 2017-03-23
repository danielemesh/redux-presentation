/* Todos actions
============================= */
export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

/* Filter actions
============================= */
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";
export const SHOW_ALL = "SHOW_ALL";
export const SHOW_COMPLETED = "SHOW_COMPLETED";
export const SHOW_ACTIVE = "SHOW_ACTIVE";


let nextTodoID = 0;

/* Action creators
============================= */
export const addTodo = (text) => {
    return {
        type: ADD_TODO,
        id: nextTodoID++,
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