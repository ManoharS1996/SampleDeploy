import {styled,keyframes} from "styled-components"
// ================================================= LANDING PAGE STYLES ========================
export const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    /* padding: 0.6rem 0.6rem 0.6rem 0.6rem; */
`

export const Header = styled.header`
    min-height: 8vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 0.8rem;
    position: sticky;
    top: 0;                
    left: 0;               
    z-index: 1000;
    background-color: white; 
    background: #4B4AEF;
    /* border-radius: 0.5rem 0.5rem 0em 0rem ; */
`

export const CustomImgTag = styled.img`
    width: 12rem;
    height: 11rem;
    padding: 0;
    border-radius: 1rem;
`

export const CustomDiv = styled.div`
    height: 100%;
    width: fit-content;
    display: flex;
    align-items: center;

`
export const CustomBtn = styled.button`
    height: fit-content;
    width: fit-content;
    margin: 0rem 1rem;
    padding: 0.2rem 1rem;
    border: none;
    outline: none;
    border-radius: 0.5rem;

    &:hover{
        /* border-bottom: 2px solid #000; */
    }
`


export const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* margin-top: 8vh; */
    
`
export const CustomDiv1 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    /* justify-content: flex-start; */
`

export const CustomDiv2 = styled.div`
    /* background: #ccc; */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0.5rem;
`

export const CustomDiv3 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 1rem 0rem;
    width: 100%;
    /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); */
    border-radius: 1rem;
    height: 25rem;
    padding: 0.5rem;
    margin: 1rem 0;
    /* border: 1px solid #000; */

`

export const Icon = styled.span`
    font-size: 1rem;
    padding: 0;
    margin: 0;
    height: 1.1rem;
    width: 1.1rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const HeadingTag1 = styled.h1`
    padding: 0;
    margin: 0;
    font-size: 2.4rem;
    font-weight: 900;
    width: 75%;
`

export const CustomParaTag = styled.p`
    font-size: 1.5rem;
    color: #6c6e6d;
    margin-top: 0.6rem;
`

export const CustomContainer= styled.div`
    width: 100%;
    /* display: grid; */
    /* grid-template-columns: repeat(2, 1fr); */
    /* grid-gap: 2rem; */
    display: flex;
    flex-direction: column;
    padding: 2rem 5rem;
`

export const Footer = styled.footer`
    width: 100%;
    /* background: #f0f0f0; */
    padding: 1.5rem 1rem 0rem 1rem;
`

export const FooterContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0rem;
    opacity: 0.6;
    overflow: hidden !important;
`
export const BrandWrapper = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0rem 1rem;
`
export const BrandName = styled.span`
    font-size: 1rem;
    font-weight: 600;
    color: #000;
`
export const FooterGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 0rem 1rem;
    gap: 1rem;
`

export const FooterSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

export const SectionTitle = styled.p`
    font-size: 1.2rem;
    font-weight: 680;
    margin: 0 0 0.5rem 0;

`

export const SectionList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`

export const BrTag = styled.div`
    width: 100%;
    height: fit-content;
    color: #000;
    border-top: 1px solid #000;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem;
`

export const CopyRight = styled.div`

`

export const SocialMediaIcons = styled.div`
    display: flex;
    align-items: center;
`

export const Icon2 = styled.span`
    height: 3rem;
    width: 3rem;
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.4rem;
    border-radius: 1rem;
    background: #ccc;

`

export const IntroDiv = styled.div`
    width: 100%;
    min-height: 38rem;
    background: #4B4AEF;
    padding: 0 5rem;
    border-radius: 0em 0rem 0.5rem 0.5rem;
`
export const Title = styled.span`
    font-size: 1.3rem;
    color: #FFF;
    font-weight: 600;
    font-family: Calibre, sans-serif !important;
`
export const DisplayPic = styled.div`
    width: 35%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const ContentDiv = styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const InvoicesDiv = styled.div`
    width: 100%;
    height: 25rem;
    display: flex;
    flex-direction: row;
    margin: 1rem 0rem;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1rem;
    /* border: 2px solid red; */
`

export const CustomContainer2 = styled.div`
    color: #FFF;
    min-height: 70%;
    width: 100%;
    flex-grow: 1;
    padding: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const WelcomeText = styled.span`
    background: #FFF;
    color: #000;
    padding: 0.3rem 2rem 0.3rem 0.2rem;
    border-radius: 7px;
    font-weight: 400;
    width: fit-content;
`

export const CustomeH1 = styled.h1`
    margin: 0.9rem 0rem;
    font-size: 3rem;
`

export const CustomP = styled.p`
    margin: 0;
    font-size: 3rem;

`
export const CustomButton = styled.button`
    margin-top: 2rem;
    width: 10rem;
    background: #FFCA1D;
    color: #FFF;
`

export const CustomContainer3 = styled.div`
    min-height: 20rem;
    width: 100%;
    background-image: url('https://res.cloudinary.com/dca9sij3n/image/upload/v1734430060/w84xijpiez8m5zgirogh.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 0  0rem 2rem 2rem;
`

export const PaintedSurface = styled.div`
    width: 20%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    /* border-radius: 2rem; */
    /* border: 1px solid red; */
    /* margin: 0 3rem; */
    overflow: hidden;
`;

export const Brushstroke = styled.div`

`;

export const SubDiv = styled.div`
    height: fit-content;
    width: 100%;
    flex-grow: 1;
    overflow-y: auto;
`

export const Temp = styled.div`
    height: 24rem;
    width: 18rem;
    border: 1px solid red;
`