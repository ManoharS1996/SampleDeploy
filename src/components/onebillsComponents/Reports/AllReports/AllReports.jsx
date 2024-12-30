

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import Header from "../../Header/Header"
import SideNav from "../../SideNav/SideNav"

import { MainContainer, ContentContainer } from "../ReportsStyledComponents"
import { useEffect, useState } from 'react';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const paginationModel = { page: 0, pageSize: 5 };

export default function AllReports() {
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        const getReportsData = async () => {
            const url = `${import.meta.env.VITE_API_URL}/table/reports`
            const options = {
                method: 'GET',
            }
            const response = await fetch(url, options)
            const data = await response.json()
            // console.log(data)
            setTableData(data.reports)
        }
        getReportsData()
    }, [])

    const convertedNames = (name) => {
        const nameArr = name.split('_')
        const convertedName = nameArr.map((item,) => item[0].toUpperCase() + item.slice(1))
        return (convertedName.join(' '))
    }

    const convertedColumns = tableData?.length > 0 ?
        Object.keys(tableData[0]).map((column, index) => {
            return {
                field: column,
                headerName: convertedNames(column),
                minWidth: column.split('').length * 2
            }
        }) : []

    const convertedRows = tableData?.length > 0 ? tableData.map(obj => {
        // For each object in the array
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => {
                // Convert non-string values to strings
                return [key, typeof value !== 'string' ? String(value) : value];
            })
        );
    }) : []

    function findKeyWithId(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && key.toLowerCase().includes('id')) {
                // console.log(key)
                return key;
            }
        }
        return null;  // Return null if no key contains 'id'
    }

    // console.log(tableData)

    return (
        <MainContainer>
            <SideNav />

            <ContentContainer>
                <Header />

                <Paper sx={{ height: 700, width: '100%' }}>
                    <DataGrid
                        rows={convertedRows}
                        columns={convertedColumns}
                        getRowId={(row) => row[findKeyWithId(row)]}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        sx={{ border: 0 }}
                    />
                </Paper>
            </ContentContainer>
        </MainContainer>
    )
}
