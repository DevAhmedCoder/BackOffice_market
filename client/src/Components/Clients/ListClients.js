import React, {useEffect, useState} from 'react';
import {CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CLink, CRow} from "@coreui/react";

const ListClients = () => {
    const [clients, setClients] = useState([])
    // get users
    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/users")
                .then(response => response.json())
                .then(jsonData => setClients(jsonData));
        } catch (err) {
            console.error(err.message)
        }
    }
    // Delete user
    const deleteUser = async (id) => {
        try {
            await fetch(`http://localhost:5000/users/${id}`, {
                method: "DELETE"
            });
            getUsers()
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    const fields = ['user_id','first_name', 'last_name', 'age',
        {
            key: 'edit',
            label: '',
            _style: {width: '1%'},
            sorter: false,
            filter: false
        }]

    return (
        <>
            <CRow>
                <CCol xs="12">
                    <CCard>
                        <CCardHeader>
                            All Users
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={clients}
                                fields={fields}
                                tableFilter
                                // sorter
                                striped
                                hover
                                border
                                itemsPerPageSelect
                                itemsPerPage={10}
                                pagination
                                scopedSlots={{
                                    'edit':
                                        (client) => {
                                            return (
                                                <td className="py-2 d-flex">
                                                    <CLink to={"/users/edit/".concat(client.user_id)}>
                                                        <CButton color="primary" shape="pill" size="sm">
                                                            edit
                                                        </CButton>
                                                    </CLink>
                                                    <CButton color="danger" shape="pill" size="sm" className="ml-1"
                                                             onClick={() => deleteUser(client.user_id)}>
                                                        Delete
                                                    </CButton>
                                                </td>
                                            )
                                        }
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default ListClients
