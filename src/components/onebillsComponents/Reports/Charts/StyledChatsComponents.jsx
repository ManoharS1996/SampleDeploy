import styled from "styled-components";

export const WodgetSettingsBtn = styled.button `
    align-self: flex-end;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    outline: none;
    border: none;
    cursor: pointer;
    opacity: 0.6;
    
    &:hover {
        opacity: 1;
        box-shadow: 0 0 1px 1px #ccc;
    }
`