import styled from "styled-components";

export const ParentContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    /* overflow-y: auto; */
    /* overflow-x: hidden; */
`
// ================================================= LANDING PAGE STYLES ========================


export const Header = styled.header`
    min-height: 8vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.8rem;
    /* border: 2px solid red; */
    position: fixed;       
    top: 0;                
    left: 0;               
    z-index: 1000;        
    background-color: white; 
`

export const CustomImgTag = styled.img`
    height: 2.7rem;
    width: 2.7rem;
    /* border: 2px solid red; */
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
    padding: 0;
    border: none;
    outline: none;
    border-radius: 0;
    /* background: #4318FF; */
    /* border-radius: 1rem; */
    /* padding: 0.1rem 1rem; */
    /* color: #FFF; */

    &:hover{
        border-bottom: 2px solid #000;
    }
`


export const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 8vh;
    
`
export const CustomDiv1 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const CustomDiv2 = styled.div`
    background: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    /* margin: 0.5rem; */
`

export const CustomDiv3 = styled.div`
    /* border: 2px solid red; */
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0rem;
`

export const Icon = styled.span`
    font-size: 3rem;
    padding: 0;
    margin: 0;
`

export const PataTag1 = styled.p`
    padding: 0;
    margin: 0;
    font-size: 1.4rem;
    font-weight: 640;
`

export const CustomSpanTag = styled.span`

`

export const CustomContainer= styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
    padding: 2rem 5rem;
    /* border: 2px solid red; */
`

export const Footer = styled.footer`
    width: 100%;
    background: #f0f0f0;
    padding: 1.5rem 1rem 0rem 1rem;
`

export const FooterContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0rem;
    opacity: 0.6;
    /* padding: 1rem; */
    overflow: hidden !important;
    /* justify-content: space-between; */
`
export const BrandWrapper = styled.div`
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0rem 1rem;

    /* border: 2px solid red; */
`
export const BrandName = styled.span`
    font-size: 1.5rem;
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
    /* border: 2px solid red; */
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
    /* border: 2px solid red; */
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
    padding: 0;
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

// ================================================= TERMS ND CONDITIONS STYLES ========================================


export const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    padding: 1rem;
`
export const ModalMainContainer = styled.div`
    height: fit-content;
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
`
export const ModalMainContainer2 = styled.div`
    height: fit-content;
    width: 60%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    border: 1px solid #000;
`

export const MainHeading = styled.h1`
    font-size: 1.3rem;
    font-weight: 650;
`

export const CustomPara = styled.p`
    font-size: 0.7rem;
`
export const Heading2 = styled.h1`
    font-size: 0.7rem;
    color: #000;

`

export const CustomSpan = styled.span`
    font-size: 0.7rem;
    color: #000;
    font-weight: 600;
`

export const CustomBr = styled.div`
    width: 100%;
    height: 1px;
    color: #000;
    background: #000;
    margin: 0.2rem 0;
`

export const CustomOl = styled.ol`
    width: 100%;
    list-style-position: outside;
`

export const CustomLi = styled.li`
    margin-bottom: 0.5rem;
`

export const CustomPara2 = styled.p`
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0;
    margin: 0;
`

export const CustomSpan2 = styled.span`
    font-size: 0.7rem;
`
export const CustomSpan3 = styled.span`
    font-size: 0.7rem;
    font-weight: 600;
`
export const CustomLi2 = styled.li`
    font-size: 0.7rem;
`
export const NewDiv = styled.div`
    height: 99vh;
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;

`