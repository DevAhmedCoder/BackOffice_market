import React, { Fragment, useEffect, useState } from 'react'
import { HashRouter as Switch, Link } from 'react-router-dom';

const ListCategories = () => {

    const [categories, setCategories] = useState([]);

    // Get all categories
    const getCategories = async () => {

        try {
            const response = await fetch("http://localhost:5000/categories");
            const jsonData = await response.json();
            setCategories(jsonData);
        }
        catch (err) {
            console.error(err.message)
        }
    }

    // Delete category
    const deleteCategory = async (id) => {
        try {
            await fetch(`http://localhost:5000/categories/${id}`, {
                method: "DELETE"
            });
            getCategories();
        }
        catch (err) {
            console.error(err.message)
        }

    }

    useEffect(() => {
        getCategories();
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
                        <tr key={category.category_id} >
                            <td className="" >{category.category}</td>
                            <td>
                                <Link to={"/categories/edit/".concat(category.category_id)}>
                                    <button className="btn btn-warning">Edit</button>
                                </Link>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteCategory(category.category_id)}
                                >Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListCategories

{/*


*/}