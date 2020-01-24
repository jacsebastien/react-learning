import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
    const { afterIngredientsLoaded } = props;   // Object destructuring => convert object properties to normal properties
    const [filterState, setFilterState] = useState('');

    useEffect(() => {
        const query = filterState.length === 0 ? '' : `?orderBy="title"&equalTo="${filterState}`;

        fetch('https://react-hooks-8b80e.firebaseio.com/ingredients.json' + query)
            .then(response => response.json())
            .then(body => {
                const loadedIngredients = Object.keys(body).map(key => ({
                    id: key,
                    title: body[key].title,
                    amount: body[key].amount
                }));

                afterIngredientsLoaded(loadedIngredients);
            });
    }, [filterState, afterIngredientsLoaded]);

    return (
        <section className="search">
            <Card>
                <div className="search-input">
                    <label>Filter by Title</label>
                    <input
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
