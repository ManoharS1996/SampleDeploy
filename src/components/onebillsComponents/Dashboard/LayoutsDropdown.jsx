import Dropdown from 'react-bootstrap/Dropdown';
import Swal from 'sweetalert2';

import { useEffect, useRef, useState } from 'react';
import { defaultDashboardLayouts } from '../../../assets/DefaultDashboardLayouts/DefaultLayouts';
import { AddNewDashboardLayoutBtn, CustomText, TitleInput, DeleteLayoutBtn } from './StyledComponents';
import { updateTableData } from '../Reports/CRUDoperations';

import { TiDelete } from "react-icons/ti";

function LayoutsDropdown({ selectedLayout, setLayout, allLayouts, setAllLayouts, getDefaultLayouts }) {
    const [addingNewLayout, setAddnewLayout] = useState(false);
    const inputRef = useRef(null)

    // Focus the input when it becomes visible
    useEffect(() => {
        if (addingNewLayout && inputRef.current) {
            inputRef.current.focus();
        }
    }, [addingNewLayout]);

    const switchingScreen = () => {
        let timerInterval;
        Swal.fire({
            title: "Switching Dashboard!",
            html: "Switching in <b></b> ms.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                // console.log("I was closed by the timer");
            }
        });
    }

    const switchLayout = async (layout) => {
        setLayout(layout)
        localStorage.setItem('myGridLayout', JSON.stringify(layout))
        const userId = JSON.parse(localStorage.getItem('userId'))

        await updateTableData('users', userId, { selected_layout: layout.id })
        getDefaultLayouts()
        switchingScreen()
    }

    const onAddNewDashboardLayout = async (e) => {
        if (e.key === 'Enter') {
            const userId = JSON.parse(localStorage.getItem('userId'))
            await updateTableData('users', userId, {
                dashboard_layouts: [...allLayouts, { id: allLayouts.length + 1, name: e.target.value, layouts: defaultDashboardLayouts[0].layouts }]
            })
            setAddnewLayout(false)
            setAllLayouts([...allLayouts, { id: allLayouts.length + 1, name: e.target.value, layouts: defaultDashboardLayouts[0].layouts }])
            getDefaultLayouts()
        }

    }

    const onDeleteLayout = async (layoutId) => {
        const userid = JSON.parse(localStorage.getItem('userId'))
        await updateTableData('users', userid, {
            dashboard_layouts: allLayouts.filter(layout => layout.id !== layoutId),
            selected_layout: allLayouts.length > 0 && selectedLayout.id === layoutId ? allLayouts[0].id : selectedLayout.id
        })

        getDefaultLayouts()
    }
    // console.log(JSON.stringify(defaultDashboardLayouts))

    return (
        <Dropdown style={{ zIndex: '1000', padding: '0' }}>
            <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="custom-dropdown-toggle z-0 "
                style={{
                    padding: '0',
                    backgroundColor: 'transparent',
                    color: '#000',
                    border: 'none',
                }}
            >
                {selectedLayout.name}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ padding: '5px' }}>
                {allLayouts && allLayouts.map(dashboard =>
                    <Dropdown.Item
                        className='bootstrap_dropdown_menu_item'
                        key={dashboard.id}
                        style={{
                            borderBottom: '1px solid #e9ecef',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span onClick={() => switchLayout(dashboard)}>{dashboard.name}</span>

                        {/* <DeleteLayoutBtn type='button' title='Delete Layout'>
                            <TiDelete onClick={() => onDeleteLayout(dashboard.id)} />

                        </DeleteLayoutBtn> */}
                    </Dropdown.Item>
                )}

                {/* {allLayouts.length < 5 &&
                    <AddNewDashboardLayoutBtn
                        type='button'
                        title='You can add upto 6 Dashboard layouts'
                    >
                        {addingNewLayout ?
                            <TitleInput
                                type='text'
                                placeholder='Enter Dashboard Name'
                                onKeyDown={onAddNewDashboardLayout}
                                ref={inputRef}
                            /> :

                            <CustomText
                                onClick={() => setAddnewLayout(true)}
                            >
                                + Add New Layout
                            </CustomText>
                        }
                    </AddNewDashboardLayoutBtn>} */}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default LayoutsDropdown;