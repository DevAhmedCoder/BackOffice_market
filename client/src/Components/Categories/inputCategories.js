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

const InputCategories = () => {
    const [category, setCategory] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {category};
            fetch("http://localhost:5000/categories", {
                method: "POST",
                headers: {"content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            setTimeout(() => {
                window.location = "/#/categories"
            }, 50);

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
                                        value={category}
                                        onChange={e => setCategory(e.target.value)}/>
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
export default InputCategories
