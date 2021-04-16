import styled from 'styled-components';
const PressedBtn = ({ handleSearchSubmit }) => {
    return (
        <Container>
            <Base>
                <ButtonWrapper ontouchstart="" onClick={handleSearchSubmit}>
                    <ButtonInsilde className="btn-side"></ButtonInsilde>
                    <ButtonMain className="btn">S</ButtonMain>
                </ButtonWrapper>
            </Base>
        </Container>
    );
};

const Container = styled.div`
    width: 24rem;
    height: 24rem;
    transform: rotateX(40deg);
    transform-style: preserve-3d;
`;
const Base = styled.div`
    background: #bbb;
    border-radius: 1.6rem;
    box-shadow: 0 -0.6rem 0px #777777 inset;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-items: center;
    position: relative;
    transform-style: preserve-3d;
    width: 24rem;
    height: 24rem;
`;
const ButtonWrapper = styled.div`
    border: 0;
    background: transparent;
    cursor: pointer;
    -webkit-appearance: none;

    &:active .btn {
        transform: translateZ(1px);
    }

    &:active .btn-side {
        transform: translateZ(0);
    }

    &:focus {
        outline: none;
    }
`;

const ButtonMain = styled.div`
    background: #444 linear-gradient(#888888, transparent 50%);
    border-radius: 1.6rem;
    box-shadow: 0 0 0.5rem #888888 inset;
    color: #f80;
    display: block;
    font: 17.85rem Asap;
    font-weight: bold;
    width: 21rem;
    height: 21rem;
    transform: translateZ(36px);
    transition: all 0.05s;
    text-align: center;
    text-shadow: 0 0 24px #f80, 0 -2.4px 0 #222222, 0 2.4px 0 #ffbb33;
    z-index: 2;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
`;

const ButtonInsilde = styled.div`
    background: #333333
        linear-gradient(
            90deg,
            #666666,
            transparent 8%,
            transparent 92%,
            #666666
        );
    border-radius: 0 0 12px 12px;
    box-shadow: 0 -4.8px 4.8px #222 inset;
    position: absolute;
    bottom: 8%;
    transform: rotateX(-60deg);
    transform-origin: 0 100%;
    transition: all 0.05s;
    width: 210px;
    height: 31.5px;
    z-index: 1;
`;

export default PressedBtn;
