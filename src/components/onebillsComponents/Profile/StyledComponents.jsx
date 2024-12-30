import styled from "styled-components";
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2'

export const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
`

export const ContentContainer = styled.div`
    height: 100vh;
    width: 85vw;
    background: #F4F7FE;
    padding: 1rem;
`

export const BodyDiv = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #FFF;
    border-radius: 1.5rem;
    padding: 1rem 1rem 1rem 1rem;
    position: relative;
    overflow: auto;
`

export const TitleSection = styled.div`
    height: 12vh;
    width: 98%;
    background: linear-gradient(to right, #868CFF, #4318FF);
    border-radius: 1.1rem;
    display: flex;
    align-items: center;
    position: absolute;
`

export const Title = styled.h1`
    font-size: 1.5rem;
    text-align: center;
    width: 10rem;
    color: #FFF;
    margin: 0;
    padding: 0;
`

export const UserDetailsDiv = styled.div`
    height: fit-content;
    width: 70%;
    margin: 1rem 0rem 0.5rem 0rem;
    padding: 0.5rem 1rem 0.5rem 1rem;
    background: #F0EFEF;
    border-radius: 1rem;
    
`

export const SubscriptionDiv = styled.div`
    height: fit-content;
    width: 70%;
    margin: 1rem 0rem 0.5rem 0rem;
    padding: 0.5rem 1rem 0.5rem 1rem;
    background: #F0EFEF;
    border-radius: 1rem;
`

export const Title2 = styled.h1`
    font-size: 1rem;
    font-weight: 500;
`

export const ProfileImage = styled.img`
    height: 14rem;
    width: 14rem;
    border-radius: 50%;
    position: absolute;
    object-fit: cover;
    object-position: top;
    border: 1px solid #ccc;
`

export const Btn = styled.button`
    width: 9rem;
    height: 2rem;
    position: absolute;
    right: 10%;
    bottom: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #4318FF;
    color: #FFF;
    border-radius: 1rem;
    cursor: pointer;
`

export const InputsDiv2 = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    margin: 1rem 0rem 1rem 0rem;
    font-family: 'Segoe UI', sans-serif;
    position: relative;
    /* border: 2px solid red; */
`

export const Input = styled.input`
    font-size: 100%;
    height: 2.3rem;
    width: 100%;
    padding: 0.8em;
    outline: none;
    border: 2px solid rgb(200, 200, 200);
    background-color: transparent;
    border-radius: 1rem;
    width: 100%;
    
    &:focus,
    &:valid {
        /* border-color: rgb(150, 150, 200); */
    }
    &:hover{
        border-color: #343a40;
    }

`;

export const Label2 = styled.label`
    font-size: 1rem;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.8em;
    margin-left: 0.2em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: rgb(100, 100, 100);
    background-color: transparent;

    /* When input is focused, valid, or readonly */
    ${Input}:focus + &,
    ${Input}:valid + &,
    ${Input}[readonly] + & {
        top: 0;
        transform: translateY(-50%) scale(0.9);  
        margin-left: 1rem;
        padding: 0.2em 0.5em;  
        background-color: #F0EFEF;  
    }
`;

export const CustomDiv = styled.div`
    overflow: auto;
    margin-top: 15vh;
    border-radius: 1rem;
`

export const BackBtn = styled.button`
    margin: 0 0 0 1rem;
    padding: 0;
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: #FFF;
    border: none;
    outline: none;
    cursor: pointer;
    background: transparent;
`

export const ReactSelect = styled(Select)`
    border-radius: 1rem;
`

export const customStyles = {
    container: (provided) => ({
        ...provided,
    }),
    control: (provided) => ({
        ...provided,
        borderRadius: '0.9rem',
        backgroundColor: '#F0EFEF',
        borderColor: '#ccc',
        border: '2px solid #ccc',
        boxShadow: 'none',
        '&:hover': {
            borderColor: '#343a40',
        },
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#ddd' : '#fff',
        color: state.isSelected ? '#000' : '#333',
        '&:hover': {
            backgroundColor: '#eee',
        },
        borderRadius: '0.7rem'
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#888',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#000',
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 9999,
        borderRadius: '0.9rem',
        padding: '0.1rem 0.3rem'
    }),
};

export const PhoneNumInput = styled(PhoneInput)`
    width: 100% !important;
    border: 2px solid #ccc;
    border-radius: 1rem;

    .buttonClass {
        border: none;
        border-radius: 1rem 0 0 1rem;
        
        &:hover {
            border-radius: 1rem 0 0 1rem;
            background: #F0EFEF !important;
        }
    }

    .custom-dropdown-button {
        border: none;
        border-radius: 1rem 0 0 1rem !important;
        background: #F0EFEF !important;
        transition: background-color 0.3s ease;
    }

`

export const Error = styled.p`
    font-size: 0.7rem;
    width: 10rem;
    padding: 0;
    margin: 0 0 0 0.5rem;
    position: absolute;
    bottom: 30%;
    left: 100%;
    /* border: 2px solid red; */
`

export const ProfilePicDiv = styled.div`
    border: 2px solid red;
    height: 14rem;
    width: 14rem;
    border-radius: 50%;
    position: absolute;
    right: 7%;
    top: 19%;
    object-fit: cover;
    object-position: top;
    border: 1px solid #ccc;
`

export const ImgInput = styled.input`
    display: none;
`

export const ImgLabel = styled.label`
    /* border: 1px solid #ccc; */
    border-radius: 50%;
    padding: 0rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    position: absolute;
    bottom: 0;
    right: 20%;
    background: #F0F0F0;
`