import styled from "styled-components";
import Select from 'react-select';
import { createTheme } from '@mui/material/styles';
import PhoneInput from 'react-phone-input-2'
import theme from '../../../../shared/theme.json'

const bgColor = theme.background

export const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    background: ${theme.bagckground};

`

export const ContentContainer = styled.div`
    height: 92vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
`

export const BodyDiv = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0.8rem 1rem 1rem 1rem;
    overflow-y: auto;
`

export const Tile = styled.div`
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #FFFAFA;
    width: 49%;
    margin: 0;
    border-radius: 1rem;
    border: 2px solid #ccc;
`

export const Templates = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
`

export const Template = styled.div`
    height: 14rem;
    width: 10rem;
    border-radius: 0.7rem;
    position: relative;
    overflow: hidden;
    border: ${props => (props.activeTemplate ? '3px solid #8FD14F' : '2px solid #ccc')};
    cursor: pointer;
    background-repeat: no-repeat;
`

export const CustomDiv = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 0.5rem;
    height: fit-content;
    padding: 0 0 2.4rem 0;
    position: relative;
`

export const ReactSelect = styled(Select)``

export const Label = styled.label`
    padding: 0rem 0.5rem 0rem 0.5rem;
    border-radius: 0.5rem;
    width: fit-content;
`
export const InputTag = styled.input`
    display: none;
`

export const Switch = styled.label`
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 3em;
    height: 2rem;
`;

export const Checkbox = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`;

export const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(182, 182, 182);
    transition: 0.4s;
    border-radius: 1.4rem;

    &:before {
        position: absolute;
        content: "";
        height: 1.4em;
        width: 1.4em;
        border-radius: 8px;
        left: 0.3em;
        bottom: 0.3em;
        transform: rotate(270deg);
        background-color: rgb(255, 255, 255);
        transition: 0.4s;
    }
`;

export const Input = styled(Checkbox)`
    &:checked + ${Slider} {
        background-color: #21cc4c;
    }

    &:focus + ${Slider} {
        box-shadow: 0 0 1px #2196f3;
    }

    &:checked + ${Slider}:before {
        transform: translateX(1.5em);
    }
`;

export const TermsTile = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: transparent;
    width: 100%;
    border-radius: 1rem;
    position: relative;
`

export const Upload = styled.div`
    height: 7.5rem;
    width: 7.5rem;
    border-radius: 1rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #000;
`

export const LogoLabel = styled.label`
    padding: 0.2rem 1rem;
    height: 2rem;
    border-radius: 0.7rem;
    width: fit-content;
    background: #4318FF;
    color: #FFFFFF;
    font-size: 1rem;
    display: flex;
    align-items: center;
    border: 1.6px solid #ccc;
    cursor: pointer;
    margin-left: 1rem;

    &:hover{
        color: #4318FF;
        background: #FFF;
        border: 1.6px solid #4318FF;
    }
`

export const SpanTag = styled.button`
    color: #6EC207;
    background: #FFF;
    position: absolute;
    display: flex;
    border-radius: 1rem;
    font-size: 1.8rem;
    padding: 0;
    right: 0;
    bottom: 0;
    /* display: ${props => (props.activeTemplate ? '' : 'none')}; */
    color: ${props => (props.activeTemplate ? '#6EC207' : '#ccc')};
    border: none;
    outline: none;
`

export const ImgTag = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
`

export const InputsDiv2 = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    margin: 0.2rem 0rem 0.2rem 0rem;
    font-family: 'Segoe UI', sans-serif;
    margin: 1em 0;
    position: relative;
`

export const InputsContainer = styled.div`
    width: 49%;
    min-height: 3.3rem;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0rem 0.5rem;
    display: flex;
    justify-content: space-between;
    font-family: 'Segoe UI', sans-serif;
    margin: 0.2rem 0;
    position: relative;
`

export const InputTag2 = styled.input`
    width: 100%;
    height: 2.5rem;
    padding: 0.2rem 0.4rem 0.2rem 0.7rem;
    font-size: 1rem;

    &::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button{
        -webkit-appearance: none;
    }

    outline: none;
    border: 1.6px solid #000;
    background-color: transparent;
    border-radius: 0.7rem;
    
    &:focus {
        border-color: #000;
    }
    

`

export const Label3 = styled.label`
    font-size: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.8em;
    margin-left: 0.7em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: rgb(100, 100, 100);
    background-color: transparent;

    ${InputTag2}:focus + &,
    ${InputTag2}:valid + &,
    ${InputTag2}[readonly] + & {
        top: 0;
        transform: translateY(-50%) scale(0.9);  
        margin-left: 1rem;
        padding: 0.2em 0.5em;  
        background-color: #fff;  
    }
