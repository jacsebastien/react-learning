export const INC = 'INC';
export const DEC = 'DEC';
export const ADD = 'ADD';
export const SUB = 'SUB';
export const STORE = 'STORE';
export const DELETE = 'DELETE';

// Declaring action creators to use it in components
export const increment = () => {
    return { type: INC };
};
export const decrement = () => {
    return { type: DEC };
};
export const add = (value) => {
    return { type: ADD, value: value };
};
export const subtract = (value) => {
    return { type: SUB, value: value };
};

export const saveResult = (value) => {
    return { type: STORE, result: value };
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
    return { type: DELETE, index: value };
};
