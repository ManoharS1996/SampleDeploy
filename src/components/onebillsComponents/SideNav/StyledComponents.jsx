import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';
import theme from '../../../../shared/theme.json'

export const MainContainer = styled.div`
    max-height: 92vh;
    width: ${(props) => (props.isActive ? '15vw' : '5vw')};
    position: relative;
    transition: all 0.4s ease-in-out;
    background: #FFF;
`

export const TitleDiv = styled.div`
    height: 15vh;
    width: 100%;
    font-size: clamp(1rem, 5vw, 2rem); 
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: monospace;
    font-weight: 600;
    text-align: center; 
    padding: 0 1rem; 
    
`;

export const Title = styled.span`
    width: fit-content;
    height: fit-content;
    padding: 0 0.6rem;
    margin: 0;
    font-size: 1.8rem;
    /* background: #acc5f5; */
    background: #70e000;
    border-radius: 1rem;
`

export const Options = styled.div`
    height: fit-content;
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem ;
    margin-top: 1rem;
`

export const Option = styled.div`
    height: 2.7rem;
    width: 100%;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: ${props => (props.isActive ? 'none' : 'space-between')};
    color: #6c757d;
    transition: justify-content 0.8s ease-in-out;
    
    /* margin: 0.5rem 0rem; */
    border-radius: 0.5rem;
    padding-left: 0.2rem;
    padding: ${props => (props.isActive ? '0.2rem' : '0')};
    gap: ${props => props.isActive ? '1rem' : '0'};
    
    background: transparent;
    cursor: pointer;

    box-shadow: ${(props) =>
        props.active
            ? 'inset -0.2rem 0 0 0 #4318FF'
            : 'none'};

    border-radius: ${(props) => (props.active ? '0.5rem 0rem 0rem 0.5rem' : '0.5rem')};

    &:hover {
        background: ${theme.hover}; 
    }
    ${(props) =>
        props.active &&
        `
        &:hover {
            background: ${theme.hover};
        }
    `}
`;

export const Option2 = styled.div`
    height: 2.7rem;
    width: 100%;
    padding: 0;
    display: flex;
    align-items: center;
    color: #6c757d;
    margin: 0.5rem 0rem;
    border-radius: 0.5rem;
    padding-left: 0.2rem;
    background: transparent;
    cursor: pointer;
    margin-top: 2rem;

    &:hover{
        background-color: #ccc;
    }
`

export const SpanTag = styled.span`
    padding: 0;
    font-size: 1rem;
    font-weight: 600;
    color: ${props => (props.active ? '#000' : '6c757d')};
    font-weight: ${props => (props.active ? '650' : '600')};
    width: ${({ isNavExpanded }) => isNavExpanded ? 'fit-content' : '0'};
    transition: width 1s ease-in-out;
    overflow: hidden;
`

export const Icon = styled.div`
    height: 100%;
    width: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => (props.active ? '#4318FF' : '6c757d')};
`

export const LoginBtn = styled.button`
    /* width: 12rem; */
    height: fit-content;
    color: #FFF;
    background: ${theme.button};
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translate(-50%);
    border-radius: 2rem;
    border: none;
    outline: none;
    cursor: pointer;
    width: fit-content;
    flex-grow: 1;
    padding: ${({ isActive }) => isActive ? '0.3rem 2rem' : '0.5rem'};
    transition: padding 0.5s ease-in-out;
    
`

export const SweetAlertStyles = createGlobalStyle`
    .swal2-popup {
        font-family: 'Arial', sans-serif;
        font-size: 18px;
        background-color: #f5f5f5;
        border-radius: 20px;
    }

    .swal2-title {
        color: #333;
        font-size: 24px;
        font-weight: bold;
    }

    .swal2-confirm {
        background-color: #4CAF50 !important;
        color: white;
        border-radius: 10px;
        padding: 10px 20px;
        font-size: 16px;
    }

    .swal2-cancel {
        background-color: #f44336 !important;
        color: white;
        border-radius: 10px;
        padding: 10px 20px;
        font-size: 16px;
    }
`;

export const ToggleBtn = styled.button`
    padding: 0rem;
    margin: 0;
    height: 1.5rem;
    width: 1.5rem;
    position: absolute;
    right: -0.7rem;
    top: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 1.9rem;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    border: none;
    outline: none;
    cursor: pointer;
`