import styled from "styled-components";
import theme from '../../../../shared/theme.json'

export const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    background: ${theme.bagckground};
    flex-direction: column;
`

export const ContentContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
`

export const BodyDiv = styled.div`
    height: 92vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.8rem 0.7rem 0.3rem 1rem;
`

export const ActionsDiv = styled.div`
    height: 7vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const CreateNewBtn = styled.button`
    padding: 0rem 0.2rem 0rem 0.7rem;
    height: 2.4rem;
    min-width: 8rem;
    max-width: fit-content;
    background: #3965FF;
    color: #FFF;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    &:hover {
        background-color: transparent;
        color: #3965FF;
    }
`

export const Icon = styled.span`
    font-size: 1.8rem;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    margin-left: 0.3rem;
`

export const SearchDiv = styled.div`
    width: 45%;
    height: fit-content;
    background: transparent;
    border-radius: 2rem;
    padding: 0.4rem;
`

export const Search = styled.div`
    width: 100%;
    height: 100%;
    background: #F4F7FE;
    background: #FFFFFF;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

export const Icon2 = styled.span`
    font-size: 1.4rem;
    width: 5%;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
`

export const InputTag = styled.input`
    height: 100%;
    width: 94%;
    border: none;
    outline: none;
    background: transparent;
`

export const DataDiv = styled.div`
    height: 80vh;
    width: 100%;
    display: flex;
    overflow-y: auto;
    border-radius: 0.8rem;
    margin-top: 1vh;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
`

export const Table = styled.table`
    height: fit-content;
    width: 100%;
    border-collapse: collapse;
    background: #FFF;
    border-radius: 1rem;
`

export const TrTag = styled.tr`
    margin: 0rem 1rem 0rem 1rem !important;
    border-radius: 1rem !important;
    position: relative;
    align-items: center;

    &:hover{
        background: ${theme.hover};
    }
`

export const ThTag = styled.th`
    height: 1.8rem;
    background: transparent;
    position: sticky;
    top: 0;
    z-index: 5;
    background: #FFF;
    padding: 0rem 1rem 0rem 1rem;
    color: #3a0ca3;
`

export const TdTag = styled.td`
    width: fit-content;
    text-align: left;
    padding: 0rem 1rem 0rem 1rem;
    color: #2B3674;
    font-size: 1rem;
    font-weight: 390;
`

export const Thead = styled.thead`
    width: 100%;
    height: 3.5rem;
`

export const OperationDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Btn = styled.button`
    padding: 0;
    margin: 0;
    font-size: 1.2rem;
    outline: none;
    border: none;
    cursor: pointer;
    border-radius: 0;
    width: 100%;
    background: transparent;
`

export const Line = styled.hr`
    width: 1px;
    height: 1rem;
    background-color: black; 
    transform: rotate(180deg);
    margin: 0 auto;
    border: none;  
`

export const HighlightText = styled.span`
    background: #ccc;
    padding: 0px 0.3rem 0px 0.3rem;
    border-radius: 0.3rem;
    text-align: center;
`

export const NoRecordsText = styled.span`
    font-size: 1rem;
    color: #000;
`

export const TableDiv = styled.div`
    overflow: auto;
    width: 100%;
    border-radius: 0.8rem;
` 
export const PaginationDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 0 0 1rem;
    height: 2rem;
`

export const PaginationBtn = styled.button`
    padding: 0;
    margin: 0 0.5rem;
    width: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;

    &:hover{
        color: #3965FF;
    }
`

export const BtnsDiv = styled.div`
    display: flex;
`