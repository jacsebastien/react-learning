import * as actionTypes from './actionTypes';

// Declaring action creators to use it in components
export const increment = () => {
    return { type: actionTypes.INC };
};
export const decrement = () => {
    return { type: actionTypes.DEC };
};
export const add = (value) => {
    return { type: actionTypes.ADD, value: value };
};
export const subtract = (value) => {
    return { type: actionTypes.SUB, value: value };
};
