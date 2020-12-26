import React from 'react'
import ListClients from './ListClients'
import {CButton, CLink} from "@coreui/react";

const Clients = () => {
    return (
        <div>
            <CLink to='/users/add'>
                <CButton color="primary" shape="pill" size="lg" className="mb-2">
                    <span>+</span> Add
                </CButton>
            </CLink>
            <ListClients/>
        </div>
    )
}

export default Clients
