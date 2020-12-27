import React, {useState} from 'react';
import {
    CAlert,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CFormText,
    CInput,
    CLabel, CLink, CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const InputClients = () => {

    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);

    // New client
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {first_name, last_name, email, age};
            fetch("http://localhost:5000/users",
                {
                    method: "POST",
                    headers: {"content-Type": "application/json"},
                    body: JSON.stringify(body)
                })
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        window.location = "/#/users"
                    } else {
                        setError(response.message);
                        setShow(true);
                    }
                });

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <CRow>
                <CCol xs="12">
                    <CAlert color="danger" show={show}>
                        {error}
                    </CAlert>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs="12">
                    <CCard>
                        <CCardHeader>
                            USER
                            <small> ADD</small>
                        </CCardHeader>
                        <CCardBody>
                            <CForm className="form-horizontal" onSubmit={onSubmitForm}>

                                {/*first name input*/}
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="first_name">First name</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="text" id="first_name" name="first_name"
                                                placeholder="Please put your first name"
                                                required
                                                value={first_name}
                                                onChange={e => setFirst_name(e.target.value)}/>
                                        <CFormText className="help-block">Please enter your first name</CFormText>
                                    </CCol>
                                </CFormGroup>

                                {/*last name input*/}
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="last_name">Last name</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="text" id="last_name" name="last_name"
                                                placeholder="Please put your last name"
                                                required
                                                value={last_name}
                                                onChange={e => setLast_name(e.target.value)}/>
                                        <CFormText className="help-block">Please enter your last name</CFormText>
                                    </CCol>
                                </CFormGroup>

                                {/*email input*/}
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="email">Email</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="email" id="email" name="email" placeholder="Please put your email"
                                                required
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}/>
                                        <CFormText className="help-block">Please enter your email</CFormText>
                                    </CCol>
                                </CFormGroup>

                                {/*age input*/}
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="age">Age</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="number" id="age" name="age" min="0" step="0.01"
                                                placeholder="Please put your age"
                                                required
                                                value={age}
                                                onChange={e => setAge(e.target.value)}/>
                                        <CFormText className="help-block">Please enter your age</CFormText>
                                    </CCol>
                                </CFormGroup>
                                <div className="float-right">
                                    <CButton type="submit" size="sm" color="success" className="mr-4">
                                        <CIcon name="cil-scrubber"/> Add</CButton>
                                    <CLink to='/users'>
                                        <CButton type="reset" size="sm" color="danger">
                                            <CIcon name="cil-ban"/>Cancel</CButton>
                                    </CLink>
                                </div>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default InputClients
