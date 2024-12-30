import styled from "styled-components";
import theme from '../../../../../../shared/theme.json'

export const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;
    padding: 1rem;
    background-image: url('https://res.cloudinary.com/dca9sij3n/image/upload/v1733737710/udxu8vaemeqgjtryt4dk.png');
`

export const InnerContainer = styled.div`
    height: 100%;
    width: 100%;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ContenContainer = styled.div`
    background: #FFF;
    height: fit-content;
    width: 40%;
    border-radius: 1rem;
    padding: 2rem;
    position: relative;
    color: #000;
    display: flex;
    flex-direction: column;
`

export const Title = styled.h1`
    font-size: 1.7rem;
    color: #000;
`

export const Text = styled.p`
    color: #000;
`

export const CustomDiv = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    /* border: 1px solid red; */
`

export const Btn = styled.button`
    width: 15rem;
    border-radius: 1rem;
    background: #4318FF;
    color: #FFF;
    border: 1.6px solid #4318FF;
    padding: 0.3rem;
    
    &:hover{
        background: #FFF;
        color: #4318FF;
    }
`
export const SkipBtn = styled.button`
    /* position: absolute; */
    /* bottom: 0;
    right: 0; */
    background: transparent;
    border: none;
    align-self: center;
    font-size: 0.8rem;
    
    &:hover {
        text-decoration: underline;
    }
`

export const CustomDiv2 = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* padding: 1rem; */
    height: 4rem;
    /* border: 1px solid red; */
`

export const Btn2 = styled.button`
    margin-left: 1rem;
    border-radius: 1rem;
    background: #4318FF;
    color: #FFF;
    border: 1.6px solid #4318FF;
    width: 10rem;
    padding: 0.3rem;
    
    &:hover{
        background: #FFF;
        color: #4318FF;
    }
`

export const InputTag = styled.input`
    width: 100%;
    border-radius:0.7rem;
    border: 1.6px solid #000;
    padding: 0.2rem 0.5rem;
    color: #000;
`

export const InputDiv = styled.div`
    width: 50%;
    position: relative;
`

export const Label = styled.label`
    font-size: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(-50%) scale(0.9); 
    padding: 0.1em 0.5em; 
    margin-left: 0.7rem;  
    pointer-events: none;
    transition: all 0.3s ease;
    color: #000;
    background-color: #fff; 
    border-radius: 50px;
`

export const VerifyOtp = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 50px;
    background-color: ${theme.button};
    color: #fff;
    
    &:hover {
        background-color: #fff;
        color: ${theme.button};
    }
`