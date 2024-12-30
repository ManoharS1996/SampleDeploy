import styled from "styled-components";
import theme from '../../../../shared/theme.json'

export const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    font-family: inherit;
`

export const ContentContainer = styled.div`
    height: 92vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    background: ${theme.bagckground};
`

export const BodyDiv = styled.div`
    height: 92vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.8rem 1rem 1rem 1rem;
`

export const SumsDiv = styled.div`
    height: 10vh;
    width: 100%;
    display: flex;
    align-items: center;
`

export const Tile = styled.div`
    height: 8vh;
    width: 20vw;
    background: #FFF;
    display: flex;
    align-items: center;
    border-radius: 0.8rem;
    padding: 0.4rem;
    margin-right: 1rem;
`

export const Icon = styled.div`
    background: #F4F7FE;
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4318FF;
`

export const TextDiv = styled.div`
    height: 100%;
    width: 70%;
    margin-left: 1rem;
`

export const Text1 = styled.p`
    color: ${theme.text};
    padding: 0;
    margin: 0;
    font-size: 0.8rem;
    font-weight: 500;
`

export const Text2 = styled.p`
    color: #2B3674;
    padding: 0;
    margin: 0;
    font-size: 1rem;
    font-weight: 800;
`

export const Dashbords = styled.div`
    height: 82vh;
    overflow: auto;
    background-color: transparent;
`

export const Box = styled.div`
    display: flex;
    align-items: center !important;
    justify-content: center !important;
    overflow: hidden;
`

export const AddNewDashboardLayoutBtn = styled.button`
    padding: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
`

export const CustomText = styled.p`
    width: 100%;
    margin: 0;
    padding: 5px 10px;
    border: 1px solid #000;
    border-radius: 5px;
    font-size: small;
    
    &:hover {
        color: blue;
        border-color: blue;
    }
`

export const TitleInput = styled.input`
    width: 100%;
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    border: 1px  solid #4361ee;
    outline: none;
`

export const DeleteLayoutBtn = styled.button`
    margin: 0 0px 0 10px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
    border: none;
    
    &:hover {
        color: red;
    }
`

export const DashboardHeaderContainer = styled.div`
    align-self: flex-end;
    display: flex;
    column-gap: 10px; 
    align-items: center;
    align-self: center;
    padding: 0 10px;
    margin-left: auto;
    z-index: 10;
    border-radius: 8px;
    background-color: transparent;
    gap: 2rem;
`

export const DashboardActionBtn = styled.button`
    width: fit-content;
    height: fit-content;
    align-self: flex-end;
    background: transparent;
    color: #2176ff;
    padding: 5px;
    border: none;
    cursor: pointer;
`
export const InfoIcon = styled.span`
    padding: 0;
    margin: 0;
    
    svg {
        color: #000;
    }
    
    /* &:hover {
        svg{
            color: #000;
        }
    } */
`
