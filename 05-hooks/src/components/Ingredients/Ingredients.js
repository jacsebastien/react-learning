import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

// function Ingredients() {
const Ingredients = () => {
    const [ingredientsState, setIngredientsState] = useState([]);

    const addIngredientHandler = ingredient => {
        fetch('https://react-hooks-8b80e.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            return response.json();
        }).then(body => {
            // Firebase create a "name" property which one we can use as an id
            setIngredientsState(prevState => [ ...prevState, { id: body.name, ...ingredient } ]);
        });
    };

    const removeIngredientHandler = id => {
        setIngredientsState(prevState => prevState.filter(ingredient => ingredient.id !== id));
    };

    return (
        <div className="App">
            <IngredientForm onAddIngredient={addIngredientHandler} />

            <section>
                <Search />
                <IngredientList ingredients={ingredientsState} onRemoveItem={removeIngredientHandler} />
            </section>
        </div>
    );
};

export default Ingredients;
