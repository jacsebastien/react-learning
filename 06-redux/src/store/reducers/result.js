import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    results: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE:
            return updateObject(state, {results: [...state.results, action.result]});

        case actionTypes.DELETE:
            return updateObject(state, {results: state.results.filter((r, i) => i !== action.index)});
        default:
            return state;
    }
};

export default reducer;
