import styled from "styled-components";

export const MainContainer = styled.div`
    /* height: 100vh; */
    width: 100vw;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    /* padding: 1rem; */
    overflow-x: hidden;
`
export const ModalMainContainer = styled.div`
    height: fit-content;
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
`
export const ModalMainContainer2 = styled.div`
    height: fit-content;
    width: 60%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    margin-top: 8vh;
    border: 1px solid #000;
`

export const MainHeading = styled.h1`
    font-size: 1.3rem;
    font-weight: 650;
`

export const CustomPara = styled.p`
    font-size: 0.7rem;
`
export const Heading2 = styled.h1`
    font-size: 0.7rem;
    color: #000;

`

export const CustomSpan = styled.span`
    font-size: 0.7rem;
    color: #000;
    font-weight: 600;
`

export const CustomBr = styled.div`
    width: 100%;
    height: 1px;
    color: #000;
    background: #000;
    margin: 0.2rem 0;
`

export const CustomOl = styled.ol`
    width: 100%;
    list-style-position: outside;
`

export const CustomLi = styled.li`
    margin-bottom: 0.5rem;
`

export const CustomPara2 = styled.p`
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0;
    margin: 0;
`

export const CustomSpan2 = styled.span`
    font-size: 0.7rem;
`
export const CustomSpan3 = styled.span`
    font-size: 0.7rem;
    font-weight: 600;
`
export const CustomLi2 = styled.li`
    font-size: 0.7rem;
`



export const modalStyles = {
    width: '45%',
    height: '80%',
    position: 'absolute',        
    top: '10%', 
    bottom:'10%',              
    left: '50%',                 
    transform: 'translateX(-50%)', 
    borderRadius: '1rem',
    overflow: 'auto',
    padding: '0.6rem',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
    border: 'none',
    backgroundColor: 'white',   
};