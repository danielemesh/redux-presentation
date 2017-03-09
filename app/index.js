import expect from "expect";
import deepFreeze from "deep-freeze-strict";

import { applyMiddleware, combineReducers, createStore } from "redux";
import createLogger from "redux-logger";


/* Reducers
 ============================= */
const todo = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                id:        action.id,
                text:      action.text,
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

//
//const todoApp = (state = {}, action) =>{
//    return {
//        todos: todos(state.todos, action),
//        visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//    };
//};

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const logger = createLogger();
const store  = createStore(todoApp, applyMiddleware(logger));


/* Dispatch actions
 ============================= */
store.dispatch({ type: "ADD_TODO", id: 0, text: "Learn Redux!" });
store.dispatch({ type: "ADD_TODO", id: 1, text: "Go to the gym" });
store.dispatch({ type: "TOGGLE_TODO", id: 1 });
store.dispatch({ type: "SET_VISIBILITY_FILTER", filter: "SHOW_COMPLETED" });


/* Tests
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

testAddTodo();
testToggleTodo();

console.log("All Tests are passed!");
