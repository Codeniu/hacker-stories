import Item from './item';
const List = ({ list, onRemoveItem }) => {
    return (
        <div>
            {list.map(item => (
                <Item
                    key={item.objectID}
                    item={item}
                    onRemoveItem={onRemoveItem}
                />
            ))}
        </div>
    );
};
export default List;
