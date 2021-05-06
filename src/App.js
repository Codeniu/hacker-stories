import PornWatch from '@/screens/porn-watch/index';
import ProjectListScreen from '@/screens/project-list/index';
import { useState } from 'react';
import styled from 'styled-components';
import './App.css';

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
const ChangeButton = styled(StyledButton)`
    padding: 5px;
`;

const ButtonWrapper = styled.div`
    button {
        margin-right: 10px;
    }
`;
const App = () => {
    const [pageName, setPageName] = useState('clock');
    return (
        <>
            <ButtonWrapper>
                <ChangeButton
                    onClick={() => {
                        setPageName('list');
                    }}
                >
                    Stories
                </ChangeButton>
                <ChangeButton
                    onClick={() => {
                        setPageName('clock');
                    }}
                >
                    Clock
                </ChangeButton>
            </ButtonWrapper>
            {pageName === 'clock' ? <PornWatch /> : <ProjectListScreen />}
        </>
    );
};

export default App;
