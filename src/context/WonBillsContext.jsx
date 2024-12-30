import React from 'react'

const WonBillsContext = React.createContext({
    userID:'',
    companyName:'',
    activeTab:'Dashboard',
    pathText:'',
    alerts:false,
    notifications:false,
    timezone:'',
    selectedTemplate: '',
    profilePicture:'',
    isNavExpanded: false,
    businessLogo:'',

    setUserID: () => {},
    setCompanyName: () => {},
    setActiveTab: () => {},
    setPathText: () => {},
    setAlerts: () => {},
    setNotifications: () => {},
    setTimezone: () => {},
    setSelecetdTemplate: () => {},
    setProfilePicture: () => {},
    setNavExpanded: () => {},
    setBusinessLogo:() => {}
}) 

export default WonBillsContext