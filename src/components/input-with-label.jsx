import { useEffect, useRef } from 'react';
import styled from 'styled-components';
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
            <StyledLabel htmlFor={id}>{children || label}</StyledLabel>
            &nbsp;
            <StyledInput
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

const StyledLabel = styled.label`
    padding-left: 5px;
    font-size: 2.4rem;
`;

const StyledInput = styled.input`
    border: none;
    border-bottom: 1px solid #171212;
    background-color: transparent;
    outline-width: inherit;

    font-size: 2.4rem;
`;