`;
export const Label4 = styled.label`
    font-size: 0.9rem;
    position: absolute;
    left: 0.2rem;
    top: 0; 
    transform: translateY(-50%) scale(0.9);  
    padding: 0.2em 0.5em;  
    margin-left: 1rem; 
    pointer-events: none;
    transition: all 0.3s ease;
    color: rgb(100, 100, 100);
    background-color: #fff; 
`


export const PhoneNumInput = styled(PhoneInput)`
    width: 100% !important;
    border: 2px solid #000;
    border-radius: 0.7rem;

    .buttonClass {
        border: none;
        border-radius: 1rem 0 0 1rem;
        
        &:hover {
            border-radius: 1rem 0 0 1rem;
            background: #FFFAFA !important;
        }
    }

    .custom-dropdown-button {
        border: none;
        border-radius: 1rem 0 0 1rem !important;
        background: #FFFAFA !important;
        transition: background-color 0.3s ease;

        &:hover{
            background: #FFFAFA !important;
            border-radius: 1.4rem;
        }
        
    }

`

export const Btn = styled.button`
    border: 2px solid #ccc;
    height: 2rem;
    width: 6rem;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    bottom: 0;
    right: 1.5rem;
    border-radius: 0.7rem;
    background: #4318FF;
    color: #FFF;
    position: absolute;

    &:hover{
        background: #FFF;
        color: #4318FF;
        border: 1.6px solid #4318FF;
    }
    
`
export const Btn2 = styled.button`
    height: 2rem;
    width: 6rem;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    bottom: 0;
    border-radius: 0.7rem;
    background: #4318FF;
    color: #FFF;
    border: 1.6px solid #4318FF;

    &:hover{
        background: #FFF;
        color: #4318FF;
        
    }
    
`

export const EmailEditBtn = styled.button`
    border: 2px solid #ccc;
    height: 2rem;
    width: 9rem;
    padding: 0 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    float: right;
    bottom: 0;
    right: 1.5rem;
    padding: 0 0.3rem;
    border-radius: 1rem;
    outline: none;
    background: #623de6;
    color: #FFF;
    font-size: 0.9rem;
`

export const Eye = styled.button`
    position: absolute;
    padding: 0;
    margin: 0;
    display: flex;
    right: 1rem;
    bottom: 43%;
    outline: none;
    border: none !important;
    cursor: pointer;
`

export const Errors = styled.label`
    position: absolute;
    color: red;
    right: 57%;
    transform: translate(-50%, -50%);
    bottom: 4%;
    font-size: 0.6rem;
`;

export const Error = styled.p`
    font-size: 0.7rem;
    width: 15rem;
    padding: 0;
    margin: 0 0 0 0.5rem;
    position: absolute;
    bottom: -0.7rem;
    left: 0.7rem;
`

export const Faqdiv = styled.div`
    background: #F4F7FE;
    padding: 0.5rem;
    border-radius: 1rem;
    margin: 0.5rem 0rem;
`

export const Faq = styled.h1`
    font-size: 0.9rem;
    font-weight: 700;
`

export const Sol = styled.p`
    font-size: 0.9rem;
`

export const VerifiedSpan = styled.span`
    position: absolute;
    right: 0.8rem;
    bottom: 37%;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    color: #2a7a1b;
`

export const CustomDiv1 = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-right: 0.5rem;
`

export const ProfileIcon = styled.span`
    font-size: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const DeleteAccBtn = styled.button`
    border: none;
    background: #d00000;
    color: #FFF;
    padding: 0.5rem 2rem;
    border-radius: 1rem;
`

export const Theme = createTheme({
    components: {
        MuiAccordion: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFAFA',
                    borderRadius: '8px',
                    marginBottom: '0.8rem',
                    '&::before': {
                        content: 'none',
                    },
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFAFA',
                    color: '#000',
                    padding: '10px',
                    borderRadius: '2rem', // ENSURE THIS APPLIES WITHOUT !IMPORTANT
                    '&.Mui-expanded': {
                        backgroundColor: '#fff',
                    }
                },
            },
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    padding: '16px',
                    backgroundColor: '#FFFAFA',
                    transition: 'background-color 0.3s ease',
                    '&.Mui-expanded': {
                        backgroundColor: '#e8e8e8 !impotant',
                    },
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fontSize: '2rem',
                    color: '#4caf50',
                },
            },
        },
    },
});
