import {
    MainContainer,
    Header,
    CustomImgTag,
    CustomDiv,
    CustomBtn,
    BodyContainer,
    CustomDiv1,
    CustomDiv2,
    CustomDiv3,
    Icon,
    HeadingTag1,
    CustomParaTag,
    CustomContainer,
    Footer,
    FooterContainer,
    BrandWrapper,
    BrandName,
    FooterGrid,
    FooterSection,
    SectionTitle,
    SectionList,
    BrTag,
    CopyRight,
    SocialMediaIcons,
    Icon2,
    IntroDiv,
    Title,
    DisplayPic,
    ContentDiv,
    InvoicesDiv,
    CustomContainer2,
    WelcomeText,
    CustomeH1,
    CustomP,
    CustomContainer3,
    CustomButton,
    Brushstroke,
    PaintedSurface,
    SubDiv,Temp
} from "./StyledComponents2";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { PiHandWavingLight } from "react-icons/pi";
// import { PiCopyright } from "react-icons/pi";
import { PiCopyright } from "react-icons/pi";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const LandingPage2 = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <MainContainer>
            <SubDiv>
                <Header>
                    {/* <div>
                    <CustomImgTag src='./src/assets/wonbillslogo-1.png' />
                    <Title>Won Bills</Title>
                </div> */}

                    <CustomDiv>
                        <Link to="/login">
                            {" "}
                            <CustomBtn>SignIn</CustomBtn>{" "}
                        </Link>
                        <Link to="/CreateAccount">
                            {" "}
                            <CustomBtn style={{ background: "#FFCA1D", color: "#FFF" }}>
                                SignUp
                            </CustomBtn>{" "}
                        </Link>
                    </CustomDiv>
                </Header>

                <IntroDiv>
                    <CustomDiv1>
                        <PaintedSurface>
                            <CustomImgTag src="./src/assets/logo7.png" />
                        </PaintedSurface>
                        <Title
                            style={{
                                fontSize: "3rem",
                                fontWeight: "650",
                                color: "#FFF",
                                alignSelf: "center",
                                width: "60%",
                                textAlign: "center",
                            }}
                        >
                            Welcome to WonBills!
                        </Title>
                    </CustomDiv1>

                    <CustomContainer2>
                        <div>
                            <CustomP>
                                <super style={{ fontSize: "3rem" }}>10x</super> Safer & Secure
                            </CustomP>
                            <CustomP>
                                <super style={{ fontSize: "3rem" }}>10x</super> Faster
                            </CustomP>
                            <Link to="/CreateAccount">
                                <CustomButton>Get Started</CustomButton>{" "}
                            </Link>
                        </div>

                        <div style={{ width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <CustomContainer3 />
                            <span style={{ fontSize: '1.5rem' }}>#OneClickWithWonbills</span>
                        </div>
                    </CustomContainer2>
                </IntroDiv>

                <BodyContainer>
                    <CustomDiv2>
                        <CustomContainer>
                            <CustomDiv3>
                                <DisplayPic
                                    style={{
                                        backgroundImage: `url('https://res.cloudinary.com/dca9sij3n/image/upload/v1734431159/inbessjdpvjh1coxu3if.png')`,
                                    }}
                                ></DisplayPic>
                                <ContentDiv>
                                    {/* <Icon> <FaRupeeSign /> </Icon> */}
                                    <HeadingTag1>
                                        Effortless GST Invoicing for Modern Businesses
                                    </HeadingTag1>
                                    <CustomParaTag>
                                        WonBills simplifies your billing process by enabling you to
                                        generate GST-compliant invoices quickly and professionally,
                                        tailored to your unique business needs. With just a few
                                        clicks, create and share invoices instantly via email,
                                        ensuring seamless communication with your customers.
                                        Designed to enhance efficiency and save time, WonBills is
                                        the smart, reliable solution for modern businesses seeking
                                        simplicity and compliance in their invoicing process.
                                    </CustomParaTag>
                                </ContentDiv>
                            </CustomDiv3>

                            <CustomDiv3>
                                <ContentDiv>
                                    <HeadingTag1>
                                        Automate Payment Reminders and Streamline Collections
                                    </HeadingTag1>
                                    <CustomParaTag>
                                        WonBills empowers your business with automated payment
                                        reminders and direct payment link delivery to your customers
                                        via mobile and email. Keep your customers informed and
                                        ensure timely payments with scheduled notifications and
                                        effortless payment options. Simplify your billing process,
                                        enhance cash flow management, and recover dues
                                        efficiently—leaving you more time to focus on growing your
                                        business.
                                    </CustomParaTag>
                                </ContentDiv>

                                <DisplayPic
                                    style={{
                                        backgroundImage: `url('https://res.cloudinary.com/dca9sij3n/image/upload/v1732342052/hhuuypnx5ychj4l10ayt.png')`,
                                    }}
                                ></DisplayPic>
                            </CustomDiv3>

                            <CustomDiv3>
                                <DisplayPic
                                    style={{
                                        backgroundImage: `url('https://res.cloudinary.com/dca9sij3n/image/upload/v1732343579/n8ftt1pyatssnwgubfqp.png')`,
                                    }}
                                ></DisplayPic>

                                <ContentDiv>
                                    {/* <Icon> <TbReport /> </Icon> */}
                                    <HeadingTag1>
                                        Comprehensive Dashboards for Smarter Business Management
                                    </HeadingTag1>
                                    <CustomParaTag>
                                        WonBills offers personalized dashboards designed to keep you
                                        in control of your business. Monitor clients, invoices,
                                        payments, and inventory seamlessly from a single, intuitive
                                        interface. Gain quick access to key metrics and valuable
                                        insights with our pre-configured dashboards, enabling you to
                                        stay organized and make informed decisions. Simplify your
                                        workflow, enhance efficiency, and focus on driving your
                                        business forward with ease.
                                    </CustomParaTag>
                                </ContentDiv>
                            </CustomDiv3>
                        </CustomContainer>

                        <InvoicesDiv
                            className="slider-container"
                            style={{ width: "80%", margin: "auto" }}
                        >
                                <Temp></Temp>
                                <Temp></Temp>
                                <Temp></Temp>
                        </InvoicesDiv>
                    </CustomDiv2>

                    <Footer>
                        <FooterContainer>
                            <BrandWrapper>
                                <div>
                                    <CustomImgTag src="./src/assets/logo7.png" />
                                </div>
                                <BrandName style={{ fontSize: "1rem" }}>
                                    by NOWIT SERVICES Pvt Ltd
                                </BrandName>
                            </BrandWrapper>

                            <FooterGrid>
                                <FooterSection>
                                    <SectionTitle>Company</SectionTitle>
                                    <SectionList>
                                        <span></span>
                                        <Link to="/terms">
                                            {" "}
                                            <span>Terms & Conditions</span>{" "}
                                        </Link>
                                        <Link to="/terms">
                                            {" "}
                                            <span>Privacy Policy</span>{" "}
                                        </Link>
                                        <Link to="/terms">
                                            {" "}
                                            <span>Refund Policy</span>{" "}
                                        </Link>
                                    </SectionList>
                                </FooterSection>

                                <FooterSection>
                                    <SectionTitle>Contact Info</SectionTitle>
                                    <SectionList>
                                        <span style={{ fontWeight: "650" }}>Address</span>
                                        <span>
                                            17-6-284-1, Uma Shankar Nagar, Vijayawada, Andhra Pradesh,
                                            India
                                        </span>
                                    </SectionList>

                                    <SectionList>
                                        <span style={{ fontWeight: "650" }}>Phone</span>
                                        <span>+91 7893536373</span>
                                    </SectionList>

                                    <SectionList>
                                        <span style={{ fontWeight: "650" }}>Email</span>
                                        <span>contact.us@nowitservices.com</span>
                                    </SectionList>
                                </FooterSection>

                                <FooterSection>
                                    <SectionTitle>Social Media</SectionTitle>
                                    <SocialMediaIcons>
                                        <a
                                            style={{ color: "#000" }}
                                            href="https://www.instagram.com/_nowitservices_/profilecard/"
                                            target="_blank"
                                        >
                                            {" "}
                                            <Icon2>
                                                {" "}
                                                <FaInstagram />
                                            </Icon2>
                                        </a>
                                        <a
                                            style={{ color: "#000" }}
                                            href="https://www.linkedin.com/company/nowitservices/"
                                            target="_blank"
                                        >
                                            {" "}
                                            <Icon2>
                                                {" "}
                                                <FaLinkedin />{" "}
                                            </Icon2>{" "}
                                        </a>
                                        <a
                                            style={{ color: "#000" }}
                                            href="https://www.youtube.com/channel/UCcGdytqPFKcM_iASD0mVGbA"
                                            target="_blank"
                                        >
                                            {" "}
                                            <Icon2>
                                                {" "}
                                                <FaYoutube />{" "}
                                            </Icon2>{" "}
                                        </a>
                                    </SocialMediaIcons>
                                </FooterSection>
                            </FooterGrid>
                        </FooterContainer>

                        <BrTag>
                            <Icon
                                style={{
                                    fontSize: "1.2rem",
                                    margin: "0",
                                    height: "fit-content",
                                    width: "fit-content",
                                    marginRight: "0.4rem",
                                }}
                            >
                                {" "}
                                <PiCopyright />{" "}
                            </Icon>
                            <span style={{ padding: "0", margin: "0", height: "100%" }}>
                                2024 All Rights Reserved
                            </span>
                        </BrTag>
                    </Footer>
                </BodyContainer>
            </SubDiv>
        </MainContainer>
    );
};

export default LandingPage2;
