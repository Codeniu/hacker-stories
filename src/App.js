import InputWithLabel from '@/components/input-with-label';
import List from '@/screens/list/list';
import { useSemiPersistent } from '@/utils/use-semi-persistent';
import axios from 'axios';
import { useCallback, useEffect, useReducer, useState } from 'react';
import './App.css';

const App = () => {
    const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';
    const [searchTerm, setSearchTerm] = useSemiPersistent('search', 'react');
    const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

    const storiesReducer = (state, action) => {
        switch (action.type) {
            case 'STORIES_FETCH_INIT':
                return {
                    ...state,
                    isLoading: true,
                    isError: false,
                };
            case 'STORIES_FETCH_SUCCESS':
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    data: action.payload,
                };
            case 'STORIES_FETCH_FAILURE':
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                };
            case 'REMOVE_STORY':
                return {
                    ...state,
                    data: state.data.filter(
                        story => action.payload.objectID !== story.objectID
                    ),
                };
            default:
                throw new Error();
        }
    };
    const [stories, dispatchStories] = useReducer(storiesReducer, {
        data: [],
        isLoading: false,
        isError: false,
    });

    const handleSearchInput = event => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = event => {
        setUrl(`${API_ENDPOINT}${searchTerm}`);
        event.preventDefault();
    };

    const handleFetchStories = useCallback(async () => {
        dispatchStories({ type: 'STORIES_FETCH_INIT' });
        try {
            const result = await axios.get(url);

            dispatchStories({
                type: 'STORIES_FETCH_SUCCESS',
                payload: result.data.hits,
            });
        } catch {
            dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    useEffect(() => {
        handleFetchStories();
    }, [handleFetchStories]);

    const handleRemoveStory = item => {
        dispatchStories({
            type: 'REMOVE_STORY',
            payload: item,
        });
    };

    const searchedStories = stories.data.filter(
        story =>
            story.title &&
            story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="project-list">
            <h1 className="headlinePrimary">My Hacker Stories</h1>
            {stories.isError && (
                <p style={{ color: 'red' }}>Something is error!!!</p>
            )}

            <SearchForm
                handleSearchSubmit={handleSearchSubmit}
                searchTerm={searchTerm}
                handleSearchInput={handleSearchInput}
            />
            <br />
            {stories.isLoading ? (
                <p>Loading...</p>
            ) : (
                <List list={searchedStories} onRemoveItem={handleRemoveStory} />
            )}
        </div>
    );
};

export default App;

const SearchForm = ({ handleSearchSubmit, searchTerm, handleSearchInput }) => {
    return (
        <form onSubmit={handleSearchSubmit}>
            <InputWithLabel
                id="search"
                label="Search"
                isFocused
                value={searchTerm}
                onInputChange={handleSearchInput}
            >
                <strong>Search</strong>
            </InputWithLabel>
            <button type="submit" disabled={!searchTerm}>
                Submit
            </button>
        </form>
    );
};
