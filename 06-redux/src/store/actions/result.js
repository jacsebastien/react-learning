import * as actionTypes from './actionTypes';

const saveResult = (value) => {
    return { type: actionTypes.STORE, result: value };
};

// Action creators can run async code thx to redux-thunk package
export const storeResult = (value) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(saveResult(value));
        }, 2000);
    };
};

export const deleteResult = (value) => {
    return { type: actionTypes.DELETE, index: value };
};
