import CIcon from '@coreui/icons-react';
import { CAlert, CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm, CFormGroup, CFormText, CInput, CLabel, CLink } from '@coreui/react';
import React, { Fragment, useState, useEffect } from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Edit = (props) => {

    const category_id = props.match.params.id;
    const [category, setCategory] = useState('');
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");

    // Get category
    const getCategory = async () => {

        try {
            const response = await fetch(`http://localhost:5000/categories/${category_id}`)
                .then(response => response.json())
                .then(jsonData => setCategory(jsonData));
        }
        catch (err) {
            console.error(err.message)
        }
    }

    // update category
    const updateCategory = async (e) => {
        e.preventDefault();
        try {

            fetch(`http://localhost:5000/categories/${category_id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(category)
            }).then(
                response => response.json()
            )
                .then(
                    json => {
                        if (json.success) {
                            window.location = "/#/categories"
                        } else {
                            setError(json.message);
                            setShow(true);
                        }
                    }
                )


        }
        catch (err) { console.error(err.message); }
    }

    useEffect(() => {
        getCategory();
    }, [])

    return (
        <>
            <CCol xs="12">
                <CAlert color="danger" show={show}>
                    {error}
                </CAlert>
            </CCol>
            <CCard>
                <CCardHeader >
                    Edit Category
                </CCardHeader>

                <CCardBody >
                    <CForm className="form-horizontal" onSubmit={updateCategory}>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="hf-category">Category name</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput
                                    defaultValue={category.name}
                                    onChange={e => setCategory({ ...category, name: e.target.value })}
                                    type="text"
                                    id="hf-category"
                                    name="hf-email"
                                    placeholder="Enter Category..."
                                />
                                <CFormText className="help-block">Please enter the category name</CFormText>
                            </CCol>
                        </CFormGroup>
                        <CButton
                            type="submit"
                            size="sm"
                            color="success"
                        >
                            <CIcon
                                name="cil-scrubber"

                            /> Save
                        </CButton>
                        <CLink to="/categories" ><CButton
                            type="reset"
                            size="sm"
                            color="danger"
                        ><CIcon
                                name="cil-ban" />
                             Cancel
                             </CButton></CLink>
                    </CForm>
                </CCardBody>
            </CCard>
            {/* 
            <Fragment>
                <div className="mt-5 p-5">
                    <h4 >Edit Category</h4>
                    <div >
                        <input type="text"
                            className="form-control"
                            placeholder="Please put the category"
                            defaultValue={category.category}
                            onChange={e => setCategory({ ...category, category: e.target.value })}
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={e => updateCategory(e)}
                        >Save</button>

                        <Link to="/categories" ><button
                            type="button"
                            className="btn btn-danger"
                        >Close</button></Link>
                    </div>
                </div>
            </Fragment> */}
        </>
    )
}
export default Edit
