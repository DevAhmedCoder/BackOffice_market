import React, { Fragment, useEffect, useState } from 'react'
import { HashRouter as Switch, Link } from 'react-router-dom';

const ListCategories = () => {

    const [categories, setCategories] = useState([]);

    // Show database 
    const getCategory = async () => {

        try {
            const response = await fetch("http://localhost:5000/categories");
            const jsonData = await response.json();
            setCategories(jsonData);
        }
        catch (err) {
            console.error(err.message)
        }
    }

    // Delete Product
    const deleteCategory = async (id) => {

        console.log(id);
        try {
            await fetch(`http://localhost:5000/categories/${id}`, {
                method: "DELETE"
            });
            setTimeout(() => { window.location = "/#/" }, 1);
            setTimeout(() => { window.location = "/#/categories" }, 2);
        }
        catch (err) {
            console.error(err.message)
        }

    }

    useEffect(() => {
        setTimeout(() => getCategory(), 1);
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
                    {categories.map(cat => (
                        <tr key={cat.category_id} >
                            <td className="" >{cat.category}</td>
                            <td>
                                <Link to={"/categories/edit/#".concat(cat.category_id)}>
                                    <button className="btn btn-warning">Edit</button>
                                </Link>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteCategory(cat.category_id)}
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