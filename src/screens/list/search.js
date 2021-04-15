export const Search = ({ search, onSearch }) => {
    return (
        <div>
            <label htmlFor="search">Search:</label>
            <input
                id="search"
                type="text"
                onChange={onSearch}
                value={search}
            ></input>
        </div>
    );
};
export default Search;
