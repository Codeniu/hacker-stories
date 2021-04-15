const InputWithLabel = ({ id, label, value, type = 'text', onInputChange }) => (
    <>
        <label htmlFor={id}>{label}</label>
        &nbsp;
        <input id={id} type={type} value={value} onChange={onInputChange} />
    </>
);

export default InputWithLabel;
