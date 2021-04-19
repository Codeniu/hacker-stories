import styled from 'styled-components';
const LastSearches = ({ lastSearches, handleLastSearch }) => {
    return (
        <SearchContainer>
            {lastSearches.map((searchTerm, index) => (
                <StyledButton
                    key={searchTerm + index}
                    type="button"
                    onClick={() => handleLastSearch(searchTerm)}
                >
                    {searchTerm}
                </StyledButton>
            ))}
        </SearchContainer>
    );
};
const SearchContainer = styled.div`
    display: flex;

    & > button {
        margin-right: 5px;
    }
`;
const StyledButton = styled.button`
    min-width: 32px;
    min-height: 29px;
    background: transparent;
    border: 1px solid #171212;
    padding: 5px;
    cursor: pointer;

    transition: all 0.1s ease-in;

    &:hover {
        background: #171212;
        color: #ffffff;
        border-color: #666;
    }
`;
export default LastSearches;
