import React, { Fragment, useEffect, useState } from 'react'
import {
    CButton, CCard,
    CCardBody, CCardHeader, CCol, CDataTable,
    CLink,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow
} from "@coreui/react";


const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(false)
    const [categoryId, setCategoryId] = useState()

    // Get all categories
    const getCategories = async () => {

        try {
            const response = await fetch("http://localhost:5000/categories");
            const jsonData = await response.json();
            setCategories(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    }

    // Delete category
    const deleteCategory = async (id) => {
        try {
            await fetch(`http://localhost:5000/categories/${id}`, {
                method: "DELETE"
            })
                .then(response => response.json())
                .then(response => {
                    if (!response.success) {
                        setShow(!show)
                        setCategoryId(id)
                    }
                });
            getCategories();
        } catch (err) {
            console.error(err.message)
        }
    }

    const deleteProductByCategoryId = async (id) => {
        await fetch(`http://localhost:5000/products/category/${id}`, {
            method: "DELETE"
        });
        deleteCategory(id);
        setShow(!show);
        setCategoryId();
    }
    useEffect(() => {
        getCategories();
    }, [])

    const fields = ['id', 'name', {
        key: 'edit',
        label: 'Action',
        _style: { width: '1%' },
        sorter: false
    }];

    return (
        <>
            <CRow>
                <CLink to='/categories/add'>
                    <CButton color="primary" size="lg" className="mb-2">
                        <span>+</span> Add
                    </CButton>
                </CLink>
            </CRow>
            <CRow>
                <CCol xs="12">
                    <CCard>
                        <CCardHeader>
                            All Categories
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={categories}
                                fields={fields}
                                tableFilter
                                sorter
                                striped
                                hover
                                border
                                itemsPerPageSelect
                                itemsPerPage={5}
                                pagination
                                scopedSlots={{
                                    'edit':
                                        (category) => {
                                            return (
                                                <td className="py-2 d-flex">
                                                    <CLink to={"/categories/edit/".concat(category.id)}>
                                                        <CButton color="warning"  size="sm">
                                                            Edit
                                                        </CButton>
                                                    </CLink>
                                                    <CButton color="danger"  size="sm" className="ml-1"
                                                        onClick={() => deleteCategory(category.id)}>
                                                        Delete
                                                    </CButton>
                                                    <CModal show={show} onClose={() => setShow(!show)} color="danger">
                                                        <CModalHeader closeButton>
                                                            <CModalTitle>ALERT</CModalTitle>
                                                        </CModalHeader>
                                                        <CModalBody>
                                                            This category has one or many product. If you delete it all attached products will be
                                                            deleted
                                                        </CModalBody>
                                                        <CModalFooter>
                                                            <CButton color="danger" onClick={() => deleteProductByCategoryId(categoryId)}>
                                                                DELETE
                                                            </CButton>{' '}
                                                            <CButton color="secondary" onClick={() => setShow(!show)}>
                                                                Cancel
                                                            </CButton>
                                                        </CModalFooter>
                                                    </CModal>
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

export default Categories
