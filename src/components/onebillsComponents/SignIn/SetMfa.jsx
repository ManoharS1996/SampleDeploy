
import Modal from 'react-modal';
import {
    ParentContainer, ChildDiv1, ChildDiv2, LoginForm, Title, InputsDiv2, Label2, Input, Text, HrTag, InputsCon, Btn, SpanTag, LoginBtn, SpanTag2,
    ModalMainContainer, MHeader, MNote, MButton, MButton2, MBtnDiv, Img, ImgDiv, Logoimg, HashTag, FgtPwdAndRememberMeContainer
} from './StyledComponents'
// MODAL STYLES
const modalStyles = {
    width: '45rem',
    height: '40%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1rem',
    overflow: 'auto',
    padding: '0.1rem',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
    border: 'none',
};

const SetMfa = props => {
    return (
        <Modal
            isOpen={props.isOpen}
            contentLabel="Example Modal"
            style={{
                overlay: { zIndex: 1000 },
                content: modalStyles
            }}
        >
            <ModalMainContainer>
                <MHeader>Enhance Your Account Security</MHeader>
                <MNote>{`Dear ${user_name || 'User'} We highly recommend setting up Multi-Factor Authentication (MFA) to add an extra layer of protection to your account.`}</MNote>
                <MBtnDiv>
                    <MButton type="button" onClick={() => onOtpMfa(email, user_name)}> <TbPasswordMobilePhone style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} /> Set Up with OTP</MButton>
                    <MButton type="button"> <GoPasskeyFill style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} /> Set Up with Passkey</MButton>
                </MBtnDiv>

                <MButton2 type="button" onClick={props.close}>Skip for Now</MButton2>
            </ModalMainContainer>

        </Modal>
    )
};

export default SetMfa;