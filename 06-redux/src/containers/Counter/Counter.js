import React from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

const Counter = props => {
    return (
        <div>
            <CounterOutput value={props.ctr} /> {/* Access props updated by Redux */}
            <CounterControl label="Increment" clicked={props.onIncrement} />
            <CounterControl label="Decrement" clicked={props.onDecrement} />
            <CounterControl label="Add 5" clicked={props.onAdd} />
            <CounterControl label="Subtract 5" clicked={props.onSub} />
            <hr />
            <button onClick={props.onStoreResult}>Store Result</button>
            <ul>
                {props.res.map((item, index) => (
                    <li key={index} onClick={props.onDeleteResult}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

// Bind Redux state to component properties
const mapStateToProps = state => {
    return {
        ctr: state.counter,
        res: state.results
    };
};

// Bind Redux dispatch functions to component properties
const mapDispatchToProps = dispatch => {
    return {
        onIncrement: () => dispatch({ type: 'INC' }),
        onDecrement: () => dispatch({ type: 'DEC' }),
        onAdd: () => dispatch({ type: 'ADD', value: 5 }),
        onSub: () => dispatch({ type: 'SUB', value: 5 }),
        onStoreResult: () => dispatch({type: 'STORE'}),
        onDeleteResult: () => dispatch({type: 'DELETE'})
    };
};

// Connect Redux to component
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
