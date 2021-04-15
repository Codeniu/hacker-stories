import InputWithLabel from '@/components/input-with-label';
import List from '@/screens/list/list';
import { useSemiPersistent } from '@/utils/use-semi-persistent';
import { useCallback, useEffect, useReducer } from 'react';
import './App.css';

const App = () => {
    const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';
    const [searchTerm, setSearchTerm] = useSemiPersistent('search', 'react');
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

    const handleFetchStories = useCallback(() => {
        if (!searchTerm) return;

        dispatchStories({ type: 'STORIES_FETCH_INIT' });

        fetch(`${API_ENDPOINT}${searchTerm}`)
            .then(response => response.json())
            .then(result => {
                dispatchStories({
                    type: 'STORIES_FETCH_SUCCESS',
                    payload: result.hits,
                });
            })
            .catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' }));
    }, [searchTerm]);

    useEffect(() => {
        handleFetchStories();
    }, [handleFetchStories]);

    const handleRemoveStory = item => {
        dispatchStories({
            type: 'REMOVE_STORY',
            payload: item,
        });
    };

    useEffect(() => {
        localStorage.setItem('search', searchTerm);
    }, [searchTerm]);

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const searchedStories = stories.data.filter(story =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="project-list">
            {stories.isError && (
                <p style={{ color: 'red' }}>Something is error!!!</p>
            )}
            {/* <Search search={searchTerm} onSearch={onSearch} /> */}
            <InputWithLabel
                id="search"
                label="Search"
                isFocused
                value={searchTerm}
                onInputChange={handleSearch}
            >
                <strong>Search</strong>
            </InputWithLabel>
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
