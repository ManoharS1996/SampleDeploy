// MODULE IMPORTS
import { createBrowserRouter } from "react-router-dom";

// COMPONENT IMPORTS
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Login from './components/onebillsComponents/SignIn/Login'
import CreateAccount from "./components/onebillsComponents/SignIn/CreateAccount/CreateAccount"
import Dashboard from "./components/onebillsComponents/Dashboard/Dashboard";
import Clients from "./components/onebillsComponents/Clients/Clients";
import Products from "./components/onebillsComponents/Products/Products";
import Invoices from "./components/onebillsComponents/Invoices/Invoices";
import Payments from "./components/onebillsComponents/Payments/Payments";
import Profile from "./components/onebillsComponents/Profile/Profile";
import CreateClient from "./components/onebillsComponents/Clients/CreateClient/CreateClient";
import CreateInvoice from "./components/onebillsComponents/Invoices/CreateInvoice/CreateInvoice";
import CreateProduct from "./components/onebillsComponents/Products/CreateProduct/CreateProduct";
import CreatePayment from "./components/onebillsComponents/Payments/CreatePayment/CreatePayment";
import ClientDetailView from "./components/onebillsComponents/Clients/CreateClient/ClientDetailView";
import InvoiceDetailView from "./components/onebillsComponents/Invoices/CreateInvoice/InvoiceDetailView";
import ProductDetailView from "./components/onebillsComponents/Products/CreateProduct/ProductDetailView";
import PaymentDetailView from "./components/onebillsComponents/Payments/CreatePayment/PaymentDetailView";
import Settings from "./components/onebillsComponents/Settings/Settings";
import Imageupload from "./components/onebillsComponents/Dummy/Dummy3";
import ImageUploader2 from "./components/onebillsComponents/Dummy/Dummy4";
import DateTimetwo from "./components/onebillsComponents/Dummy/Dummy5";
import ChangePassword from "./components/onebillsComponents/SignIn/CreateAccount/ChangePassword";

import ReportCardSelection from "./components/onebillsComponents/Reports/ReportCardSelection";
import AllReports from "./components/onebillsComponents/Reports/AllReports/AllReports";

import Payment from "./components/onebillsComponents/Dummy/Payment";
import Razorpay from "./components/onebillsComponents/Dummy/RazorPay";
import PaymentRequest from "./components/onebillsComponents/Dummy/Razorpay2";
import PaymentPage3 from "./components/onebillsComponents/Dummy/Razorpay3";
import PaymentRequestForm from "./components/onebillsComponents/Dummy/Razorpay4";

import TermsAndConditions from "./components/onebillsComponents/MyCompany/TermsAndConditions";

import LandingPage2 from "./components/onebillsComponents/SignIn/LandingPage/LandingPage2";
import Terms from "./components/onebillsComponents/SignIn/LandingPage/Terms";
import Dummy from "./components/onebillsComponents/Dummy/Dummy";
import PDF2 from "./components/onebillsComponents/PDFTemplates/PDF2";
import TestTemplate1 from "./components/onebillsComponents/PDFTemplates/TestTemplate1";
import TestTemplate2 from "./components/onebillsComponents/PDFTemplates/PDfTemplate2";

import MfaSetup from './components/onebillsComponents/SignIn/MFA/pages/MfaSetup'
import OtpMfa from './components/onebillsComponents/SignIn/MFA/pages/OtpMfa'
import PasskeyMfa from './components/onebillsComponents/SignIn/MFA/pages/PasskeyMfa'

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage2 />,
        index: true,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/OtpMfa",
        element: <OtpMfa />,
    },
    {
        path: "/PasskeyMfa",
        element: <PasskeyMfa />,
    },
    {
        path: "/MfaSetup/:userId",
        element: <MfaSetup />,
    },
    {
        path: "/CreateAccount",
        element: <CreateAccount />,
    },
    {
        path: "/ChangePassword",
        element: <ChangePassword />,
    },
    {
        path: "/PaymentPage3/:orderId",
        element: <PaymentPage3 />,
    },
    {
        path: "/PaymentRequestForm",
        element: <PaymentRequestForm />,
    },
    {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
    },
    {
        path: "/terms",
        element: <Terms />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/Dashboard",
                element: <Dashboard />,
            },
            {
                path: "/Clients",
                element: <Clients />,
            },
            {
                path: "/Items",
                element: <Products />,
            },
            {
                path: "/Invoices",
                element: <Invoices />,
            },
            {
                path: "/Purchases",
                element: <Payments />,
            },
            {
                path: "/Profile",
                element: <Profile />,
            },
            {
                path: "/Clients/Create-Client",
                element: <CreateClient />,
            },
            {
                path: "/Clients/:id",
                element: <ClientDetailView />,
            },
            {
                path: "/Invoices/Create-Invoice",
                element: <CreateInvoice />,
            },
            {
                path: "/Invoices/:id",
                element: <InvoiceDetailView />,
            },
            {
                path: "/Items/Create-Item",
                element: <CreateProduct />,
            },
            {
                path: "/Items/:id",
                element: <ProductDetailView />,
            },
            {
                path: "/Purchases/Create-Purchase",
                element: <CreatePayment />,
            },
            {
                path: "/Purchases/:id",
                element: <PaymentDetailView />,
            },

            {
                path: "/Settings",
                element: <Settings />,
            },
            {
                path: "/Dummy1",
                element: <Dummy />,
            },
            {
                path: "/Dummy3",
                element: <Imageupload />,
            },
            {
                path: "/Dummy4",
                element: <ImageUploader2 />,
            },
            {
                path: "/dummy5",
                element: <DateTimetwo />,
            },
            {
                path: "/create-reports",
                element: <ReportCardSelection />,
            },
            {
                path: "/all-reports",
                element: <AllReports />,
            },
            {
                path: "/Payment",
                element: <Payment />,
            },
            {
                path: "/Razorpay",
                element: <Razorpay />,
            },
            {
                path: "/PaymentRequest",
                element: <PaymentRequest />,
            },
            {
                path: "/PDF2",
                element: <PDF2 />,
            },
            {
                path: "/TestTemplate1",
                element: <TestTemplate1 />,
            },
            {
                path: "/TestTemplate2",
                element: <TestTemplate2 />,
            },
        ],
    },
]);

export default router;
