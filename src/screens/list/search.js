export const Search = ({ search, onSearch }) => {
    return (
        <>
            <label htmlFor="search">Search:</label>
            <input
                id="search"
                type="text"
                onChange={onSearch}
                value={search}
            ></input>
        </>
    );
};
export default Search;
