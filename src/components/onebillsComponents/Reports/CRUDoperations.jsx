
// const apiUrl = import.meta.env.VITE_LOCAL_API_URL
const apiUrl = import.meta.env.VITE_API_URL
const vendorId = localStorage.getItem('userId')

// ------------------------------------------------------ to get all table names in DB ---------------------------------------
export const getAllTableNames = async () => {
    const url = `${apiUrl}/get-table-names`
    const options = {
        method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    return data
}

// ------------------------------------------------------ to get any tabel data ----------------------------------------------
export const getTableData = async (tableName) => {
    const url = `${apiUrl}/table/${tableName}/${vendorId}`
    const options = {
        method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    return data
}

// ------------------------------------------------------ to get column names of any table ------------------------------------
export const getTableColumnNames = async (tableName) => {
    console.log(tableName)
    const url = `${apiUrl}/table/columns/${tableName}`
    const options = {
        method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    return data
}


// ------------------------------------------------------ to create new record in any table -------------------------------------

export const createNewRecordInTable = async (recordData, tableName) => {
    console.log(recordData)
    try {
        const response = await fetch(`${apiUrl}/createRecord/${tableName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recordData)
        })
        const data = await response.json()
        console.log(response.ok)
        return data
    } catch (err) {
        console.log(err)
    }
}

// ---------------------------------------------------- to get any record data of any table -----------------------------------
export const getRecordData = async (tableName, recordId) => {
    const url = `${apiUrl}/record/${tableName}/${recordId}`
    const options = {
        method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    return data
}


// ------------------------------------------------------ to get generated report data -----------------------------------------------
export const getGeneratedReportData = async (data) => {
    // console.log(data)
    try {
        const url = `${apiUrl}/get/report-data/${vendorId}`
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(data)

        }
        const response = await fetch(url, options)
        const responseData = await response.json()
        // console.log(responseData)
        return responseData

    } catch (err) {
        console.error(err)
    }
}

export const getGugeReportsData = async (data, tableName) => {
    try {
        const url = `${apiUrl}/fetch/gauge-reports-data`
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dataColumns: data, tableName })
        }

        const response = await fetch(url, options)
        const fetchedData = await response.json()
        // console.log(fetchedData)
        return fetchedData
    } catch (e) {
        console.error(e)
    }
}

// =============================================== UPDATE ANY TABLE RECORDS =========================================
export const updateTableData = async (tableName, id, recordData) => {
    console.log(tableName, id, recordData)
    const url = `${apiUrl}/updateRecord/${tableName}/${id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recordData)
    }

    const response = await fetch(url, options)
    console.log(response.ok)
}


//============================================== get top reports data ============================================
// clients
export const getTopReportsData = async (tableName) => {
    try {
        const url = `${apiUrl}/get-top-reports/${tableName}/${vendorId}`
        const options = { method: 'GET' }

        const response = await fetch(url, options)
        const data = await response.json()
        // console.log(data)
        return data
    } catch (e) {
        console.error(e)
    }
}

// payments
export const getPaymentsTopReportsData = async () => {
    try {
        const url = `${apiUrl}/get-top-payments-reports/${vendorId}`
        const options = { method: 'GET' }

        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        return data
    } catch (e) {
        console.error(e)
    }
}

// =============================================== revenue count query =========================================
// /get-revenue-count
export const getPaymentsRevenueCount = async () => {
    // console.log('revenue count called')
    try {
        const url = `${apiUrl}/get-revenue-count`
        const options = { method: 'GET' }

        const response = await fetch(url, options)
        const data = await response.json()
        // console.log(data)
        return data
    } catch (e) {
        console.error(e)
    }
}