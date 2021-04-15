import InputWithLabel from '@/components/input-with-label';
import List from '@/screens/list/list';
import { useSemiPersistent } from '@/utils/use-semi-persistent';
import { useEffect, useState } from 'react';
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
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getAsyncStories()
            .then(res => {
                setStories(res.data.stories);
                setIsLoading(false);
            })
            .catch(err => {
                setIsError(true);
            });
    });

    useEffect(() => {
        localStorage.setItem('search', searchTerm);
    }, [searchTerm]);

    const getAsyncStories = () =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve({ data: { stories: initialStories } });
            }, 2000);
        });

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const searchedStories = stories.filter(story =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="App">
            {isError && <p style={{ color: 'red' }}>Something is error!!!</p>}
            <h1>hello world,{searchTerm}</h1>
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
            {isLoading ? <p>Loading...</p> : <List list={searchedStories} />}
        </div>
    );
};

export default App;
