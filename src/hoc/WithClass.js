import React from 'react';

const withClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            <WrappedComponent />
        </div>
    );
};

// const WithClass = props => (
//     <div className={props.classes}>
//         {props.children}
//     </div>
// );

export default withClass;
