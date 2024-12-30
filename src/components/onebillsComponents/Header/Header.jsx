// MODULE IMPORTS
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Modal from 'react-modal';
import axios from "axios";

// STYLES IMPORT
import {
    MainContainer, Title, ProfileDiv, CustomDiv, Btn, ModalHeader, ModalDiv, CloseBtn, ModalContentDiv, AlertItem, AlertText,
    AlertDate, SpanTag, ProfilePic, ProfileText, Img, ImgDiv,
} from "./StyledComponents";


// COMPONENT IMPORTS
import WonBillsContext from "../../../context/WonBillsContext";
import { savedToken } from '../DefaultData/DefaultData';
import NotificationBadge from "../../../../shared/UIElements/NotificationBadge";

// ICONS IMPORTS
import { useEffect } from "react";
import { IoNotifications } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";

// MODAL STYLES
const modalStyles = {
    width: '25rem',
    height: '85%',
    top: '10%',
    left: '73%',
    right: 'auto',
    borderRadius: '1rem',
    overflow: 'auto',
    padding: '0.6rem',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
    border: 'none'
};

const Header = () => {
    const { setPathText, profilePicture, companyName, setProfilePicture, businessLogo } = useContext(WonBillsContext)
    const PathText = location.pathname.split('/')
    const UserID = localStorage.getItem('userId');
    const [IsModalOpen, setModalOpen] = useState(false)
    const navigate = useNavigate()

    const storedUserId = localStorage.getItem('userId');
    const apiUrl = import.meta.env.VITE_API_URL;

    const [userProfileText, setUserProfileText] = useState([])
    const [Alerts, setAlerts] = useState([])

    useEffect(() => {
        setPathText(PathText[1])
        getUserData()
        getAlerts()
    }, [])

    const getUserData = async () => {
        try {
            const result = await axios.get(`${apiUrl}/user/${storedUserId}`, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${savedToken}`
                }
            });
            setUserProfileText(result?.data?.company_details?.company_name?.slice(0, 1).toUpperCase() || 'W')
            setProfilePicture(result?.data?.profile_picture?.image)
        } catch (error) {
            console.error(error);
        }
    }

    const getAlerts = async () => {
        try {
            const result = await axios.get(`${apiUrl}/alerts/${UserID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${savedToken}`,
                },
            });
            setAlerts(result.data)
        } catch (error) {
            console.error(error);
        }
    }

    const onClickAlerts = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const PopUpModal = () => {
        return (
            <Modal
                isOpen={IsModalOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={{
                    overlay: { zIndex: 1000 },
                    content: modalStyles
                }}
            >
                <ModalDiv>
                    <ModalHeader>All Alerts</ModalHeader>
                    <CloseBtn onClick={closeModal}> <IoMdCloseCircle /> </CloseBtn>

                    <ModalContentDiv>
                        {Alerts.filter(each => {
                            const alertDate = new Date(each.created_date).toLocaleDateString();
                            const TodaysDate = new Date().toLocaleDateString();
                            return alertDate === TodaysDate
                        }).length > 0 && (
                                <>
                                    <SpanTag>Today</SpanTag>
                                    {Alerts.filter(eachAlert => {
                                        const alertDate = new Date(eachAlert.created_date).toLocaleDateString();
                                        const TodaysDate = new Date().toLocaleDateString();
                                        return alertDate === TodaysDate
                                    }).map(eachAlert => (
                                        <AlertItem key={eachAlert.alert_id}>
                                            <AlertText>{eachAlert.alert_text}</AlertText>
                                            <AlertDate>{new Date(eachAlert.created_date).toLocaleDateString()}</AlertDate>
                                        </AlertItem>
                                    ))
                                    }
                                </>
                            )}

                        {Alerts.filter(each => {
                            const alertDate = new Date(each.created_date).toLocaleDateString();
                            const TodaysDate = new Date().toLocaleDateString();
                            return alertDate !== TodaysDate
                        }).length > 0 && (
                                <>
                                    <SpanTag>Older</SpanTag>
                                    {Alerts.filter(eachAlert => {
                                        const alertDate = new Date(eachAlert.created_date).toLocaleDateString();
                                        const TodaysDate = new Date().toLocaleDateString();
                                        return alertDate !== TodaysDate
                                    }).map(eachAlert => (
                                        <AlertItem key={eachAlert.alert_id}>
                                            <AlertText>{eachAlert.alert_text}</AlertText>
                                            <AlertDate>{new Date(eachAlert.created_date).toLocaleDateString()}</AlertDate>
                                        </AlertItem>
                                    ))
                                    }
                                </>
                            )}

                    </ModalContentDiv>
                </ModalDiv>

            </Modal>
        )
    }

    const onClickProfile = (path) => {
        navigate(`/${path}`)
    }

    const convertPathName = (path) => {
        const splitPath = path.split('-').map(word => word[0].toUpperCase() + word.slice(1))
        return splitPath.join(' ')
    }

    // console.log(companyName)

    return (
        <WonBillsContext.Consumer>
            {(values) => {
                const { pathText } = values;

                return (
                    <MainContainer>
                        <ImgDiv>
                            {businessLogo && <Img
                                alt={companyName ? 'Company Logo' : 'Default Logo'}
                                src={`data:image/jpeg;base64,${businessLogo}`}
                            />}
                            <Title>{companyName}</Title>
                        </ImgDiv>

                        <CustomDiv>
                            <Btn type="button" onClick={onClickAlerts} title="Notifications" >
                                <NotificationBadge count={69} />
                                <IoNotifications size={25} />
                            </Btn>

                            {IsModalOpen && PopUpModal()}

                            <ProfileDiv onClick={() => onClickProfile('Settings')}>
                                {profilePicture ?
                                    <ProfilePic
                                        src={`data:image/jpeg;base64,${profilePicture}`} // BASE64 IMAGE
                                        alt="Profile"
                                    /> : <ProfileText>{userProfileText}</ProfileText>
                                }
                            </ProfileDiv>
                        </CustomDiv>
                    </MainContainer>
                );
            }}
        </WonBillsContext.Consumer>
    )
}

export default Header;
