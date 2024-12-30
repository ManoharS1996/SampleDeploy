import styled, { keyframes } from 'styled-components';

// Define the keyframes animation
const spin = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

// Define the styled component
const SpinningLoader = styled.div`
  width: 30px;
  padding: 4px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:rgb(42, 107, 248);
  --_m: 
    conic-gradient(#0000 10%, #000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: ${spin} 1s infinite linear;
`;

export default function Spinner() {
    return (
        <SpinningLoader></SpinningLoader>
    )
}