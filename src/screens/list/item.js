const Item = ({ item, onRemoveItem }) => (
    <div>
        <span style={{ fontSize: '2rem' }}>
            <a href={item.url}>{item.title}</a>
        </span>
        &nbsp;&nbsp;
        <span>
            <button
                type="button"
                onClick={() => {
                    onRemoveItem(item);
                }}
            >
                Dissmis
            </button>
        </span>
        <br />
        <strong>author:&nbsp;</strong>
        <span>{item.author}</span>
        <strong>num_comments:&nbsp;</strong>
        <span>{item.num_comments}</span>
        <strong>points:&nbsp;</strong>
        <span>{item.points}</span>
        <br />
        <br />
    </div>
);

export default Item;
