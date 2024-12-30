import styled from "styled-components";

export const Mainwidget = styled.div`
    width: ${({ width }) => width ? width : '50%'};
    height: ${({ height }) => height ? height : '50%'};
    background-color: #fff;
    padding: 0.5rem;
    box-shadow: 0 0 0.2rem 0.1rem rgba(0,0,0,0.4);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
`

export const Title = styled.p`
    margin: 0;
    text-align: center;
    font-size: 0.82rem;
    font-weight: 700;
`

export default function MainWidget({ width, height, title, children }) {
    return (
        <Mainwidget
            width={width}
            height={height}
        >
            <Title>{title}</Title>
            {children}
        </Mainwidget>
    )
}