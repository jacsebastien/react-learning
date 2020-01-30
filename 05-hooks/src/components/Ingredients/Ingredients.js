import React, { useState, useEffect, useCallback, useReducer, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (currentIngredients, action) => {
    switch (action.type) {
        case 'SET':
            return action.ingredients;
        case 'ADD':
            return [ ...currentIngredients, action.ingredient ];
        case 'DELETE':
            return currentIngredients.filter((i) => i.id !== action.id);
        default:
            throw new Error('Oops, action not handled !');
    }
};

const httpReducer = (currentState, action) => {
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null };
        case 'RESPONSE':
            return { ...currentState, loading: false };
        case 'ERROR':
            return { loading: false, error: action.error };
        case 'CLEAR':
            return { ...currentState, error: null };
        default:
            throw new Error('Oops, action not handled !');
    }
};

// function Ingredients() { }
const Ingredients = () => {
    const [ ingredients, dispatch ] = useReducer(ingredientReducer, []);
    const [ httpState, dispatchHttpState ] = useReducer(httpReducer, { loading: false, error: null });
    // const [ingredients, setIngredientsState] = useState([]);
    // const [ isLoading, setLoadingState ] = useState(false);
    // const [ error, setErrorState ] = useState();

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
    // Works like useEffect, with [] of dependecies as a second argument, it will be created only on component init
    const filterIngredientsHandler = useCallback((filteredIngredients) => {
        // setIngredientsState(filteredIngredients);
        dispatch({ type: 'SET', ingredients: filteredIngredients }); // Use reduced in place of state
    }, []);

    const addIngredientHandler = useCallback((ingredient) => {
        // setLoadingState(true);
        dispatchHttpState({ type: 'SEND' });
        fetch('https://react-hooks-8b80e.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                return response.json();
            })
            .then((body) => {
                // setLoadingState(false);
                dispatchHttpState({ type: 'RESPONSE' });

                // Firebase create a "name" property which one we can use as an id
                // setIngredientsState(prevState => [...prevState, { id: body.name, ...ingredient }]);
                dispatch({ type: 'ADD', ingredient: { id: body.name, ...ingredient } });
            });
    }, []);

    const removeIngredientHandler = useCallback((id) => {
        // setLoadingState(true);
        dispatchHttpState({ type: 'SEND' });

        fetch(`https://react-hooks-8b80e.firebaseio.com/ingredients/${id}.json`, {
            method: 'DELETE'
        })
            .then(() => {
                // setLoadingState(false);
                dispatchHttpState({ type: 'RESPONSE' });

                // setIngredientsState(prevState => prevState.filter(ingredient => ingredient.id !== id));
                dispatch({ type: 'DELETE', id: id });
            })
            .catch((error) => {
                console.log(error.message);
                // setLoadingState(false);
                // setErrorState('Something went wrong !');
                dispatchHttpState({ type: 'ERROR', error: 'Something went wrong !' });
            });
    }, []);

    const clearError = useCallback(() => {
        // setErrorState(null);
        dispatchHttpState({ type: 'CLEAR' });
    }, []);

    // rebuild component only when one of the dependencies changes (alternative of React.memo() inside components)
    const ingredientsList = useMemo(() => {
        return <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />;
    }, [ingredients, removeIngredientHandler]);

    return (
        <div className="App">
            {/* {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>} */}
            {/* <IngredientForm onAddIngredient={addIngredientHandler} isLoading={isLoading} /> */}
            {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
            <IngredientForm onAddIngredient={addIngredientHandler} isLoading={httpState.loading} />

            <section>
                <Search afterIngredientsLoaded={filterIngredientsHandler} />
                {ingredientsList}
            </section>
        </div>
    );
};

export default Ingredients;
