import InputWithLabel from '@/components/input-with-label';
import PressedBtn from '@/components/pressed-button';
import styled from 'styled-components';
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
            {/* <StyledButtonLarge type="submit" disabled={!searchTerm}>
                <Check width="18px" height="18px" />
            </StyledButtonLarge> */}
            <PressedBtn handleSearchSubmit={handleSearchSubmit} />
        </StyledSearchForm>
    );
};

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

export default SearchForm;
