import {
    MainContainer, ModalMainContainer2, MainHeading, CustomPara, Heading2, CustomSpan, CustomBr, CustomOl, CustomLi, CustomPara2, CustomSpan2,
    CustomLi2, CustomSpan3
} from '../../MyCompany/StyledComponents'

import {
    Header, CustomImgTag, CustomDiv, CustomBtn, Icon, Footer, FooterContainer, BrandWrapper, BrandName,
    FooterGrid, FooterSection, SectionTitle, SectionList, BrTag, SocialMediaIcons, Icon2,NewDiv
} from './StyledCoomponents'
import { Link } from 'react-router-dom'
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { PiCopyright } from "react-icons/pi";

const Terms = () => {

    return (
        <MainContainer>
            <Header>
                <CustomImgTag src='./src/assets/logo.png' />

                <CustomDiv>
                    {/* <CustomBtn>Features</CustomBtn> */}
                    <Link to='/'> <CustomBtn>Home</CustomBtn> </Link>
                    <Link to='/login'> <CustomBtn>Login</CustomBtn> </Link>
                    <Link to='/CreateAccount'> <CustomBtn>SignUp</CustomBtn> </Link>
                </CustomDiv>
            </Header>
            <NewDiv>
            
                <ModalMainContainer2>
                    <MainHeading> NOWIT SERVICES - Privacy Policy</MainHeading>

                    <CustomPara>Nowit Services is committed to safeguarding user privacy on the <span>WONPlus Bills</span> web app. This policy outlines how we handle data collection, usage, and security.</CustomPara>

                    <Heading2><CustomSpan>App Name:</CustomSpan> WONPlus Bills (Web App)</Heading2>
                    <Heading2><CustomSpan>Developer:</CustomSpan> NOWIT SERVICES Pvt Ltd</Heading2>
                    <Heading2><CustomSpan>Document:</CustomSpan> Terms & conditions, Privacy policy, Refund Policy</Heading2>

                    <CustomBr />

                    <CustomOl>
                        <CustomLi>
                            <CustomPara2>General Terms</CustomPara2>
                            <CustomSpan2>
                                This Privacy Policy forms part of the Terms of Service for this web app. By accessing or using this service,
                                you accept these terms. If you do not agree, please refrain from using the app.
                            </CustomSpan2>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2>Modification of Terms</CustomPara2>
                            <CustomSpan2>
                                Our Terms may change over time. Continued use of the web app after updates indicates acceptance of any changes.
                                Please review our Terms and Privacy Policy periodically.

                            </CustomSpan2>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2>Services Provided</CustomPara2>
                            <CustomSpan2>
                                This web app provides online billing, invoicing, and basic accounting tools for small and medium businesses. Accessible
                                through web browsers, it allows for secure cloud-based storage of billing records. Users are responsible for compliance with any relevant legal and regulatory requirements.
                            </CustomSpan2>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2>Charges</CustomPara2>
                            <ul>
                                <CustomLi2>
                                    <CustomSpan3>Transaction Fees:</CustomSpan3>A charge of 1% will be applicable per transaction processed through the web app. This fee applies
                                    to all transactions made via the app unless otherwise stated.
                                </CustomLi2>

                                <CustomLi2>
                                    <CustomSpan3>Payment Method:</CustomSpan3> The charge will be deducted automatically from the transaction amount at the time of payment processing.
                                    The exact charges applicable to your transaction will be clearly displayed before completing the transaction.
                                </CustomLi2>

                                <CustomLi2>
                                    <CustomSpan3>Future Changes:</CustomSpan3> We reserve the right to modify or update the transaction charges at any time. Users will be
                                    notified of any changes prior to their next transaction.
                                </CustomLi2>
                            </ul>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2>Data Collection and Permissions</CustomPara2>
                            <CustomSpan2>Initially a free web app, the service collects minimal data to improve the user experience, including:</CustomSpan2>

                            <ul>
                                <CustomLi2>
                                    <CustomSpan3>Contact Information:</CustomSpan3> For invoicing, client records, and account management.
                                </CustomLi2>

                                <CustomLi2>
                                    <CustomSpan3>Usage Data:</CustomSpan3> Includes session times, IP addresses, and device/browser details for analytics and security.
                                </CustomLi2>

                                <CustomLi2>
                                    <CustomSpan3>Uploaded Documents:</CustomSpan3> Any bills or invoices you upload are stored securely to enable easy access across devices.
                                </CustomLi2>

                                <CustomLi2>
                                    <CustomSpan3>Location Data:</CustomSpan3> Used to verify your business location and prevent fraud; collected only during active sessions.
                                </CustomLi2>

                            </ul>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2>Data Security and Ownership</CustomPara2>
                            <CustomSpan2>
                                Your data is securely stored, and you retain full ownership of all billing and transaction records. The service provider uses this data only for providing
                                and improving the service. Industry-standard security protocols, including encryption and firewall protections, are employed.
                            </CustomSpan2>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2>Data Retention & Deletion</CustomPara2>
                            <CustomSpan2>
                                Your data will be retained only as long as needed for service provision or as required by law. You may request deletion of your account and data by contacting our support team.
                            </CustomSpan2>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2> Notifications and Communication</CustomPara2>
                            <CustomSpan2>
                                As a free service, the app may send periodic notifications and promotional content to registered users, in accordance with our Terms.
                            </CustomSpan2>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2>Refund Policy</CustomPara2>
                            <CustomSpan2>
                                Since this is a free web app, no fees or payments are required to access its features. Therefore, no refunds are applicable for using this service.
                            </CustomSpan2>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2>Future Paid Services</CustomPara2>
                            <CustomSpan2>
                                If any paid features are introduced in the future, a clear refund policy specific to those features will be provided and communicated to users in advance.
                            </CustomSpan2>
                        </CustomLi>

                        <CustomLi>
                            <CustomPara2>Transaction Fees</CustomPara2>
                            <CustomSpan2>
                                Any transaction fees charged per transaction are non-refundable, even in the case of cancellations or refunds of the main transaction.
                            </CustomSpan2>
                        </CustomLi>

                    </CustomOl>

                </ModalMainContainer2>

                <Footer style={{marginTop:'1rem'}}>
                    <FooterContainer>

                        <BrandWrapper>
                            <div>
                                <CustomImgTag src='./src/assets/logo.png' />
                                <BrandName>WonPlus Bills</BrandName>
                            </div>
                            <BrandName style={{ fontSize: '1.1rem' }}>by NOWIT SERVICES Pvt Ltd</BrandName>

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
                                    <a style={{ color: '#000' }} href='https://www.instagram.com/_nowitservices_/profilecard/' target="_blank"> <Icon2> <FaInstagram /></Icon2></a>
                                    <a style={{ color: '#000' }} href='https://www.linkedin.com/company/nowitservices/' target="_blank"> <Icon2> <FaLinkedin /> </Icon2> </a>
                                    <a style={{ color: '#000' }} href='https://www.youtube.com/channel/UCcGdytqPFKcM_iASD0mVGbA' target="_blank"> <Icon2> <FaYoutube /> </Icon2> </a>

                                </SocialMediaIcons>
                            </FooterSection>

                        </FooterGrid>

                    </FooterContainer>

                    <BrTag >
                        <Icon style={{ fontSize: '1.2rem', margin: '0', height: 'fit-content', width: 'fit-content', marginRight: '0.4rem' }}> <PiCopyright /> </Icon>
                        <span style={{ padding: '0', margin: '0', height: '100%' }}>2024 All Rights Reserved</span>
                    </BrTag>

                </Footer>

            </NewDiv>

        </MainContainer>
    )

}

export default Terms