// MODULE IMPORTS
import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import moment from 'moment-timezone';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';

// STYLE IMPORTS
import {
    MainContainer, ContentContainer, BodyDiv, Tile, CustomDiv, Label, Theme, Faq, Sol, Faqdiv, DeleteAccBtn
} from './StyledComponents';
import { Loader, ToggleSpan, ToggleLabel, CheckboxInputChecked, CheckboxWrapper } from '../DefaultData/StyledComponents';

// COMPONENT IMPORTS
import SideNav from '../SideNav/SideNav';
import Header from '../Header/Header';
import WonBillsContext from '../../../context/WonBillsContext';
import MyProfile from './MyProfile'
import ChangePassword from './ChangePassword'
import BusinessProfile from './BusinessProfile'
import BankAccountDetails from './BankAccountDetails'
import { savedToken } from '../DefaultData/DefaultData';
import InvoiceTemplates from './InvoiceTemplates'
import Invite from './Invite'

// ICON IMPORTS
import { MdExpandMore } from "react-icons/md";

const Settings = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const storedUserId = localStorage.getItem('userId');
    const { alerts, notifications, setAlerts, setNotifications, setTimezone, setSelecetdTemplate } = useContext(WonBillsContext);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        // const fetchData = async () => {
        //     const storedRates = localStorage.getItem('exchangeRates');
        //     const storedFetchTime = localStorage.getItem('lastFetchTime');
        //     const now = new Date();

        //     if (storedRates && storedFetchTime) {
        //         const lastFetch = new Date(storedFetchTime);
        //         const timeDiff = Math.abs(now - lastFetch) / (1000 * 60 * 60 * 24); // TIME DIFFERENCE IN DAYS

        //         if (timeDiff >= 1) {
        //             await fetchExchangeRates();
        //         } else {
        //             setExchangeRates(JSON.parse(storedRates));
        //         }
        //     } else {
        //         await fetchExchangeRates();
        //     }

        // };

        // fetchData();
        getUserData();
    }, []);

    // FUNCTION TO FETCH USER DATA
    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/user/${storedUserId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${savedToken}`
                }
            });
            const { alerts, notifications, timezone, selected_invoice } = data;
            setAlerts(alerts === 'true');
            setNotifications(notifications === 'true');
            setTimezone({
                value: timezone,
                label: `${timezone} (UTC${moment.tz(timezone).format('Z')})`,
            });
            setSelecetdTemplate(selected_invoice);
        } catch (error) {
            console.error(error);
        }
    };

    // FUNCTION TO FETCH ALERTS STATE FROM USERS TABLE
    const updateAlerts = async (newAlerts) => {
        const alertsAsString = newAlerts ? 'true' : 'false';
        const state = newAlerts ? 'Turned On' : 'Turned Off'
        try {
            const results = await axios.put(`${apiUrl}/update-alerts`, {
                userId: storedUserId,
                alerts: alertsAsString
            });
            enqueueSnackbar(`Alerts ${state}!`, { preventDuplicate: true, variant: 'success', autoHideDuration: 1000 })
            getUserData()
        } catch (error) {
            console.error('Error updating alerts:', error);
            enqueueSnackbar(`Error updating alerts`, { preventDuplicate: true, variant: 'error', autoHideDuration: 1000 })
        }
    };

    // FUNCTION TO FETCH NOTIFICATIONS STATE FROM USERS TABLE
    const updateNotifications = async (newNotify) => {
        const notifyAsString = newNotify ? 'true' : 'false';
        const state = newNotify ? 'Turned On' : 'Turned Off'
        try {
            const results = await axios.put(`${apiUrl}/update-notifications`, {
                userId: storedUserId,
                notify: notifyAsString
            });
            enqueueSnackbar(`Notifications ${state}!`, { preventDuplicate: true, variant: 'success', autoHideDuration: 1000 })
            getUserData()
        } catch (error) {
            console.error('Error updating notifications:', error);
            enqueueSnackbar(`Error updating notifications`, { preventDuplicate: true, variant: 'error', autoHideDuration: 1000 })
        }
    };

    // FUNCTION TO HANDLE ALERT TOGGLE
    const onToggleAlert = async () => {
        const newAlertsValue = !alerts;
        setAlerts(newAlertsValue);
        await updateAlerts(newAlertsValue);
    };

    // FUNCTION TO HANDLE NOTIFICATIONS TOGGLE
    const onToggleNotifications = async () => {
        const newNotificationValue = !notifications;
        setNotifications(newNotificationValue);
        await updateNotifications(newNotificationValue);
    };

    // FUNCTION TO UPDATE INVOICE TEMPLATE 
    const onChangeINV = async (id) => {
        try {
            const results = await axios.put(`${apiUrl}/update-invoice-template`, {
                userId: storedUserId,
                invoice: id
            });
            enqueueSnackbar(`invoice-template Updated successfully!`, { preventDuplicate: true, variant: 'success', autoHideDuration: 1000 })
            getUserData()
        } catch (error) {
            console.error('Error updating invoice-template:', error);
            enqueueSnackbar(`Error updating invoice-template`, { preventDuplicate: true, variant: 'error', autoHideDuration: 1000 })
        }
    }

    const onDeleteAccount = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to Delete Account?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
            customClass: {
                popup: 'swal2-popup',
                title: 'swal2-title',
                htmlContainer: 'swal2-html-container',
                confirmButton: 'swal2-confirm',
                cancelButton: 'swal2-cancel',
                icon: 'my-custom-icon',
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Send a request to deactivate the account
                    const response = await axios.put(`${apiUrl}/de-activate/account/${storedUserId}`);

                    if (response.status === 200) {
                        showNotification('Your account has been deactivated.', 'success');

                        // Remove the JWT token cookie
                        cookies.remove('WonBillsUserToken');

                        // Remove userId from localStorage
                        localStorage.removeItem('userId');

                        // Redirect to the login page
                        navigate("/login");
                    } else {
                        showNotification(response.data.message || 'Unable to deactivate account.', 'error');
                    }
                } catch (error) {
                    console.error('Error deleting account:', error);
                    showNotification('An error occurred while deactivating your account.', 'error');
                }
            }
        });
    };

    const showNotification = (message, variant) => {
        enqueueSnackbar(message, {
            preventDuplicate: true,
            variant: variant,
            autoHideDuration: 1000,
        });
    };


    return (
        <WonBillsContext.Consumer>
            {(values) => {
                const { alerts, notifications, } = values;


                return (
                    <MainContainer>
                        <Header />

                        <ContentContainer>
                            <SideNav />

                            <BodyDiv>
                                <MyProfile />

                                <ChangePassword />

                                <BusinessProfile />

                                <BankAccountDetails />

                                <ThemeProvider theme={Theme}>
                                    <Accordion sx={{ border: 'none', boxShadow: 'none', borderRadius: '1rem' }}>
                                        <AccordionSummary expandIcon={<MdExpandMore style={{ fontSize: '2rem' }} />}>
                                            <Typography>Alerts & Notifications </Typography>
                                        </AccordionSummary>

                                        {alerts === '' && notifications === '' ?
                                            <CustomDiv style={{ padding: '0', justifyContent: 'center', alignItems: 'center', height: '4rem' }}>
                                                <Loader />
                                            </CustomDiv>
                                            :
                                            <AccordionDetails>
                                                <CustomDiv>
                                                    <Tile style={{ width: '30%' }}>
                                                        <Label>Alerts</Label>
                                                        <CheckboxWrapper>
                                                            <CheckboxInputChecked id="cbx-alert" type="checkbox" checked={alerts} onChange={onToggleAlert} />
                                                            <ToggleLabel htmlFor="cbx-alert">
                                                                <ToggleSpan>
                                                                    <svg viewBox="0 0 10 10" height="10px" width="10px">
                                                                        <path d="M5,1 L5,1 C2.790861,1 1,2.790861 1,5 L1,5 C1,7.209139 2.790861,9 5,9 L5,9 C7.209139,9 9,7.209139 9,5 L9,5 C9,2.790861 7.209139,1 5,1 L5,9 L5,1 Z"></path>
                                                                    </svg>
                                                                </ToggleSpan>
                                                            </ToggleLabel>
                                                        </CheckboxWrapper>
                                                    </Tile>

                                                    <Tile style={{ width: '30%' }}>
                                                        <Label>Notifications</Label>

                                                        <CheckboxWrapper>
                                                            <CheckboxInputChecked id="cbx-noti" type="checkbox" checked={notifications} onChange={onToggleNotifications} />
                                                            <ToggleLabel htmlFor="cbx-noti">
                                                                <ToggleSpan>
                                                                    <svg viewBox="0 0 10 10" height="10px" width="10px">
                                                                        <path d="M5,1 L5,1 C2.790861,1 1,2.790861 1,5 L1,5 C1,7.209139 2.790861,9 5,9 L5,9 C7.209139,9 9,7.209139 9,5 L9,5 C9,2.790861 7.209139,1 5,1 L5,9 L5,1 Z"></path>
                                                                    </svg>
                                                                </ToggleSpan>
                                                            </ToggleLabel>
                                                        </CheckboxWrapper>

                                                    </Tile>

                                                </CustomDiv>
                                            </AccordionDetails>
                                        }

                                    </Accordion>
                                </ThemeProvider>

                                <InvoiceTemplates changeTemplate={onChangeINV} />

                                <Invite />

                                <ThemeProvider theme={Theme}>
                                    <Accordion sx={{ border: 'none', boxShadow: 'none', borderRadius: '1rem' }}>

                                        <AccordionSummary expandIcon={<MdExpandMore style={{ fontSize: '2rem' }} />}>
                                            <Typography>FAQ</Typography>
                                        </AccordionSummary>

                                        <AccordionDetails>
                                            <Faqdiv>
                                                <Faq>Does WON BILLS have a referral program?</Faq>
                                                <Sol>Yes! WON BILLS offers a referral program where you can earn rewards for referring new users. When someone you refer signs up and uses the app,
                                                    both you and the new user can benefit from exclusive discounts or bonuses.
                                                </Sol>
                                            </Faqdiv>

                                            <Faqdiv>
                                                <Faq>Can I include or exclude tax on my invoices in WON BILLS?</Faq>
                                                <Sol>Yes, WON BILLS provides the flexibility to both include and exclude tax on invoices. You can customise each invoice to reflect your specific tax
                                                    requirements, ensuring accurate billing for your clients.
                                                </Sol>
                                            </Faqdiv>

                                            <Faqdiv>
                                                <Faq>Can I schedule invoices with WON BILLS?</Faq>
                                                <Sol>
                                                    Yes! WON BILLS allows you to automate and schedule invoices, saving you time on repetitive tasks.
                                                </Sol>
                                            </Faqdiv>

                                            <Faqdiv>
                                                <Faq>Can I customise my invoices?</Faq>
                                                <Sol>
                                                    Yes! WON BILLS offers personalised invoice templates, allowing you to add your logo, branding, and specific details.
                                                </Sol>
                                            </Faqdiv>

                                            <Faqdiv>
                                                <Faq>Is customer data secure in WON BILLS?</Faq>
                                                <Sol>
                                                    Yes, customer data is protected with robust security measures, ensuring compliance with privacy regulations and safe data handling.
                                                </Sol>
                                            </Faqdiv>

                                            <Faqdiv>
                                                <Faq>Can clients pay directly through WON BILLS?</Faq>
                                                <Sol>
                                                    Yes, WON BILLS supports multiple payment methods, allowing clients to pay directly through the invoice payment link.
                                                </Sol>
                                            </Faqdiv>
                                        </AccordionDetails>

                                    </Accordion>
                                </ThemeProvider>

                                <ThemeProvider theme={Theme}>
                                    <Accordion sx={{ border: 'none', boxShadow: 'none', borderRadius: '1rem' }}>

                                        <AccordionSummary expandIcon={<MdExpandMore style={{ fontSize: '2rem' }} />}>
                                            <Typography>Contact Us</Typography>
                                        </AccordionSummary>

                                        <AccordionDetails>
                                            <span style={{ flexGrow: '0', minWidth: '15%', maxWidth: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                                contact.us@nowitservices.com
                                            </span>
                                        </AccordionDetails>

                                    </Accordion>
                                </ThemeProvider>

                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                    <DeleteAccBtn type="button" onClick={onDeleteAccount}>Delete Account</DeleteAccBtn>
                                </div>
                            </BodyDiv>

                        </ContentContainer>

                        <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />

                    </MainContainer>
                )
            }}
        </WonBillsContext.Consumer>
    );
};

export default Settings;