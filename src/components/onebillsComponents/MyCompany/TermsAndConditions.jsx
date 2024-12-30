import { ModalMainContainer, MainHeading, CustomPara, Heading2, CustomSpan, CustomBr, CustomOl, CustomLi, CustomPara2, CustomSpan2 } from './StyledComponents'
import Modal from 'react-modal';
import { useEffect, useState } from 'react';

const modalStyles = {
    width: '25rem',             
    height: '20rem',            
    top: '10%',
    left: '50%',
    right: 'auto',              
    borderRadius: '1rem',
    overflow: 'auto',
    padding: '0.6rem',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
    border: 'none'
};

const TermsAndConditions = (IsModalOpen,setModalOpen,closeModal) => {

    const closeThisModal = () => {
        // setModalOpen(false)
        // setModalOpen(false)
        closeModal()
    }
    return (
        <Modal isOpen={IsModalOpen}
            onRequestClose={closeThisModal}
            contentLabel="Example Modal"
            style={{
                overlay: { zIndex: 1000 },
                content: modalStyles
            }}
        >

            <ModalMainContainer>
                <MainHeading> Nowit Services WONPlus Bills Privacy Policy </MainHeading>

                <CustomPara>Nowit Services is committed to safeguarding user privacy on the <span>WONPlus Bills</span> web app. This policy outlines how we handle data collection, usage, and security.</CustomPara>

                <Heading2><CustomSpan>App Name:</CustomSpan> WONPlus Bills (Web App)</Heading2>
                <Heading2><CustomSpan>Developer:</CustomSpan> Nowit Services Private Limited</Heading2>

                <CustomBr />

                <CustomOl>
                    <CustomLi>
                        <CustomPara2>General Terms</CustomPara2>
                        <CustomSpan2>
                            This Privacy Policy forms part of the Terms of Service for the WONPlus Bills web app.
                            By accessing or using this service, you accept these terms. If you do not agree, please refrain from using the app.
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
                            WONPlus Bills provides online billing, invoicing, and basic accounting tools for small and medium businesses.
                            Accessible through web browsers, it allows for secure cloud-based storage of billing records. Users are responsible
                            for compliance with any relevant legal and regulatory requirements.
                        </CustomSpan2>
                    </CustomLi>

                    <CustomLi>
                        <CustomPara2>Charges</CustomPara2>
                        <CustomSpan2>
                            <span>Transaction Fees:</span> A charge of 1% will be applicable per transaction processed through WONPlus Bills.
                            This fee is applicable to all transactions made via the app, unless otherwise stated.
                        </CustomSpan2>

                        <CustomSpan2>
                            <span>Payment Method:</span> The charge will be deducted automatically from the transaction amount at the time of
                            payment processing. The exact charges applicable to your transaction will be clearly displayed before completion of the transaction.
                        </CustomSpan2>

                        <CustomSpan2>
                            <span>Future Changes:</span> We reserve the right to modify or update the transaction charges at any time. Users will be notified
                            of any changes prior to their next transaction.
                        </CustomSpan2>
                    </CustomLi>

                    <CustomLi>
                        <CustomPara2>Data Collection and Permissions</CustomPara2>
                        <CustomSpan2>Initially Free web app, WONPlus Bills collects minimal data to improve user experience, including:</CustomSpan2>

                        <CustomOl>
                            <span>
                                <span>Contact Information:</span> For invoicing, client records, and account management.
                            </span>

                            <span>
                                <span>Usage Data:</span> Includes session times, IP addresses, and device/browser details for analytics and security.
                            </span>

                            <span>
                                <span>Uploaded Documents:</span> Any bills or invoices you upload are stored securely to enable easy access across devices.
                            </span>

                            <span>
                                <span>Location Data:</span> Used to verify your business location and prevent fraud; collected only during active sessions.
                            </span>

                        </CustomOl>
                    </CustomLi>

                    <CustomLi>
                        <CustomPara2>Data Security and Ownership</CustomPara2>
                        <CustomSpan2>
                            Your data is securely stored, and you retain full ownership of all billing and transaction records. Nowit Services uses this
                            data only for providing and improving the service. We employ industry-standard security protocols, including encryption and firewall protections.
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
                            Initially as a free service, WONPlus Bills may send periodic notifications and promotional content to registered users, in accordance with our Terms.
                        </CustomSpan2>
                    </CustomLi>

                    <CustomLi>
                        <CustomPara2>Refund Policy</CustomPara2>
                        <CustomSpan2>
                            Since WONPlus Bills is a free web app, no fees or payments are required to access its features.
                            Therefore, there are no refunds applicable for the use of this service.
                        </CustomSpan2>
                    </CustomLi>

                    <CustomLi>
                        <CustomPara2>Future Paid Services</CustomPara2>
                        <CustomSpan2>
                            If any paid features are introduced in the future, a clear refund policy specific to those features will
                            be provided and communicated to users in advance.
                        </CustomSpan2>
                    </CustomLi>

                    <CustomLi>
                        <CustomPara2>Transaction Fees</CustomPara2>
                        <CustomSpan2>
                            Any transaction  charge per transaction are non-refundable, even in the case of cancellations or refunds of the main transaction.
                        </CustomSpan2>
                    </CustomLi>

                </CustomOl>

            </ModalMainContainer>

        </Modal>


    )
}

export default TermsAndConditions