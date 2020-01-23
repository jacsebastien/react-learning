import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
    // const [inputState, setInputState] = useState({ title: '', amount: '' });
    const [titleState, setTitleState] = useState('');
    const [amountState, setAmountState] = useState('');

    const submitHandler = event => {
        event.preventDefault();
        // ...
    };

    return (
        <section className="ingredient-form">
            <Card>
                <form onSubmit={submitHandler}>
                    <div className="form-control">
                        <label htmlFor="title">Name</label>
                        <input
                            type="text"
                            id="title"
                            value={titleState}
                            onChange={event => {
                                // !! Never use event object directly inside setState on inner closure functions !!
                                // Need to be stored in a property outside of setState method to avoid React locking "event" object update
                                // const newTitle = event.target.value;
                                // setInputState(prevState => ({
                                //     title: newTitle,
                                //     amount: prevState.amount
                                // }));

                                // But with a normal simpler setState it's ok
                                setTitleState(event.target.value);
                            }}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            value={amountState}
                            onChange={event => {
                                setAmountState(event.target.value);
                            }}
                        />
                    </div>
                    <div className="ingredient-form__actions">
                        <button type="submit">Add Ingredient</button>
                    </div>
                </form>
            </Card>
        </section>
    );
});

export default IngredientForm;
