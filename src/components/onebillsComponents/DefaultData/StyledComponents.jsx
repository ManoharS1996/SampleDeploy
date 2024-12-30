import styled, { keyframes } from 'styled-components';
import Select, { components } from 'react-select';
import { Height } from '@mui/icons-material';

// Loader spin animation
const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const ReactSelect = styled(Select)`
    border-radius: 1rem;
`
export const CustomStyles = {
    container: (provided) => ({
        ...provided,
        width: '100%',
    }),
    control: (provided) => ({
        ...provided,
        borderRadius: '0.7rem',
        backgroundColor: 'inherit',
        borderColor: '#ccc',
        border: '1.6px solid #000',
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
        borderRadius: '0.7rem',
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
        borderRadius: '0.7rem',
        padding: '0.1rem 0.3rem',
        overflowY: 'hidden',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#000',
        '&:hover': {
            color: '#343a40',
        },
    }),
    menuList: (provided) => ({
        ...provided,
        maxHeight: '15rem', // Apply the scrollable height limit to the inner list
        overflowY: 'auto', // Enable scrolling for the list items
        padding: 0, // Optional: Remove extra padding if it causes visual issues
    }),
};

export const Customstyles2 = {
    control: (provided) => ({
        ...CustomStyles.control(provided),
        backgroundColor: '#FFF', // Override background color
    }),
    menu: (provided) => ({
        ...CustomStyles.menu(provided),
        backgroundColor: '#FFF', // Override dropdown menu background color
    }),
}

export const SweetAlertCustomStyles = `
    .swal2-popup {
        font-family: 'Arial', sans-serif;
        font-size: 1rem;
        background-color: #f5f5f5;
        border-radius: 2rem;
        padding: 1rem;
        height:16.5rem
    }

    .swal2-title {
        color: #333;
        font-size: 1rem; 
        font-weight: bold;
    }

    .swal2-html-container {
        color: #666;
        font-size: 1rem !important;
        padding: 0 !important;
        margin: 0 !important;
        height: auto !important; /* Allow height to adjust based on content */
        min-height: 2rem; /* Ensure a minimum height */
        display: flex !important;
        align-items: center !important;
        text-align: center !important;
        text-align: center !important;
    }

    .swal2-confirm {
        background-color: #4CAF50 !important;
        color: white;
        border-radius: 10px;
        padding: 0.3rem 1.2rem;
        font-size: 1rem;
    }

    .swal2-cancel {
        background-color: #f44336 !important;
        color: white;
        border-radius: 10px;
        padding: 0.3rem 1.2rem;
        font-size: 1rem;
    }

    .swal2-icon {
        width: 3.5rem; 
        height: 3.5rem; 
        border: 3px solid #000; 
        border-radius: 50%; 
        background-color: #fff;
    }

    .swal2-icon--warning {
        color: #f0ad4e; 
    }

    .swal2-icon--warning .swal2-icon-content {
        color: #f0ad4e; 
    }

    .swal2-icon--warning:before {
        font-size: 2rem; 
        line-height: 3.5rem;
    }
`;

document.head.insertAdjacentHTML('beforeend', `<style>${SweetAlertCustomStyles}</style>`);

export const StatusDIv = styled.div`
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    width: 10rem;
`

export const Loader = styled.div`
    /* border: 4px solid rgba(0, 0, 255, 0.1);  */
    border: 4px solid #343a40; 
    border-left-color: transparent; 
    border-radius: 50%;
    width: 36px;
    height: 36px;
    animation: ${spin} 1s linear infinite;
    padding: 0;
    margin: 0;
`;

export const CheckboxWrapper = styled.div``;

export const CheckboxInput = styled.input`
    visibility: hidden;
    display: none;
`;

export const ToggleLabel = styled.label`
    position: relative;
    display: block;
    width: 42px;
    height: 24px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transform: translate3d(0, 0, 0);

    &:before {
        content: "";
        position: relative;
        top: 1px;
        left: 1px;
        width: 40px;
        height: 22px;
        display: block;
        background: #c8ccd4;
        border-radius: 12px;
        transition: background 0.2s ease;
}
`;

export const ToggleSpan = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    display: block;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(154, 153, 153, 0.75);
    transition: all 0.2s ease;

    svg {
        margin: 7px;
        fill: none;
        path {
        stroke: #c8ccd4;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 24;
        stroke-dashoffset: 0;
        transition: all 0.5s linear;
        }
    }
`;

export const CheckboxInputChecked = styled(CheckboxInput)`
    &:checked + ${ToggleLabel}:before {
        background: #1175c7;
    }

    &:checked + ${ToggleLabel} ${ToggleSpan} {
        transform: translateX(18px);

        svg path {
        stroke: #000000;
        stroke-dasharray: 25;
        stroke-dashoffset: 25;
        }
    }
`;