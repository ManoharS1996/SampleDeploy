
import styled from "styled-components";

const WidgetCardContainer = styled.div`
    min-width: 20vw;
    width: fit-content;
    height: 10vh;
    background-color: #fff;
    padding: 0.5rem;
    border-radius: 0.4rem;
    display: flex;
    align-items: center;
    box-shadow: 0 0 0.2rem 0.1rem rgba(0,0,0,0.4);
    gap: 1rem;
`

const IconContainer = styled.div`
    background-color: ${({ iconBg }) => iconBg ? iconBg : '#F4F7FE'};
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4318FF;
`

const TitleAndValueContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

const Title = styled.p`
    margin: 0;
    padding: 0;
    font-size: 0.8rem;
    font-weight: 700;
`

const ValueSpan = styled.span`
    margin: 0;
`

export default function WidgetCard({ icon, title, iconBg, value }) {
    return (
        <WidgetCardContainer>
            <IconContainer iconBg={iconBg} >{icon}</IconContainer>
            <TitleAndValueContainer>
                <Title>{title}</Title>
                <ValueSpan>
                    {value ? value : 0}
                </ValueSpan>
            </TitleAndValueContainer>
        </WidgetCardContainer>
    )
}