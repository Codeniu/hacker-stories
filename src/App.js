import { PornWatch } from '@/screens/porn-watch/index';
import ProjectListScreen from '@/screens/project-list/index';
import { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import { ReactComponent as Github } from '@/svgs/github.svg';

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
    background-color: #999;
    height: 28px;
    button {
        margin-right: 10px;
    }
`;

const GithubBtn = styled.div`
    float: right;
    margin-right: 4rem;
    height: 100%;
    display: grid;
    place-items: center;
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
                <GithubBtn>
                    <a href="https://github.com/Codeniu/hacker-stories">
                        <Github width="21px" height="21px" />
                    </a>
                </GithubBtn>
            </ButtonWrapper>
            {pageName === 'clock' ? <PornWatch /> : <ProjectListScreen />}
        </>
    );
};

export default App;
