import { useEffect, useRef } from 'react';
const InputWithLabel = ({
    id,
    label,
    value,
    type = 'text',
    onInputChange,
    children,
    isFocused,
}) => {
    const inputRef = useRef();
    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused]);
    return (
        <>
            <label htmlFor={id}>{children || label}</label>
            &nbsp;
            <input
                id={id}
                type={type}
                value={value}
                onChange={onInputChange}
                ref={inputRef} // 指令式
                // autoFocus={isFocused} // 声明式
            />
        </>
    );
};

export default InputWithLabel;
