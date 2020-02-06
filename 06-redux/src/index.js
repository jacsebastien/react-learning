import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

const loggerMiddleware = store => {
    return next => {
        return action => {
            console.log('[Middleware] dispatching', action);
            // ... we can change the action in middleware
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        };
    };
};

// Config to use Redux devtool browsers extensions and connect app to it
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(loggerMiddleware)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
