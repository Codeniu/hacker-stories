import InputWithLabel from '@/components/input-with-label';
import List from '@/screens/list/list';
import { useSemiPersistent } from '@/utils/use-semi-persistent';
import { useEffect, useReducer } from 'react';
import './App.css';

const App = () => {
    const initialStories = [
        {
            title: 'React',
            url: 'https://reactjs.org/',
            author: 'Jordan Walke',
            num_comments: 3,
            points: 4,
            objectID: 0,
        },
        {
            title: 'Redux',
            url: 'https://redux.js.org/',
            author: 'Dan Abramov, Andrew Clark',
            num_comments: 2,
            points: 5,
            objectID: 1,
        },
    ];

    const [searchTerm, setSearchTerm] = useSemiPersistent('search', 'react');
    // const [stories, setStories] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [isError, setIsError] = useState(false);

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

    useEffect(() => {
        dispatchStories({ type: 'STORIES_FETCH_INIT' });
        getAsyncStories()
            .then(result => {
                dispatchStories({
                    type: 'STORIES_FETCH_SUCCESS',
                    payload: result.data.stories,
                });
            })
            .catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRemoveStory = item => {
        dispatchStories({
            type: 'REMOVE_STORY',
            payload: item,
        });
    };

    useEffect(() => {
        localStorage.setItem('search', searchTerm);
    }, [searchTerm]);

    const getAsyncStories = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ data: { stories: initialStories } });
            }, 2000);
        });
    };

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
