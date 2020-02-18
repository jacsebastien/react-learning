import React from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionCreators from '../../store/actions';

const Counter = props => {
    return (
        <div>
            <CounterOutput value={props.ctr} /> {/* Access props updated by Redux */}
            <CounterControl label="Increment" clicked={props.onIncrement} />
            <CounterControl label="Decrement" clicked={props.onDecrement} />
            <CounterControl label="Add 5" clicked={() => props.onAdd(5)} />
            <CounterControl label="Subtract 5" clicked={() => props.onSub(5)} />
            <hr />
            <button onClick={() => props.onStoreResult(props.ctr)}>Store Result</button>
            <ul>
                {props.res.map((item, index) => (
                    <li key={index} onClick={() => props.onDeleteResult(index)}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

// Bind Redux state to component properties
const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        res: state.res.results
    };
};

// Bind Redux dispatch functions to component properties
const mapDispatchToProps = dispatch => {
    return {
        onIncrement: () => dispatch(actionCreators.increment()),
        onDecrement: () => dispatch(actionCreators.decrement()),
        onAdd: (value) => dispatch(actionCreators.add(value)),
        onSub: (value) => dispatch(actionCreators.subtract(value)),
        onStoreResult: (res) => dispatch(actionCreators.storeResult(res)),
        onDeleteResult: (selIndex) => dispatch(actionCreators.deleteResult(selIndex))
    };
};

// Connect Redux to component
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
