import { useContext, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import Modal from 'react-modal';
import { MdExpandMore } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import WonBillsContext from '../../../context/WonBillsContext';

// STYLE IMPORTS
import {
    Templates, Template, CustomDiv, Theme, SpanTag,
} from './StyledComponents';

import { Loader } from '../DefaultData/StyledComponents';

const modalStyles = {
    width: '25rem',
    height: '70%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    right: 'auto',
    borderRadius: '1rem',
    overflow: 'auto',
    padding: '0.6rem',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
    border: 'none',
};

const templateImages = {
    'template-1': '/template-1.png',
    'template-2': '/template-1.png',
    'template-3': '/template-1.png',
};

const InvoiceTemplates = ({ changeTemplate }) => {
    const { selectedTemplate } = useContext(WonBillsContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [presentTemplate, setPresentTemplate] = useState('')

    const handleTemplateChange = (id) => {
        changeTemplate(id);
    };

    const openModal = (templateId) => {
        setPresentTemplate(templateId);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const PopUpModal = () => (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Template Modal"
            style={{
                overlay: { zIndex: 1000, background: 'rgba(0,0,0,0.5)' },
                content: modalStyles,
            }}
        >
            <Template style={{ backgroundImage: `url(${templateImages[presentTemplate]})`, backgroundSize: 'contain', height: '100%', width: '100%' }} />
        </Modal>
    );

    return (
        <ThemeProvider theme={Theme}>
            <Accordion sx={{ border: 'none', boxShadow: 'none', borderRadius: '1rem' }}>
                <AccordionSummary expandIcon={<MdExpandMore style={{ fontSize: '2rem' }} />}>
                    <Typography>Invoice Templates</Typography>
                </AccordionSummary>

                {isModalOpen && PopUpModal()}

                {!selectedTemplate ? (
                    <CustomDiv style={{ padding: 0, justifyContent: 'center', alignItems: 'center', height: '4rem' }}>
                        <Loader />
                    </CustomDiv>
                ) : (
                    <AccordionDetails>
                        <CustomDiv style={{ padding: 0 }}>
                            <Templates>
                                {Object.keys(templateImages).map((templateId) => (
                                    <Template
                                        key={templateId}
                                        activeTemplate={selectedTemplate === templateId}
                                        style={{
                                            backgroundImage: `url(${templateImages[templateId]})`,
                                            backgroundSize: 'contain',
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openModal(templateId);
                                        }}
                                    >
                                        <SpanTag
                                            type="button"
                                            id={templateId}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleTemplateChange(templateId);
                                            }}
                                            activeTemplate={selectedTemplate === templateId}
                                        >
                                            <RiVerifiedBadgeFill />
                                        </SpanTag>
                                    </Template>
                                ))}
                            </Templates>

                        </CustomDiv>

                    </AccordionDetails>
                )}
            </Accordion>
        </ThemeProvider>
    );
};

export default InvoiceTemplates;
