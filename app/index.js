import expect from "expect";
import deepFreeze from "deep-freeze-strict";
import { applyMiddleware, createStore } from "redux";
import createLogger from "redux-logger";


/* Reducers
============================= */
const todos = (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [
                ...state,
                {
                    id:        action.id,
                    text:      action.text,
                    completed: false
                }
            ];
        case "TOGGLE_TODO":
            return state.map(todo => {
                if (todo.id !== action.id) {
                    return todo;
                }
                return Object.assign({}, todo, { completed: !todo.completed });
            });
        default:
            return state;
    }
};

const logger = createLogger();
const store  = createStore(todos, applyMiddleware(logger));


/* Dispatch actions
============================= */
store.dispatch({ type: "ADD_TODO", id: 0, text: "Learn Redux!" });
store.dispatch({ type: "ADD_TODO", id: 1, text: "Go to the gym" });
store.dispatch({ type: "TOGGLE_TODO", id: 1 });


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
