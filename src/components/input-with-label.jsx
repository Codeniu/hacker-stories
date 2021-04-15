const InputWithLabel = ({ id, label, value, type = 'text', onInputChange ,children}) => (
    <>
        <label htmlFor={id}>{children||label}</label>
        &nbsp;
        <input id={id} type={type} value={value} onChange={onInputChange} />
    </>
);

export default InputWithLabel;
