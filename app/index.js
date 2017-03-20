import expect from "expect";
import deepFreeze from "deep-freeze-strict";

import { createStore, combineReducers, applyMiddleware } from "redux";
import createLogger from "redux-logger";


/* Reducers
 ============================= */
const todo = (state = {}, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case "TOGGLE_TODO":
            if (state.id !== action.id) {
                return state;
            }
    
            return Object.assign({}, state, {
                completed: !state.completed
            });
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [
                ...state,
                todo(undefined, action)
            ];
        case "TOGGLE_TODO":
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
    switch (action.type) {
        case "SET_VISIBILITY_FILTER":
            return action.filter;
        default:
            return state;
    }
};

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const logger = createLogger();
const store = createStore(todoApp, applyMiddleware(logger));

/* Dispatch actions
============================= */
store.dispatch({type: "ADD_TODO", text: "Go home!", id: 0});
store.dispatch({type: "ADD_TODO", text: "Do something!", id: 1});
store.dispatch({type: "TOGGLE_TODO", id: 5});
store.dispatch({type: "SET_VISIBILITY_FILTER", filter: "SHOW_ACTIVE"});

/* Test Reducers
 ============================= */
const testAddTodo = () => {
    const stateBefore = [];
    const action      = {
        type: "ADD_TODO",
        id:   0,
        text: "Learn Redux"
    };
    const stateAfter  = [
        {
            id:        0,
            text:      "Learn Redux",
            completed: false
        }
    ];
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
    const stateBefore = [
        {
            id:        0,
            text:      "Learn Redux",
            completed: false
        },
        {
            id:        1,
            text:      "Walk the dog",
            completed: false
        },
        {
            id:        2,
            text:      "Buy milk",
            completed: false
        },
    ];
    const action      = {
        type: "TOGGLE_TODO",
        id:   1
    };
    const stateAfter  = [
        {
            id:        0,
            text:      "Learn Redux",
            completed: false
        },
        {
            id:        1,
            text:      "Walk the dog",
            completed: true
        },
        {
            id:        2,
            text:      "Buy milk",
            completed: false
        },
    ];
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testVisibilityFilter = () => {
    const stateBefore = "SHOW_ALL";
    const action = {
        type: "SET_VISIBILITY_FILTER",
        filter: "SHOW_COMPLETED"
    };
    const stateAfter = "SHOW_COMPLETED";
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(visibilityFilter(stateBefore, action)).toEqual(stateAfter);
    expect(visibilityFilter(stateBefore, {
        type: "SET_VISIBILITY_FILTER",
        filter: "SHOW_ALL"
    })).toEqual("SHOW_ALL");
};

testAddTodo();
testToggleTodo();
testVisibilityFilter();

console.debug("All tests passed!");