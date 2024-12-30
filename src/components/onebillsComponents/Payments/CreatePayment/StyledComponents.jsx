import styled from "styled-components";
import Select from 'react-select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
    position: relative;
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
    position: relative;
    display: flex;
    flex-direction: column;
`

export const Label = styled.label`
    font-size: 1rem;
`

export const FieldSet = styled.div`
    display: flex;
    flex-direction: row;
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

export const Label2 = styled.label`
    font-size: 1rem;
    position: absolute;
    left: 0.2rem;
    top: 0; 
    transform: translateY(-50%) scale(0.9);  
    padding: 0.2em 0.5em;  
    margin-left: 1rem; 
    pointer-events: none;
    transition: all 0.3s ease;
    color: #000;
    background-color: #fff; 
`;

export const SaveBtn = styled.button`
    height: 2rem;
    width: 8rem;
    padding: 0;
    margin: 1rem;
    background: #1D61E7;
    color: #FFF;
    cursor: pointer;
    bottom: 0;
    right: 0%;
`

export const CheckboxInputTag = styled.input`
    height: 1.2rem;
    width: 1.2rem;
    margin-right: 0.5rem;
`

export const TextAreaTag = styled.textarea`
    width: 99%;
    height: 5rem;
    border-radius: 0.7rem;
    padding: 0.4rem 0.4rem 0.2rem 0.4rem;
    border: 1.6px solid #000;
`

export const State = styled.p`
    position: absolute;
    color: red;
    top: 1%;
    right: 2%;
    padding: 0;
    margin: 0;
    background: #FFF;
    color: black;
`

export const DateInputTag = styled.input`
    height: 2.4rem;
    width: fit-content;
    align-items: center;
    border-radius: 0.7rem;
    padding: 0.2rem 0.4rem 0.2rem 0.4rem;
    font-size: 1rem;
    margin: 0;
    border: 1.6px solid #000;
    text-transform: uppercase;
`

export const ImgDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    background: transparent;
    border-radius: 1rem;
`

export const BottomBtns = styled.div`
    width: 100%;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
`

export const SpanTag = styled.span`
    position: absolute;
    right: 15%;
    top: 1rem;
    border-radius: 2rem;
    padding: 0 1rem;
    background: #FFF;
`

export const ReactDropdown = styled(Select)`
    background-color: #fff;
    width: 100% !important;
`

export const ErrorText = styled.span`
    font-size: 0.6rem;
    position: absolute;
    bottom: 0;
    left: 0.8rem;
    color: red;
`

export const AmountSpan = styled.span`
    width: fit-content;
    margin-left: 0.5rem;
    text-align: left;
`

export const StyledDateTimePicker = styled(DatePicker)`
    margin: 0;
    padding: 0.5rem;
    border-radius: 1rem;
    background-color: #f5f5f5;
    /* display: flex; */
    /* align-items: center; */

    .MuiInputBase-root {
        border: 1px solid #ddd;
        border-radius: 1rem;
        /* padding: 8px; */
    }

    .MuiFormLabel-root {
        color: #333;
    }

    .MuiPickersToolbar-root {
        background-color: #007bff;
        color: white;
        border-radius: 1rem;
    }

    .MuiPickersCalendar-root {
        background-color: #e0f7fa !important; 
        border-radius: 1rem;
    }

    .MuiPickersToolbar-root {
        border-radius: 1rem; 
    }

`;