import React, { useState, useEffect, useCallback, useReducer, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';

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

// function Ingredients() { }
const Ingredients = () => {
    const [ ingredients, dispatch ] = useReducer(ingredientReducer, []);
    const {isLoading, data, error, requestExtra, requestIdentifier, sendRequest} = useHttp();

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

    // Called ONLY when data changed from useHttp()
    useEffect(() => {
        if(!isLoading && !error) {
            switch(requestIdentifier) {
                case 'REMOVE_INGREDIENT':
                    dispatch({ type: 'DELETE', id: requestExtra });
                    break;
                case 'ADD_INGREDIENT':
                    dispatch({ type: 'ADD', ingredient: { id: data.name, ...requestExtra } });
                    break;
                // default:
            }
        }
    }, [data, requestExtra, requestIdentifier, isLoading, error]);

    // useCallback avoid function to be recreated on each re rendering of the component
    // Works like useEffect, with [] of dependecies as a second argument, it will be created only on component init
    const filterIngredientsHandler = useCallback((filteredIngredients) => {
        // setIngredientsState(filteredIngredients);
        dispatch({ type: 'SET', ingredients: filteredIngredients }); // Use reduced in place of state
    }, []);

    const addIngredientHandler = useCallback((ingredient) => {
        sendRequest(
            'https://react-hooks-8b80e.firebaseio.com/ingredients.json',
            'POST',
            JSON.stringify(ingredient),
            ingredient,
            'ADD_INGREDIENT');
        // setLoadingState(true);
        // dispatchHttpState({ type: 'SEND' });
        // fetch('https://react-hooks-8b80e.firebaseio.com/ingredients.json', {
        //     method: 'POST',
        //     body: JSON.stringify(ingredient),
        //     headers: { 'Content-Type': 'application/json' }
        // })
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((body) => {
        //         // setLoadingState(false);
        //         dispatchHttpState({ type: 'RESPONSE' });

        //         // Firebase create a "name" property which one we can use as an id
        //         // setIngredientsState(prevState => [...prevState, { id: body.name, ...ingredient }]);
        //         dispatch({ type: 'ADD', ingredient: { id: body.name, ...ingredient } });
        //     });
    }, [sendRequest]);

    const removeIngredientHandler = useCallback((id) => {
        sendRequest(
            `https://react-hooks-8b80e.firebaseio.com/ingredients/${id}.json`,
            'DELETE',
            null,
            id,
            'REMOVE_INGREDIENT');
        // setLoadingState(true);
        // dispatchHttpState({ type: 'SEND' });

        // fetch(`https://react-hooks-8b80e.firebaseio.com/ingredients/${id}.json`, {
        //     method: 'DELETE'
        // })
        //     .then(() => {
        //         // setLoadingState(false);
        //         dispatchHttpState({ type: 'RESPONSE' });

        //         // setIngredientsState(prevState => prevState.filter(ingredient => ingredient.id !== id));
        //         dispatch({ type: 'DELETE', id: id });
        //     })
        //     .catch((error) => {
        //         console.log(error.message);
        //         // setLoadingState(false);
        //         // setErrorState('Something went wrong !');
        //         dispatchHttpState({ type: 'ERROR', error: 'Something went wrong !' });
        //     });
    }, [sendRequest]);

    const clearError = useCallback(() => {
        // setErrorState(null);
        // dispatchHttpState({ type: 'CLEAR' });
    }, []);

    // rebuild component only when one of the dependencies changes (alternative of React.memo() inside components)
    const ingredientsList = useMemo(() => {
        return <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />;
    }, [ingredients, removeIngredientHandler]);

    return (
        <div className="App">
            {/* {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>} */}
            {/* <IngredientForm onAddIngredient={addIngredientHandler} isLoading={isLoading} /> */}
            {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
            <IngredientForm onAddIngredient={addIngredientHandler} isLoading={isLoading} />

            <section>
                <Search afterIngredientsLoaded={filterIngredientsHandler} />
                {ingredientsList}
            </section>
        </div>
    );
};

export default Ingredients;
