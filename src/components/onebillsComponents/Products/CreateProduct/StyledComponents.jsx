import styled from "styled-components";
import Select from 'react-select';
import theme from '../../../../../shared/theme.json'

export const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    background: ${theme.bagckground};
    flex-direction: column;
    overflow: hidden;
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
    height: 8%;
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
    max-height: 90%;
    overflow: auto;
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
    padding: 0.2rem 0.4rem 0.2rem 0.7rem;
    font-size: 1rem;
    outline: none;
    background-color: transparent;
    border-radius: 0.7rem;
    border: 1.6px solid #000;

    &::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button{
        -webkit-appearance: none;
    }
`

export const Label = styled.label`
    font-size: 1rem;
    width: 7rem;
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
        background: #FFF;
        border: 1px solid #1D61E7;
        color: #1D61E7;
    }
`

export const TextAreaTag = styled.textarea`
    width: 100%;
    height: 6rem;
    font-size: 1rem;
    outline: none;
    border: 1.6px solid #000;
    background-color: transparent;
    border-radius: 0.7rem;
    padding: 0.5rem 0 0 0.5rem;
    
    &:focus{
        border-color: rgb(150, 150, 200);
        border: 2px solid #000;
    }
`

export const ImgInput = styled.input`
    width: 70%;
    flex-grow: 1;
    height: fit-content;
    border-radius: 0.5rem;
    padding: 0.2rem 0.4rem 0.2rem 0.2rem;
    font-size: 1rem;
    display: none;
    border: 2px solid #ccc;

    &::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button{
        -webkit-appearance: none;
    }
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

export const ImgLabel = styled.label`
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    font-weight: 550;
    border: 2px dotted #000;
    border-radius: 50%;
    background: #FFF;
    color: #000;
    width: 8rem;
    height: 8rem;
    position: relative;
    cursor: pointer;
`

export const Imgicon = styled.div`
    font-size: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ReactSelect = styled(Select)`
    width: 100% !important;
    border-radius: 0.9rem !important;
`

export const Label2 = styled.label`
    font-size: 100%;
    position: absolute;
    left: 0;
    top: 0; 
    transform: translateY(-50%) scale(0.9);  
    padding: 0.2em 0.5em; 
    margin-left: 1rem;  
    pointer-events: none;
    transition: all 0.3s ease;
    color: #000;
    background-color: #fff;
`;

export const ErrorText = styled.span`
    font-size: 0.6rem;
    position: absolute;
    bottom: 0;
    left: 0.8rem;
    color: red;
    min-width: 8rem;
    max-width:fit-content;
`

export const ImgTag = styled.img`
    width: 8rem;
    height: 8rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    border-radius: 50%;
    position: relative;
`
