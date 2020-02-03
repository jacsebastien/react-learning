import * as actionTypes from './actions';

const initialState = {
    counter: 0,
    results: []
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.INC:
            return {
                ...state,
                counter: state.counter + 1
            };
        case actionTypes.DEC:
            return {
                ...state,
                counter: state.counter - 1
            };
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.value
            };
        case actionTypes.SUB:
            return {
                ...state,
                counter: state.counter - action.value
            };
        case actionTypes.STORE:
            return {
                ...state,
                results: [...state.results, state.counter]
            };
        case actionTypes.DELETE:
            return {
                ...state,
                results: state.results.filter((r, i) => i !== action.index)
            };
        default:
            return state;
    }
};

export default reducer;
