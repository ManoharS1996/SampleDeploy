import styled from "styled-components";

export const ParentContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('https://res.cloudinary.com/dca9sij3n/image/upload/v1733737710/udxu8vaemeqgjtryt4dk.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;
`

export const ChildDiv1 = styled.div`
    width: fit-content;
    min-width: 35vw;
    height: fit-content;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    position: relative;
    padding: 1rem 2rem;
`

export const ChildDiv2 = styled.div`
    width: 45vw;
    height: 100vh;
    background: #4361ee;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 0rem 0rem 0rem 20%;
`

export const LoginForm = styled.form`
    height: fit-content;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;
`

export const Title = styled.h1`
    font-size: 2.5rem;
    align-self: flex-start;
    align-self: center;
    margin-top: 1.5rem;
    font-family: Calibre, sans-serif;
`

export const Text = styled.p`
    color: #6c757d;
    margin: 0;
    padding: 0;
    align-self: flex-start;
    align-self: center;
    font-family: cursive;
`

export const HrTag = styled.hr`
    padding: 0;
    width: 100%;
    margin: 0.5rem 0rem 0rem 0rem;
`

export const InputsCon = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
`

export const Btn = styled.button`
    padding: 0;
    height: fit-content;
    width: fit-content;
    position: absolute;
    bottom: 20%;
    right: 2%;
    outline: none !important;
    border: none;
    cursor: pointer;
    background: inherit;
`

export const SpanTag = styled.span`
    font-size: 0.8rem;
`

export const LoginBtn = styled.button`
    height: 2.5rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #4318FF;
    color: #fff;
    padding: 1rem;
    border-radius: 0.8rem;
    margin-top: 2rem;
    &:hover{
        background: #FFF;
        color: #4318FF;
        border: 1.6px solid #4318FF;
    }
`

export const InputsDiv2 = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0.2rem 0rem 0.2rem 0rem;
    font-family: 'Segoe UI', sans-serif;
    margin: 1rem 0;
    position: relative;
`

export const Input = styled.input`
    font-size: 100%;
    height: 2.5rem;
    width: 100%;
    padding: 0.8em;
    outline: none;
    border: 1.6px solid #000;
    background-color: transparent;
    border-radius: 0.7rem;
    width: 100%;
`;

export const Label2 = styled.label`
    font-size: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(-50%) scale(0.9); 
    padding: 0.1em 0.5em; 
    margin-left: 1rem;  
    pointer-events: none;
    transition: all 0.3s ease;
    color: #000;
    background-color: #fff; 
`;

export const SpanTag2 = styled.label`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    padding: 1rem;
    border-radius: 0.8rem;
`

// ================================================= LANDING PAGE STYLES ========================
export const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
`

export const Header = styled.header`
    min-height: 8vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.8rem;
    position: fixed;       
    top: 0;                
    left: 0;               
    z-index: 1000;        
    background-color: white; 
`

export const CustomImgTag = styled.img`
    height: 2.7rem;
    width: 2.7rem;
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
    padding: 0.5rem;
`

export const CustomDiv3 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    border-radius: 1rem;
    height: 10rem;

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

export const CustomContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
    padding: 2rem 5rem;
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
// modal styles

export const ModalMainContainer = styled.div`
    background: #4361ee;
    color: #FFF;
    height: 100%;
    width: 100%;
    border-radius: 0.9rem;
    padding: 0.7rem;
    position: relative;
`

export const MHeader = styled.h1`
    font-size: 1.6rem;
    text-decoration: underline;
`

export const MNote = styled.p`
    padding: 0;
    margin: 0;
`

export const MBtnDiv = styled.div`
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50%;
    width: 100%;
`

export const MButton = styled.button`
    margin: 0.5rem;
    /* width: 12rem; */
    width: 40%;
    padding: 0.5rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

`

export const MButton2 = styled.button`
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    color: #000;
    text-decoration: underline;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    cursor: pointer;
`

export const ImgDiv = styled.div`
    background: #FFF;
    border-radius: 2rem;
`

export const Img = styled.img`

`

export const Logoimg = styled.img`
    height: 5rem;
    width: 5rem;
    /* position: absolute; */
    /* left: 50%; */
    /* transform: translate(-50%); */
    /* top: 4%; */
`

export const HashTag = styled.h1`
    /* position: absolute; */
    font-size: 1.5rem;
    color: #000;
    bottom: 1%;
`

export const FgtPwdAndRememberMeContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 0;
`