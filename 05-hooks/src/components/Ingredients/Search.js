import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import './Search.css';
import useHttp from '../../hooks/http';

const Search = React.memo(props => {
    const { afterIngredientsLoaded } = props;   // Object destructuring => convert object properties to normal properties
    const [filterState, setFilterState] = useState('');
    const inputRef = useRef();
    const { isLoading, data, error, sendRequest, clearRequest } = useHttp();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (filterState === inputRef.current.value) {
                const query = filterState.length === 0 ? '' : `?orderBy="title"&equalTo="${filterState}"`;

                sendRequest(
                    'https://react-hooks-8b80e.firebaseio.com/ingredients.json' + query,
                    'GET'
                );
                // fetch('https://react-hooks-8b80e.firebaseio.com/ingredients.json' + query)
                //     .then(response => response.json())
                //     .then(body => {
                //         const loadedIngredients = body ? Object.keys(body).map(key => ({
                //             id: key,
                //             title: body[key].title,
                //             amount: body[key].amount
                //         })) : [];

                //         afterIngredientsLoaded(loadedIngredients);
                //     });
            }
        }, 500);

        // clean up function on re render or unmount for single call
        return () => {
            clearTimeout(timer);
        };
    }, [filterState, sendRequest]);

    useEffect(() => {
        if (!isLoading && !error) {
            const loadedIngredients = data ? Object.keys(data).map(key => ({
                id: key,
                title: data[key].title,
                amount: data[key].amount
            })) : [];
            afterIngredientsLoaded(loadedIngredients);
        }
    }, [data, isLoading, error, afterIngredientsLoaded]);

    return (
        <section className="search">
            {error && <ErrorModal onClose={clearRequest}>{error}</ErrorModal>}
            <Card>
                <div className="search-input">
                    <label>Filter by Title</label>
                    {isLoading && <span>Loading ...</span>}
                    <input
                        ref={inputRef}
                        type="text"
                        value={filterState}
                        onChange={event => setFilterState(event.target.value)}
                    />
                </div>
            </Card>
        </section>
    );
});

export default Search;
