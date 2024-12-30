import styled from "styled-components";
import theme from '../../../../../shared/theme.json'

export const SprAdminDashContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: inherit;
    padding: 0.5rem ;
    gap: 1rem;
`

export const TopWidgetContainer = styled.div`
    display: flex;
    gap: 1rem;
    height: 10%;
    padding: 0 0.5rem;
`

export const MainWidgetsContainer = styled.div`
    width: 100%;
    height: 50%;
    flex-grow: 1;
    display: flex;
    padding:  0.5rem;
    background-color: inherit;
    gap: 0.5rem;
    flex-wrap: wrap;
    overflow: auto;
    
    &::-webkit-scrollbar {
        width: 7px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: ${theme.secondary};
        border-radius: 500px;
        
        &:hover{
            background-color: ${theme.primary};
        }
    }
    
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
`
