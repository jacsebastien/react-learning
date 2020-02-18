import { useState, useEffect } from 'react';

// Creating global properties not recreated each time useStore is called
let globalState = {};
let listeners = [];
let actions = {};

// If properties were put into the custom hook, data will be exclusive to each component that call the hook and not global to the application
export const useStore = () => {
    // const [state, setState] = useState(globalState);
    const setState = useState(globalState)[1];

    const dispatch = (actionIdentifier, payload) => {
        // actions are functions and we pass globalState to it to get a new state and a payload to get additional data
        const newState = actions[actionIdentifier](globalState, payload);

        // merge newState with old one
        globalState = { ...globalState, ...newState };

        // Inform all components listening to this store that globaState has changed
        for (const listener of listeners) {
            listener(globalState);
        }
    };

    useEffect(
        () => {
            // Each time a component use useStore, it will have his own setState, pushed into listenes array (one setState per component)
            listeners.push(setState);

            return () => {
                // Remove setState from listeners when component that use useStore is removed
                listeners = listeners.filter((li) => li != setState);
            };
            // once setState is used in a component it never changes, so it will not trigger useEffect again and again
        },
        [ setState ]
    );

    return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
    if(initialState) {
        globalState = {...globalState, ...initialState};
    }

    actions = {...actions, ...userActions};
};
