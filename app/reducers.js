import expect from "expect";
import deepFreeze from "deep-freeze-strict";
import { combineReducers } from "redux";

import { ADD_TODO, SET_VISIBILITY_FILTER, SHOW_ALL, TOGGLE_TODO } from "./actions";



/* Reducers
 ============================= */
const todos = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    id:        action.id,
                    text:      action.text,
                    completed: false
                }
            ];
        case TOGGLE_TODO:
            return state.map(todo => {
                if (todo.id !== action.id) {
                    return todo;
                }
                return Object.assign({}, todo, {
                    completed: !todo.completed
                });
            });
        default:
            return state;
    }
};

const visibilityFilter = (state = SHOW_ALL, action) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
};

// Root reducer
export const todoApp = combineReducers({
    todos,
    visibilityFilter
});


/* Tests
 ============================= */
const testAddTodo = () => {
    const stateBefore = [];
    const action      = {
        type: ADD_TODO,
        text: "Learn Redux",
        id:   0
    };
    const stateAfter  = [
        {
            text:      "Learn Redux",
            id:        0,
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
            text:      "Learn Redux",
            id:        0,
            completed: false
        },
        {
            text:      "Go home",
            id:        1,
            completed: false
        },
        {
            text:      "buy milk",
            id:        2,
            completed: false
        }
    ];
    const action      = {
        type: TOGGLE_TODO,
        id:   1
    };
    const stateAfter  = [
        {
            text:      "Learn Redux",
            id:        0,
            completed: false
        },
        {
            text:      "Go home",
            id:        1,
            completed: true
        },
        {
            text:      "buy milk",
            id:        2,
            completed: false
        }
    ];
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testVisibilityFilter = () => {
    const stateBefore = SHOW_ALL;
    const action = {
        type: SET_VISIBILITY_FILTER,
        filter: "SHOW_COMPLETED"
    };
    const stateAfter = "SHOW_COMPLETED";
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(visibilityFilter(stateBefore, action)).toEqual(stateAfter);
};

testAddTodo();
testToggleTodo();
testVisibilityFilter();

console.debug("All test passed!");