import React from 'react';

const withClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            {/* send all props to the wrapped compnent */}
            <WrappedComponent { ...props } />
        </div>
    );
};

// const WithClass = props => (
//     <div className={props.classes}>
//         {props.children}
//     </div>
// );

export default withClass;
