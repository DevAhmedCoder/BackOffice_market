import React, { Fragment, useEffect, useState } from 'react'
import { HashRouter as Switch, Link } from 'react-router-dom';

const ListCategories = () => {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");

    // Show database 
    const getCategory = async () => {

        try {
            const response = await fetch("http://localhost:5000/categories");
            const jsonData = await response.json();
            setCategories(jsonData);
        }
        catch (err) {
            console.error(err.message);
            setError(err.message);
        }
    }

    // Delete Product
    const deleteCategory = async (id) => {

        try {
            await fetch(`http://localhost:5000/categories/${id}`, {
                method: "DELETE"
            });
            getCategory();
        }
        catch (err) {
            console.error(err.message)
        }

    }

    useEffect(() => {
        getCategory();
    }, [])


    return (
        <Fragment>
            <table className="table mt-2 text-center">
                <thead className="table-dark">
                    <tr>
                        <th>Category</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody className=" border-dark " >
                    {categories.map(category => (
                        <tr key={category.id} >
                            <td className="" >{category.category}</td>
                            <td>
                                <Link to={"/categories/edit/".concat(category.id)}>
                                    <button className="btn btn-warning">Edit</button>
                                </Link>
                            </td>

                            <td>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >Delete
                                </button>

                                <div className="modal fade" id="exampleModal"
                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Delete category</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                Are you sure you want to delete this category ?
                                             </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => deleteCategory(category.id)}
                                                    data-bs-dismiss="modal"
                                                >Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}
export default ListCategories;