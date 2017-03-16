import expect from "expect";
import deepFreeze from "deep-freeze-strict";

import { combineReducers } from "redux";
import { ADD_TODO, TOGGLE_TODO, SHOW_ALL, SET_VISIBILITY_FILTER } from "./actions";

/* Reducers
============================= */
export const todo = (state, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                id:        action.id,
                text:      action.text,
                completed: false
            };
        case TOGGLE_TODO:
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

export const todos = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                todo(undefined, action)
            ];
        case TOGGLE_TODO:
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

export const visibilityFilter = (state = SHOW_ALL, action) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
};

export const todoApp = combineReducers({
    todos,
    visibilityFilter
});

/* Reducers Tests
 ============================= */
const testAddTodo = () => {
    const stateBefore = [];
    const action      = {
        type: ADD_TODO,
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
        type: TOGGLE_TODO,
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

testAddTodo();
testToggleTodo();

console.log("All Tests passed!");