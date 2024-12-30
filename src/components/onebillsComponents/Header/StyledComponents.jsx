import styled from "styled-components";
import theme from '../../../../shared/theme.json'

export const MainContainer = styled.div`
    height: 8vh;
    max-width: 100vw;
    background: ${theme.secondary};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0rem 0.8rem 0rem 1rem;
    z-index: 1;
`

export const Title = styled.h1`
    font-size: 1.5rem;
    margin: 0;
`

export const ProfileDiv = styled.div`
    height: 2.7rem;
    width: 2.7rem;
    border-radius: 50%;
    font-size: 0.5rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    border: 1px solid #d1d1d1;
`
export const ProfilePic = styled.img`
    height: 2.7rem;
    width: 2.7rem;
    border-radius: 50%;
    font-size: 0.5rem;
    text-align: center;
    background-size: cover;
    object-fit: cover;
    object-position: top;
    cursor: pointer;
`
export const ProfileText = styled.span`
    font-size: 2rem;
    padding: 0;
    margin: 0;
    font-weight: 600;
    color: #e02222;
    cursor: pointer;
`

export const CustomDiv = styled.div`
    height: 3.1rem;
    width: 7rem;
    background: #F4F7FE;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 1.5rem;
    padding: 0.3rem 0.3rem 0.3rem 0.7rem;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
`

export const Btn = styled.button`
    height: fit-content;
    width: fit-content;
    padding: 0.3rem;
    font-size: 2rem;
    display: flex;
    align-items: center;
    /* margin-left: auto; */
    justify-content: center;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 50%;
    background: transparent;
    
    &:hover {
        background-color: #ccc;
    }
`

export const ModalHeader = styled.div`
    font-size: 1rem;
    font-weight: 500;
    width: fit-content;
    margin-left: 0.5rem;
`

export const ModalDiv = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
`

export const CloseBtn = styled.button`
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: fit-content;
    width: fit-content;
    font-size: 1.7rem;
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    outline: none;
    cursor: pointer;
    color: red;
`

export const ModalContentDiv = styled.div`
    height: 95%;
    margin-top: 0.3rem;
    border-radius: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.3rem;

    &::-webkit-scrollbar{
        width: 3px;
    }
    &::-webkit-scrollbar-track{
        background: transparent;
    }
    &::-webkit-scrollbar-thumb{
        background: transparent;
    }

    &:hover{
        &::-webkit-scrollbar-thumb{
            background: #ccc;
        }
    }


`
export const AlertItem = styled.div`
    min-height: 3rem;
    width: 100%;
    margin: 0.5rem 0;
    padding: 0 0.5rem;
    background: #f8edeb;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.8rem;

`
export const AlertText = styled.p`
    font-size: 0.8rem;
    font-weight: 550;
    padding: 0;
    margin: 0 0 0 0;
`
export const AlertDate = styled.span`
    font-size: 0.8rem;
    font-weight: 450;
`
export const SpanTag = styled.span`
    text-align: center;
    width: fit-content;
    background: #e9ecef;
    padding: 0rem 1rem;
    border-radius: 1rem;
`

export const Img = styled.img`
    height: 3rem;
    width: 3rem;
    object-fit: contain;
    object-position: center;
    padding: 0;
    border-radius: 0.5rem;
`

export const ImgDiv = styled.div`
    height: 3.5rem;
    background-color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    gap: 1rem;
`