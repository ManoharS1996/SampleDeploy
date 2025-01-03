import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(180deg);
    }
`;

export const PinwheelContainer = styled.div`
    --uib-size: 45px;
    --uib-speed: 0.8s;
    --uib-color: #312f2b;
    --uib-line-weight: 4px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--uib-size);
    width: var(--uib-size);
`;

export const PinwheelLine = styled.div`
    position: absolute;
    top: calc(50% - var(--uib-line-weight) / 2);
    left: 0;
    height: var(--uib-line-weight);
    width: 100%;
    border-radius: calc(var(--uib-line-weight) / 2);
    background-color: var(--uib-color);
    animation: ${rotate} var(--uib-speed) ease-in-out infinite;

    &:nth-child(2) {
        animation-delay: calc(var(--uib-speed) * 0.075);
        opacity: 0.8;
    }

    &:nth-child(3) {
        animation-delay: calc(var(--uib-speed) * 0.15);
        opacity: 0.6;
    }

    &:nth-child(4) {
        animation-delay: calc(var(--uib-speed) * 0.225);
        opacity: 0.4;
    }

    &:nth-child(5) {
        animation-delay: calc(var(--uib-speed) * 0.3);
        opacity: 0.2;
    }

    &:nth-child(6) {
        animation-delay: calc(var(--uib-speed) * 0.375);
        opacity: 0.1;
    }
`;