const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
};

// Reducer
// If state is undefined, init it with initialState
const rootReducer = (state = initialState, action) => {
    return state;
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Dispatching action

// Subscription
