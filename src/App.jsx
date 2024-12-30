// MODULE IMPORTS
import { useState, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

// STYLES IMPORT
import "bootstrap/dist/css/bootstrap.min.css";
// import './app.css'

// COMPONENT IMPORTS
import router from './router';
import WonBillsContext from './context/WonBillsContext';
// import { savedToken } from './components/ONEBILLS/DefaultData/DefaultData'
import { savedToken } from './components/onebillsComponents/DefaultData/DefaultData'

function App() {
  const cookies = new Cookies();
  const storedUserId = localStorage.getItem('userId');
  const apiUrl = import.meta.env.VITE_API_URL;
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [pathText, setPathText] = useState('')
  const [alerts, setAlerts] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const [userID, setUserID] = useState('')
  const [companyName, setCompanyName] = useState()
  const [timezone, setTimezone] = useState('')
  const [selectedTemplate, setSelecetdTemplate] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const [isNavExpanded, setNavExpanded] = useState(false)
  const [businessLogo, setBusinessLogo] = useState('')
  const PathText = location.pathname.split('/')

  useEffect(() => {
    setActiveTab(PathText[1]);
    getUserData();
  }, []);

  const getUserData = async () => {
    if (savedToken && storedUserId) {
      try {
        const result = await axios.get(`${apiUrl}/user/${storedUserId}`, {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${savedToken}`
          }
        });
        const Logo = result?.data?.company_logo?.image
        handleBusinessLogo(Logo)
        onCompanyNameChange(result?.data?.company_details?.company_name?.toUpperCase())

        setAlerts(result.data.alerts === 'true');
        setNotifications(result.data.notifications === 'true');
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Cookie not present, skipping API call.');
    }
  };

  const handleUser = (id) => {
    setUserID(id)
  }

  const onCompanyNameChange = (text) => {
    setCompanyName(text)
  }

  const onChangeTab = (tab) => {
    setActiveTab(tab)
  }

  const onChangePath = (Text) => {
    // setActiveTab(PathText)
    setPathText(Text)
  }

  const handleAlerts = (val) => {
    setAlerts(val)
  }

  const handleNotifications = (val) => {
    setNotifications(val)
  }

  const handleTimezoneChange = (val) => {
    setTimezone(val)
  }

  const handleINVChange = (val) => {
    setSelecetdTemplate(val)
  }

  const handleProfilePicture = (pic) => {
    setProfilePicture(pic)
  }

  const handleNavExpand = (val) => {
    setNavExpanded(val)
  }

  const handleBusinessLogo = (val) => {
    setBusinessLogo(val)
  }


  return (
    <WonBillsContext.Provider
      value={{
        userID,
        companyName,
        activeTab,
        pathText,
        alerts,
        notifications,
        timezone,
        selectedTemplate,
        profilePicture,
        isNavExpanded,
        businessLogo,

        setUserID: handleUser,
        setCompanyName: onCompanyNameChange,
        setActiveTab: onChangeTab,
        setPathText: onChangePath,
        setAlerts: handleAlerts,
        setNotifications: handleNotifications,
        setTimezone: handleTimezoneChange,
        setSelecetdTemplate: handleINVChange,
        setProfilePicture: handleProfilePicture,
        setNavExpanded: handleNavExpand,
        setBusinessLogo: handleBusinessLogo
      }}
    >
      <RouterProvider router={router} />
    </WonBillsContext.Provider>

  )
}

export default App
