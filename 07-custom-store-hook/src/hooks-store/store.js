import { useState, useEffect } from 'react';

// Creating global properties not recreated each time useStore is called
let globalState = {};
let listeners = [];
let actions = {};

// If properties were put into the custom hook, data will be exclusive to each component that call the hook and not global to the application
const useStore = () => {
    // const [state, setState] = useState(globalState);
    const setState = useState(globalState)[1];

    useEffect(() => {
        // Each time a component use useStore, it will have his own setState, pushed into listenes array (one setState per component)
        listeners.push(setState);

        return () => {
            // Remove setState from listeners when component that use useStore is removed
            listeners = listeners.filter(li => li != setState);
        };
    // once setState is used in a component it never changes, so it will not trigger useEffect again and again
    }, [setState]);
};
