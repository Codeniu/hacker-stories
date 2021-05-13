import { sortBy } from 'lodash';
import { useState } from 'react';
import styled from 'styled-components';
const List = ({ list, onRemoveItem }) => {
    // sort list
    const SORTS = {
        NONE: list => list,
        TITLE: list => sortBy(list, 'title'),
        AUTHOR: list => sortBy(list, 'author'),
        COMMENT: list => sortBy(list, 'num_comments').reverse(),
        POINT: list => sortBy(list, 'points').reverse(),
    };
    const [sort, setSort] = useState({
        sortKey: 'NONE',
        isReverse: false,
    });

    const handleSort = sortKey => {
        const isReverse = sort.sortKey === sortKey && !sort.isReverse;
        setSort({ sortKey, isReverse });
    };

    const sortFunction = SORTS[sort.sortKey];
    const sortedList = sort.isReverse
        ? sortFunction(list).reverse()
        : sortFunction(list);

    return (
        <div>
            <TableHeader>
                <HeaderItem style={{ width: '40%' }}>
                    <button type="button" onClick={() => handleSort('TITLE')}>
                        Title
                    </button>
                </HeaderItem>
                <HeaderItem style={{ width: '30%' }}>
                    <button type="button" onClick={() => handleSort('AUTHOR')}>
                        Author
                    </button>
                </HeaderItem>
                <HeaderItem style={{ width: '10%' }}>
                    <button type="button" onClick={() => handleSort('COMMENT')}>
                        Comments
                    </button>
                </HeaderItem>
                <HeaderItem style={{ width: '10%' }}>
                    <button type="button" onClick={() => handleSort('POINT')}>
                        Points
                    </button>
                </HeaderItem>
                <HeaderItem style={{ width: '10%' }}>Actions</HeaderItem>
            </TableHeader>

            {sortedList.map(item => (
                <Item
                    key={item.objectID}
                    item={item}
                    onRemoveItem={onRemoveItem}
                />
            ))}
        </div>
    );
};

const TableHeader = styled.div`
    display: flex;
    font-size: 1.6rem;
    font-weight: 600;
`;

const HeaderItem = styled.span`
    padding: 0 5px;
    button {
        border: 0;
        background: transparent;
        font-size: 1.6rem;
        font-weight: 600;
        cursor: pointer;
        outline: none;
        position: relative;
    }

    button::before {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        top: 10px;
        right: -6px;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        border-top: 8px solid #999;
    }
    button::after {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        right: -6px;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        border-bottom: 8px solid #999;
    }
`;
export default List;

// Item component
const Item = ({ item, onRemoveItem }) => (
    <StyledItem>
        <StyledColumn width="40%">
            <a href={item.url}>{item.title}</a>
        </StyledColumn>
        <StyledColumn width="30%">{item.author}</StyledColumn>
        <StyledColumn width="10%">{item.num_comments}</StyledColumn>
        <StyledColumn width="10%">{item.points}</StyledColumn>
        <StyledColumn width="10%">
            <StyledButtonSmall type="button" onClick={() => onRemoveItem(item)}>
                Dismiss
            </StyledButtonSmall>
        </StyledColumn>
    </StyledItem>
);

const StyledItem = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 5px;
`;

const StyledColumn = styled.span`
    padding: 0 5px;
    white-space: nowrap;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    a {
        color: inherit;
    }

    width: ${props => props.width};
`;

const StyledButton = styled.button`
    background: transparent;
    border: 1px solid #171212;
    padding: 5px;
    cursor: pointer;

    transition: all 0.1s ease-in;

    &:hover {
        background: #171212;
        color: #ffffff;
    }
`;

export const StyledButtonSmall = styled(StyledButton)`
    padding: 5px;
`;
