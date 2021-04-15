import { useEffect } from "react";
import "./App.css";
import List from "./screens/list/list";
import Search from "./screens/list/search";
import { useSemiPersistent } from "./utils/use-semi-persistent";

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useSemiPersistent("search", "react");

  const onSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  return (
    <div className="App">
      <h1>hello world,{searchTerm}</h1>

      <Search search={searchTerm} onSearch={onSearch} />
      <br />
      <List list={searchedStories} />
    </div>
  );
};

export default App;
