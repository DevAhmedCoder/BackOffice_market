import React, {useState, useEffect} from 'react';
import {
    CAlert, CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CFormText,
    CInput,
    CLabel, CLink,
    CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const EditClients = (props) => {

    const user_id = props.match.params.id;

    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);

    // Show user
    const getUser = async () => {
        try {
            const response = await fetch(`http://localhost:5000/users/${user_id}`)
                .then(response => response.json())
                .then(jsonData => setUser(jsonData[0]));
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    // edit description 
    const updateUser = async (e) => {
        e.preventDefault();
        try {
            fetch(`http://localhost:5000/users/${user_id}`,
                {
                    method: "PUT",
                    headers: {"content-type": "application/json"},
                    body: JSON.stringify(user)
                })
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        window.location = "/#/users"
                    } else {
                        setError(response.message);
                        setShow(true);
                    }
                })
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
                            <CForm className="form-horizontal" onSubmit={updateUser}>

                                {/*first name input*/}
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="first_name">First name</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="text" id="first_name" name="first_name"
                                                placeholder="Please put your first name"
                                                required
                                                defaultValue={user.first_name}
                                                onChange={e => setUser({...user, first_name: e.target.value})}/>
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
                                                defaultValue={user.last_name}
                                                onChange={e => setUser({...user, last_name: e.target.value})}/>
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
                                                defaultValue={user.email}
                                                onChange={e => setUser({...user, email: e.target.value})}/>
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
                                                defaultValue={user.age}
                                                onChange={e => setUser({...user, age: e.target.value})}/>
                                        <CFormText className="help-block">Please enter your age</CFormText>
                                    </CCol>
                                </CFormGroup>
                                <div className="float-right">
                                    <CButton type="submit" size="sm" color="success" className="mr-4">
                                        <CIcon name="cil-scrubber"/> Save</CButton>
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
export default EditClients
