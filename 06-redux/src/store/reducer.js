const initialState = {
    counter: 0,
    results: []
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INC':
            return {
                ...state,
                counter: state.counter + 1
            };
        case 'DEC':
            return {
                ...state,
                counter: state.counter - 1
            };
        case 'ADD':
            return {
                ...state,
                counter: state.counter + action.value
            };
        case 'SUB':
            return {
                ...state,
                counter: state.counter - action.value
            };
        case 'STORE':
            return {
                ...state,
                results: [...state.results, state.counter]
            };
        case 'DELETE':
            return {
                ...state
            };
        default:
            return state;
    }
};

export default reducer;
