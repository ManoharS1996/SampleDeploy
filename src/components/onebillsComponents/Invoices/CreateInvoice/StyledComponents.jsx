import styled from "styled-components";
import Select from 'react-select';
import theme from '../../../../../shared/theme.json'


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
    padding: 0.8rem 1rem 1rem 1rem;
`

export const CreateDiv = styled.div`
    height: 100%;
    width: 100%;
    background: #FFF;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const TitleDiv = styled.div`
    height: 6%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0rem 0.8rem 0rem 0.8rem;
    position: relative;
`

export const Title = styled.h1`
    font-size: 1.5rem;
    margin: 0;
    color: #2B3674;
    font-weight: 550;
`

export const CloseBtn = styled.button`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    font-size: 1.54rem;
    color: #000;
    border: none;
    outline: none;
    cursor: pointer;
    position: absolute;
    left: 0.6rem;
    top: 0.6rem;
`

export const DetailsForm = styled.form`
    height: 94%;
    overflow-y: auto;
    padding: 1rem;

    &::-webkit-scrollbar{
        width: 3px;
    }

    &::-webkit-scrollbar-track{
        background: transparent;
    }

    &::-webkit-scrollbar-thumb{
        display: none;
    }

    &:hover::-webkit-scrollbar-thumb{
        display: block;
    }
`

export const Legend = styled.legend`
    font-size: 1.1rem;
    font-weight: 500;

`

export const InputTag = styled.input`
    width: 100%;
    height: 2.4rem;
    border-radius: 0.7rem;
    padding: 0.2rem 0.4rem 0.2rem 0.4rem;
    font-size: 1rem;
    border: 1.6px solid #000;

    &::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button{
        -webkit-appearance: none;
    }
`

export const Label = styled.label`
    font-size: 1rem;
    width: fit-content;
    height: fit-content;
    margin-right: 2rem;
    margin-left: 0.5rem;
`

export const FieldSet = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    position: relative;
`

export const InputsContainer = styled.div`
    width: 50%;
    min-height: 3.3rem;
    align-items: center;
    padding: 0rem 0.5rem;
    display: flex;
    flex-direction: column;
    font-family: 'Segoe UI', sans-serif;
    margin: 0.2rem 0;
    position: relative;
`

export const InputsContainer2 = styled.div`
    width: 100%;
    height: 4.5rem;
    display: flex;
    margin-top: 2rem;
    flex-direction: column;
    position: relative;
`

export const CustomDiv = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    row-gap: 0.5rem;
`

export const SaveBtn = styled.button`
    height: 2rem;
    width: 8rem;
    padding: 0;
    margin: 1rem;
    float: right;
    background: #1D61E7;
    color: #FFF;
    cursor: pointer;

    &:hover{
        background: transparent;
        color: #1D61E7;
        border: 1px solid #1D61E7;
    }
`

export const ReactDropdown = styled(Select)`
    background-color: #fff;
    width: 100% !important;  
`

export const ReactDropdown2 = styled(Select)`
    width: 100% !important;
    background-color: #fff;
    border-radius: 0.5rem !important;
    font-size: 1rem !important;

`

export const TableTag = styled.table`
    width: 100%;
    border-radius: 1rem;
    border-collapse: collapse;
`

export const TrTag = styled.tr`
    &:hover{
        background-color: #F5EDED;
    }
`

export const ThTag = styled.th`
    background: #ccc;
    padding: 0rem 0.4rem ;
    font-size: 0.9rem;
`

export const ThTag2 = styled.th`
    background: #ccc;
    padding: 0rem 0.4rem ;
    font-size: 0.9rem;
    width: 5rem;
`

export const TdTag = styled.td`
    padding: 0rem 0.4rem ;
    font-size: 0.9rem;
`

export const TableContainer = styled.div`
    width: 100%;
    border-radius: 1rem;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    border: 2px solid #ccc;
`

export const PTag = styled.p`
    padding: 0;
    margin: 0;
`

export const CountBtn = styled.button`
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 1rem;
    outline: none;
    border: none;
    cursor: pointer;
    background: transparent;
    /* border: 1px solid red; */
`

export const CountDiv = styled.div`
    height: 1.2rem;
    width: 2.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #F1F1F1;
    padding: 0rem 0.1rem;
    border-radius: 0.5rem;

    &:hover{
        background: #FFF;
    }
`

export const DelBtn = styled.button`
    padding: 0 !important;
    margin: 0 !important;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    outline: none;
    border: none;
    cursor: pointer;
    background: transparent;
    color: red;
`

export const Btns = styled.div`
    width: 4.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const CheckboxInputTag = styled.input`
    height: 1rem;
    width: 1rem;
    margin: 0rem 1rem 0rem 0.3rem;
`

export const ImgDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border-radius: 1rem;
`

export const DateInputTag = styled.input`
    height: 2.4rem;
    width: fit-content;
    border-radius: 0.7rem;
    padding: 0.2rem 0.4rem 0.2rem 0.4rem;
    font-size: 1rem;
    border: 1.6px solid #000;
    text-transform: uppercase;
`

export const InvoiceDiv = styled.div`
    margin-top: 0.5rem;
    width: 100%;
    display: flex;
`

export const NetAmount = styled.div`
    background: #fff;
    width: fit-content;
    display: flex;
    align-items: center;
    padding: 0.2rem 0.4rem;
`

export const Div2 = styled.div`
    width: 100%;
    border-radius: 0.9rem;
`

export const Label2 = styled.label`
    font-size: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(-50%) scale(0.9); 
    padding: 0.1em 0.5em; 
    margin-left: 1rem;  
    pointer-events: none;
    transition: all 0.3s ease;
    color: #000;
    background-color: #FFF; 
`;

export const ErrorText = styled.span`
    font-size: 0.6rem;
    /* border: 2px solid red; */
    position: absolute;
    bottom: 0;
    left: 0.8rem;
    color: red;
`

export const StatusDIv = styled.div`
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    width: 10rem;
    display: flex;
`

