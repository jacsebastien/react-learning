import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

// function Ingredients() { }
const Ingredients = () => {
    const [ingredientsState, setIngredientsState] = useState([]);

    // By default, useEffet is called on first component render AND on each component update
    // with [] as a second argument, it will be called ONLY on first component render
    useEffect(() => {
        fetch('https://react-hooks-8b80e.firebaseio.com/ingredients.json')
            .then(response => response.json())
            .then(body => {
                const loadedIngredients = Object.keys(body).map(key => ({
                    id: key,
                    title: body[key].title,
                    amount: body[key].amount
                }));
                setIngredientsState(loadedIngredients);
            });
    }, []);

    // Called ONLY when ingredientsState changed
    // useEffect(() => {
    //     console.log('RENDERING INGREDIENTS', ingredientsState);
    // }, [ingredientsState]);

    const filterIngredientsHandler = filteredIngredients => {
        setIngredientsState(filteredIngredients);
    };

    const addIngredientHandler = ingredient => {
        fetch('https://react-hooks-8b80e.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            return response.json();
        }).then(body => {
            // Firebase create a "name" property which one we can use as an id
            setIngredientsState(prevState => [...prevState, { id: body.name, ...ingredient }]);
        });
    };

    const removeIngredientHandler = id => {
        setIngredientsState(prevState => prevState.filter(ingredient => ingredient.id !== id));
    };

    return (
        <div className="App">
            <IngredientForm onAddIngredient={addIngredientHandler} />

            <section>
                <Search afterIngredientsLoaded={filterIngredientsHandler} />
                <IngredientList ingredients={ingredientsState} onRemoveItem={removeIngredientHandler} />
            </section>
        </div>
    );
};

export default Ingredients;
