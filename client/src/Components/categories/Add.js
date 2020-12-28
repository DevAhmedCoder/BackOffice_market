import React, {useState} from 'react'
import {
    CForm,
    CFormGroup,
    CFormText,
    CInput,
    CLabel,
    CCol,
    CCard,
    CCardHeader,
    CCardBody, CButton, CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Add = () => {
    const [name, setName] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            fetch("http://localhost:5000/categories", {
                method: "POST",
                headers: {"content-Type": "application/json"},
                body: JSON.stringify({name})
            });
            window.location = "/#/categories";

        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <CCol xs="12">
            <CCard>
                <CCardHeader>
                    CATEGORY
                    <small> ADD</small>
                </CCardHeader>
                <CCardBody>
                    <CForm className="form-horizontal" onSubmit={onSubmitForm}>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="name">Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" id="name" name="name" placeholder="Please put the category"
                                        required
                                        value={name}
                                        onChange={e => setName(e.target.value)}/>
                                <CFormText className="help-block">Please enter your category name</CFormText>
                            </CCol>
                        </CFormGroup>
                        <CButton type="submit" size="sm" color="primary">
                            <CIcon name="cil-scrubber"/> Add</CButton>

                        <CLink to='/categories'>
                            <CButton type="reset" size="sm" color="danger">
                                Cancel</CButton>
                        </CLink>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    )
}
export default Add
