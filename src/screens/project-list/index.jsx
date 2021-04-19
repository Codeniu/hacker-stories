import { useSemiPersistent } from '@/utils/use-semi-persistent';
import axios from 'axios';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import styled from 'styled-components';
import LastSearches from './last-searches';
import List from './list';
import SearchForm from './search-form';

const ProjectList = () => {
    const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';
    const [searchTerm, setSearchTerm] = useSemiPersistent('search', 'react');
    const [urls, setUrls] = useState([`${API_ENDPOINT}${searchTerm}`]);

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
        handleSearch(searchTerm);
        event.preventDefault();
    };

    // search history
    const extractSearchTerm = url => url.replace(API_ENDPOINT, '');
    const getLastSearches = urls =>
        urls
            .reduce((result, url, index) => {
                const searchTerm = extractSearchTerm(url);

                if (index === 0) {
                    return result.concat(searchTerm);
                }

                const previousSearchTerm = result[result.length - 1];

                if (searchTerm === previousSearchTerm) {
                    return result;
                } else {
                    return result.concat(searchTerm);
                }
            }, [])
            .slice(-6)
            .slice(0, -1);

    const handleLastSearch = searchTerm => {
        setSearchTerm(searchTerm);
        handleSearch(searchTerm);
    };
    const handleSearch = searchTerm => {
        const url = `${API_ENDPOINT}${searchTerm}`;
        setUrls(urls.concat(url));
    };
    const lastSearches = getLastSearches(urls);

    const handleFetchStories = useCallback(async () => {
        dispatchStories({ type: 'STORIES_FETCH_INIT' });
        try {
            const lastUrl = urls[urls.length - 1];
            const result = await axios.get(lastUrl);

            dispatchStories({
                type: 'STORIES_FETCH_SUCCESS',
                payload: result.data.hits,
            });
        } catch {
            dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urls]);

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
                <LastSearches
                    lastSearches={lastSearches}
                    handleLastSearch={handleLastSearch}
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
    position: sticky;
    top: 0;
    background: #83a4d4;
    background: linear-gradient(to left, #b6fbff, #83a4d4);
    box-shadow: ${props => (props.active ? ' 0 5px 20px -10px #000' : '')};
`;

export default ProjectList;
