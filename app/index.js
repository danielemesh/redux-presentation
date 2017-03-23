import expect from "expect";
import deepFreeze from "deep-freeze-strict";

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
        default:
            return state;
    }
};


/* Tests
 ============================= */
const testAddTodo = () => {
    const stateBefore = [];
    const action      = {
        type: "ADD_TODO",
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

testAddTodo();

console.debug("All test passed!");