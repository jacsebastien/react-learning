import { useReducer, useCallback } from 'react';

const httpReducer = (currentState, action) => {
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null, data: null, extra: null, identifier: null };
        case 'RESPONSE':
            return { ...currentState, loading: false, data: action.data, extra: action.extra, identifier: action.identifier };
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
        data: null,
        extra: null,
        identifier: null
    });

    const sendRequest = useCallback((url, method, body, extra, identifier) => {
        dispatchHttpState({ type: 'SEND'});

        fetch(url, {
            method: method,
            body: body,
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            return response.json();
        }).then(body => {
            dispatchHttpState({ type: 'RESPONSE', data: body, extra: extra, identifier: identifier });
        }).catch(error => {
            dispatchHttpState({ type: 'ERROR', error: 'Something went wrong !' });
        });
    }, []);

    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        requestExtra: httpState.extra,
        requestIdentifier: httpState.identifier,
        sendRequest: sendRequest
    };
};

export default useHttp;
