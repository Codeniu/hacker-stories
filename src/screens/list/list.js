import Item from './item';
const List = ({ list }) => {
    return (
        <div>
            {list.map(item => (
                <Item key={item.objectID} item={item} />
            ))}
        </div>
    );
};
export default List;
