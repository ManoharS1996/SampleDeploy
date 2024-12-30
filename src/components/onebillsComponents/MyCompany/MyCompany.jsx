import {
    MainContainer, Header, CustomImgTag, CustomDiv, CustomBtn, BodyContainer, CustomDiv1, CustomDiv2, CustomDiv3, Icon, PataTag1, CustomSpanTag,
    CustomContainer, Footer, FooterContainer, BrandWrapper, BrandName, FooterGrid, FooterSection, SectionTitle, SectionList, BrTag, CopyRight,
    SocialMediaIcons, Icon2
} from '../StyledComponents'
import { Link } from 'react-router-dom';

import { FaRupeeSign } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";
// import { PiCopyright } from "react-icons/pi";
import { PiCopyright } from "react-icons/pi";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const LandingPage1 = () => {
    return (
        <MainContainer>
            <Header>
                <CustomImgTag src='./src/assets/logo.png' />

                <CustomDiv>
                    {/* <CustomBtn>Features</CustomBtn> */}
                    {/* <CustomBtn>Contact</CustomBtn> */}
                    <Link to='/login'> <CustomBtn>Login</CustomBtn> </Link>
                    <Link to='/CreateAccount'> <CustomBtn>SignUp</CustomBtn> </Link>
                </CustomDiv>
            </Header>

            <BodyContainer>
                <CustomDiv1>
                    <h1 style={{ fontSize: '2rem', fontWeight: '650' }}>Simplify Your Billing Process</h1>
                    <p style={{ fontSize: '1.3rem', }}>Streamline your invoicing, payments, and financial tracking with our powerful billing app.</p>
                </CustomDiv1>

                <CustomDiv2>
                    <p style={{ fontSize: '1.9rem', fontWeight: '650' }}>Key Features</p>

                    <CustomContainer >

                        <CustomDiv3>
                            <Icon> <FaRupeeSign /> </Icon>
                            <PataTag1>Easy Invoicing</PataTag1>
                            <CustomSpanTag>create and send professional invoices in seconds</CustomSpanTag>
                        </CustomDiv3>

                        <CustomDiv3>
                            <Icon> <FaFileInvoice /> </Icon>
                            <PataTag1>Expense Tracking</PataTag1>
                            <CustomSpanTag>Keep track of all your expenses in one place.</CustomSpanTag>
                        </CustomDiv3>

                        <CustomDiv3>
                            <Icon> <TbReport /> </Icon>
                            <PataTag1>Financial Reports</PataTag1>
                            <CustomSpanTag>Generate detailed financial reports with ease.</CustomSpanTag>
                        </CustomDiv3>

                    </CustomContainer>
                </CustomDiv2>

                <Footer>
                    <FooterContainer>

                        <BrandWrapper>
                            <div>
                                <CustomImgTag src='./src/assets/logo.png' />
                                <BrandName>WonPlus Bills</BrandName>
                            </div>
                            <BrandName style={{fontSize:'1.1rem'}}>by NOWIT SERVICES Pvt Ltd</BrandName>

                        </BrandWrapper>

                        <FooterGrid>

                            <FooterSection>
                                <SectionTitle>Company</SectionTitle>
                                <SectionList>
                                    <span></span>
                                    <Link to='/terms'> <span>Terms & Conditions</span> </Link>
                                    <Link to='/terms'> <span>Privacy Policy</span> </Link>
                                    <Link to='/terms'> <span>Refund Policy</span> </Link>
                                </SectionList>

                            </FooterSection>

                            <FooterSection>
                                <SectionTitle>Contact Info</SectionTitle>
                                <SectionList>
                                    <span style={{ fontWeight: '650' }}>Address</span>
                                    <span>17-6-284-1, Uma Shankar Nagar,
                                        Vijayawada, Andhra Pradesh, India</span>
                                </SectionList>

                                <SectionList>
                                    <span style={{ fontWeight: '650' }}>Phone</span>
                                    <span>+91 7893536373</span>
                                </SectionList>

                                <SectionList>
                                    <span style={{ fontWeight: '650' }}>Email</span>
                                    <span>contact.us@nowitservices.com</span>
                                </SectionList>

                            </FooterSection>

                            <FooterSection>
                                <SectionTitle>Social Media</SectionTitle>
                                <SocialMediaIcons>
                                    <a style={{color:'#000'}} href='https://www.instagram.com/_nowitservices_/profilecard/' target="_blank"> <Icon2> <FaInstagram /></Icon2></a>
                                    <a style={{color:'#000'}} href='https://www.linkedin.com/company/nowitservices/' target="_blank"> <Icon2> <FaLinkedin /> </Icon2> </a>
                                    <a  style={{color:'#000'}} href='https://www.youtube.com/channel/UCcGdytqPFKcM_iASD0mVGbA' target="_blank"> <Icon2> <FaYoutube /> </Icon2> </a>

                                </SocialMediaIcons>
                            </FooterSection>

                        </FooterGrid>

                    </FooterContainer>

                    <BrTag >
                        {/* <CopyRight> */}
                        <Icon style={{ fontSize: '1.2rem', margin: '0', height: 'fit-content',width:'fit-content',marginRight:'0.4rem' }}> <PiCopyright /> </Icon>
                        <span style={{ padding: '0', margin: '0', height: '100%' }}>2024 All Rights Reserved</span>
                        {/* </CopyRight> */}
                    </BrTag>

                </Footer>




            </BodyContainer>
        </MainContainer>
    )
}

export default LandingPage1