import InputWithLabel from '@/components/input-with-label';
// import PressedBtn from '@/components/pressed-button';
import List from '@/screens/list/list';
import { ReactComponents as Check } from '@/svgs/check.svg';
import { useSemiPersistent } from '@/utils/use-semi-persistent';
import axios from 'axios';
import { useCallback, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
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
        <StyledContainer>
            <StyledHeadlinePrimary>My Hacker Stories</StyledHeadlinePrimary>
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
        </StyledContainer>
    );
};

export default App;

const SearchForm = ({ handleSearchSubmit, searchTerm, handleSearchInput }) => {
    return (
        <StyledSearchForm onSubmit={handleSearchSubmit}>
            <InputWithLabel
                id="search"
                label="Search"
                isFocused
                value={searchTerm}
                onInputChange={handleSearchInput}
            >
                <strong>Search</strong>
            </InputWithLabel>
            <StyledButtonLarge type="submit" disabled={!searchTerm}>
                <Check width="18px" height="18px" />
            </StyledButtonLarge>
            {/* <PressedBtn /> */}
        </StyledSearchForm>
    );
};

const StyledContainer = styled.div`
    height: 100vw;
    padding: 20px;

    background: #83a4d4;
    background: linear-gradient(to left, #b6fbff, #83a4d4);

    color: #171212;
    font-size: 1.6rem;
`;

const StyledHeadlinePrimary = styled.h1`
    font-size: 4.8rem;
    font-weight: 300;
    letter-spacing: 0.2rem;
`;
const StyledSearchForm = styled.form`
    padding: 10px 0 20px 0;
    display: flex;
    align-items: baseline;
`;

const StyledButton = styled.button`
    background: transparent;
    border: 1px solid #607d8b;
    padding: 5px;
    cursor: pointer;

    outline-width: inherit;

    transition: all 0.1s ease-in;

    &:hover {
        background: #ff5722;
        color: #fff;
    }
`;

const StyledButtonLarge = styled(StyledButton)`
    padding: 10px;
`;
