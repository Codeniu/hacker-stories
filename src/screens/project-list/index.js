import { useSemiPersistent } from '@/utils/use-semi-persistent';
import axios from 'axios';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import styled from 'styled-components';
import List from './list';
import SearchForm from './search-form';

const ProjectList = () => {
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

    // header style controller
    const [isScrolled, setIsScrolled] = useState(false);
    const mainContainer = useRef();

    document.addEventListener('scroll', () => {
        if (mainContainer.current) {
            const elemTop = mainContainer.current.getBoundingClientRect().top;
            if (elemTop < 100) {
                setIsScrolled(true);
            } else if (elemTop > 100 && isScrolled) {
                setIsScrolled(false);
            }
        }
    });

    return (
        <>
            <StyledHeadlinePrimary active={isScrolled}>
                My Hacker Stories
            </StyledHeadlinePrimary>
            <StyledContainer ref={mainContainer}>
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
                    <List
                        list={searchedStories}
                        onRemoveItem={handleRemoveStory}
                    />
                )}
            </StyledContainer>
        </>
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

const StyledHeadlinePrimary = styled.div`
    padding: 2rem;
    z-index: 99;

    height: 8rem;
    font-size: 4.8rem;
    font-weight: 300;
    letter-spacing: 0.2rem;
    border-bottom: ${props => (props.active ? '0.2' : '0') + 'rem solid #fff'};

    position: sticky;
    top: 0;
    background: #83a4d4;
    background: linear-gradient(to left, #b6fbff, #83a4d4);

    /* clip-path: polygon(0 0, 100% 0, 100% 5vh, 0 100%);  */
`;
// const StyledButtonLarge = styled(StyledButton)`
//     padding: 10px;
// `;

export default ProjectList;
