import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

// function Ingredients() {
const Ingredients = () => {
    const [ingredientsState, setIngredientsState] = useState([]);

    const addIngredientHandler = ingredient => {
        const newIngredient = {
            id: ingredientsState.length ? ingredientsState.length : 0,
            ...ingredient
        };

        setIngredientsState(prevState => [...prevState, newIngredient]);
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
