import React, { useState, useEffect, useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (currentIngredients, action) => {
    switch (action.type) {
    case 'SET':
        return action.ingredients;
    case 'ADD':
        return [...currentIngredients, action.ingredient];
    case 'DELETE':
        return currentIngredients.filter(i => i.id !== action.id);
    default:
        throw new Error('Oops, action not handled !');
    }
};

// function Ingredients() { }
const Ingredients = () => {
    const [ingredientsState, setIngredientsState] = useState([]);
    const [isLoading, setLoadingState] = useState(false);
    const [error, setErrorState] = useState();

    // By default, useEffet is called on first component render AND on each component update
    // with [] as a second argument, it will be called ONLY on first component render
    // useEffect(() => {
    //     fetch('https://react-hooks-8b80e.firebaseio.com/ingredients.json')
    //         .then(response => response.json())
    //         .then(body => {
    //             const loadedIngredients = Object.keys(body).map(key => ({
    //                 id: key,
    //                 title: body[key].title,
    //                 amount: body[key].amount
    //             }));
    //             setIngredientsState(loadedIngredients);
    //         });
    // }, []);

    // Called ONLY when ingredientsState changed
    // useEffect(() => {
    //     console.log('RENDERING INGREDIENTS', ingredientsState);
    // }, [ingredientsState]);

    // useCallback avoid function to be recreated on each re rendering of the component
    const filterIngredientsHandler = useCallback(filteredIngredients => {
        setIngredientsState(filteredIngredients);
    }, []);

    const addIngredientHandler = ingredient => {
        setLoadingState(true);
        fetch('https://react-hooks-8b80e.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            return response.json();
        }).then(body => {
            setLoadingState(false);
            // Firebase create a "name" property which one we can use as an id
            setIngredientsState(prevState => [...prevState, { id: body.name, ...ingredient }]);
        });
    };

    const removeIngredientHandler = id => {
        setLoadingState(true);
        fetch(`https://react-hooks-8b80e.firebaseio.com/ingredients/${id}`, {
            method: 'DELETE'
        }).then(() => {
            setLoadingState(false);
            setIngredientsState(prevState => prevState.filter(ingredient => ingredient.id !== id));
        }).catch(error => {
            console.log(error.message);
            setLoadingState(false);
            setErrorState('Something went wrong !');
        });
    };

    const clearError = () => {
        setErrorState(null);
    };

    return (
        <div className="App">
            {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
            <IngredientForm onAddIngredient={addIngredientHandler} isLoading={isLoading} />

            <section>
                <Search afterIngredientsLoaded={filterIngredientsHandler} />
                <IngredientList ingredients={ingredientsState} onRemoveItem={removeIngredientHandler} />
            </section>
        </div>
    );
};

export default Ingredients;
