
import styled from "styled-components";

const BadgeSpan = styled.span`
    position: absolute;
    border-radius: 50%;
    width: fit-content;
    height: fit-content;
    background-color: red;
    font-size: 0.7rem;
    transform: translate(80%, -80%);
    padding: 0%.2rem;
    color: #fff;
`

export default function NotificationBadge({ count = 0 }) {
    return (
        <BadgeSpan>
            <b>
                {count > 99 ? 99 : count}
                {count > 99 && <sup >+</sup>}
            </b>
        </BadgeSpan>
    )
}