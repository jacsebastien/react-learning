import React, { useState } from 'react';

export const AuthContext = React.createContext({
    isAuth: false,
    login: () => {} // used for autocompletion
});

// Create React component linked to AuthContext
const AuthContextProvider = props => {
    const [isAuth, setAuthState] = useState(false);

    const loginHandler = () => {
        setAuthState(true);
    };

    return (
        <AuthContext.Provider value={{login: loginHandler, isAuth: isAuth}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
