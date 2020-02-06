import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    results: []
};

const storeResult = (state, action) => {
    const newResults =  [...state.results, action.result];
    return updateObject(state, {results: newResults});
};
const deleteResult = (state, action) => {
    const newResults = state.results.filter((r, i) => i !== action.index);
    return updateObject(state, {results: newResults});
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE:
            return storeResult(state, action);
        case actionTypes.DELETE:
            return deleteResult(state, action);
        default:
            return state;
    }
};

export default reducer;
