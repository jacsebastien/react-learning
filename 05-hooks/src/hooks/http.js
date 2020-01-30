import { useReducer, useCallback } from 'react';

const httpReducer = (currentState, action) => {
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null, data: null };
        case 'RESPONSE':
            return { ...currentState, loading: false, data: action.data };
        case 'ERROR':
            return { loading: false, error: action.error };
        case 'CLEAR':
            return { ...currentState, error: null };
        default:
            throw new Error('Oops, action not handled !');
    }
};

const useHttp = () => {
    const [httpState, dispatchHttpState] = useReducer(httpReducer, {
        loading: false,
        error: null,
        data: null
    });

    const sendRequest = useCallback((url, method, body) => {
        dispatchHttpState({ type: 'SEND' });

        fetch(url, {
            method: method,
            body: body,
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            return response.json();
        }).then(body => {
            dispatchHttpState({ type: 'RESPONSE', data: body });
        }).catch(error => {
            dispatchHttpState({ type: 'ERROR', error: 'Something went wrong !' });
        });
    }, []);

    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest
    };
};

export default useHttp;
