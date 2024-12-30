import styled from "styled-components";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';

export const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;
    background: #9bb1ff;
    background-image: url('https://res.cloudinary.com/dca9sij3n/image/upload/v1733737710/udxu8vaemeqgjtryt4dk.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    position: relative;
`

export const BannerContainer = styled.div`
    width: 45vw;
    height: 100%;
    background: linear-gradient(to bottom, #868CFF , #4318FF);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 2rem;
`

export const ContentContainer = styled.div`
    width: 35vw;
    height: fit-content;
    background: #fff;
    border-radius: 1rem;
    box-shadow: 1px 0 4px 0 rgba(108, 122, 137, 0.5);
    position: relative;

`

export const InnerContainer = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
`

export const LogoAndTitleContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Form = styled.form`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column ;
    align-items: center;
    padding: 1rem 5rem;
    position: relative;
`

export const Form2 = styled.form`
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: column ;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;

`

export const Title = styled.h1`
    font-size: 2rem;
    color: #2B3674;
    font-weight: 550;
    margin: 2rem 1rem 0rem 0rem;
    font-family: Calibre, sans-serif;
    text-align: center;
`

export const Btn = styled.button`
    background: #2F55DC;
    color: #FFF;
    padding: 0.5rem;
    margin: 1rem;
    width: 50%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 1rem;
    border-radius: 1.5rem;

    &:hover{
        background: transparent;
        border: 1.6px solid #2F55DC;
        color: #2F55DC;
    }
`

export const Span = styled.span`
    margin-bottom: 2rem;
`

export const Title2 = styled.h1`
    font-size: 2.2rem;
    width: 95%;
    text-align: center;
    color: #2B3674;
    font-weight: 550;
    margin: 0.5rem 1rem 0rem 0rem;
    font-family: Calibre, sans-serif;
`

export const InputsDivs = styled.div`
    width: 95%;
    height: fit-content;
    display: flex;
    justify-content: space-between;
`

export const InputsDiv2 = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    margin: 0.2rem 0rem 0.2rem 0rem;
    font-family: 'Segoe UI', sans-serif;
    margin: 1em 0;
    position: relative;
`

export const InputGroup = styled.div`
    font-family: 'Segoe UI', sans-serif;
    margin: 1em 0;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
`;

export const Input = styled.input`
    font-size: 100%;
    height: 2.4rem;
    padding: 0.8em;
    outline: none;
    border: 1.6px solid #000;
    background-color: transparent;
    border-radius: 0.7rem;
    width: 100%;
`;

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
    background-color: #fff; 
`;

export const PhoneNumInput = styled(PhoneInput)`
    width: 100% !important;
    border: 1.6px solid #000;
    border-radius: 0.7rem;

    .buttonClass {
        border: none;
        border-radius: 1rem 0 0 1rem;
        background-color: #e9ecef;
        
        &:hover {
            border-radius: 1rem 0 0 1rem !important;
            background-color: #e9ecef !important;
        }
    }

    .custom-dropdown-button {
        border: none;
        border-radius: 1rem 0 0 1rem !important;
        background-color: #e9ecef !important;
        transition: background-color 0.3s ease;
    }

    .react-tel-input .flag-dropdown.open {
        background-color: #e9ecef !important;
        border-radius: 1rem 0 0 1rem !important;
        z-index: 10;
        transition: background-color 0.3s ease;
    }

    .react-tel-input .flag-dropdown.open:hover {
        background-color: #d6d8db !important;
    }



`

export const BackBtn = styled.button`
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
    background: transparent;
`

export const ReactSelect = styled(Select)`
    border-radius: 1rem;
`

export const ImgInput = styled.input`
    display: none;
`

export const ImgLabel = styled.label`
    font-size: 2rem;
    width: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    background: #ade8f4;
    justify-content: center;
    border-radius: 50%;
    color: #4361ee;
    cursor: pointer;
`

export const ImgLabel2 = styled.label`
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    border-radius: 50%;
    padding: 0.2rem;
    color: #4361ee;
`

export const ImgInputsDiv = styled.div`
    height: 8rem;
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0.2rem 0rem 0.2rem 0rem;
    border-radius: 1rem;
    border: 2px dotted #42a5f5;
    font-family: 'Segoe UI', sans-serif;
    margin: 1em 0;
`

export const Error = styled.p`
    font-size: 0.7rem;
    padding: 0;
    margin: 0 0 0 0.5rem;
    position: absolute;
    bottom: -1rem;
    color: red !important;
`

export const ImgTag = styled.img`
    width: 5rem;
    height: 5rem;
    object-fit: cover;
    object-position: top;
    border-radius: 50%;
`

export const ValidateBtn = styled.button`
    height: 2.5rem;
    width: 7rem;
    padding: 0.2rem 0.8rem ;
    margin-left: 0.5rem;
    border: 2px solid #ccc;
    border-radius: 2rem;
    outline: none !important;
    border: none;
    font-size: 0.8rem;
    display: 'flex';
    align-items: center;
    justify-content: center;
    background: #2F55DC;
    color: #FFF;
    cursor: pointer; 
`

export const GetOtpBtn = styled.button`
    background: #343ddc;
    color: #FFF;
    border-radius: 1.5rem;
    padding: 0.5rem 1.5rem;
    cursor: pointer;
`

export const TermsCheckBox = styled.input`
    padding: 0.5rem !important;
    height: 1rem !important;
    width: 1rem !important;
    margin: 0rem 0.5rem;
`
export const TermsLabel = styled.label`
    font-size: 0.8rem;
`

export const CustomBtn = styled.button`
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    cursor: pointer;
    color: blue;
    background: transparent;
`
export const EyeBtn = styled.button`
    position: absolute;
    padding: 0;
    margin: 0;
    right: 1rem;
    border: none;
    outline: none;
    background: transparent;
`

export const LogoImg = styled.div`
    height: 25rem;
    width: 25rem;
    background: #FFF;
    border-radius: 2rem;
`

export const Img = styled.img`
    height: 100%;
    width: 100%;
    padding: 0;
`

export const HashTag = styled.h1`
    /* position: absolute; */
    font-size: 1.5rem;
    color: #000;
    margin-top: auto;
`

export const Logoimg = styled.img`
    height: 4rem;
    width: 4rem;
    position: absolute;
    left: 8%;
    /* top: 4%; */
`

export const TagLine = styled.label`
    margin: 0.5rem 0 2rem 0;
    width: 100%;
    text-align: center;
    margin: 0.2rem 1rem 1rem 0rem;
    font-family: cursive;
`

export const TitleForgot = styled.h1`
    font-size: 2rem;
    text-align: center;
`