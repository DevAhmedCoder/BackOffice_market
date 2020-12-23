import React, { Fragment, useEffect, useState } from 'react'
import EditProduct from './EditProduct';


const ListProduct = () => {

    const [products, setProducts] = useState([])

    // Show database 
    const getProduct = async () => {
        try {
            const response = await fetch("http://localhost:5000/product");
            const jsonData = await response.json();
            setProducts(jsonData);
        }
        catch (err) {
            console.error(err.message)
        }
    }
    // Delete Product
    const deleteProduct = async (id) => {
        try {
            await fetch(`http://localhost:5000/product/${id}`, {
                method: "DELETE"
            });
            window.location = "/";
        }
        catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])


    return (
        <Fragment>
            <table className="table table-dark mt-5 text-center">
                <thead>
                    <tr>
                        <th>Reference</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(prod => (
                        <tr key={prod.product_id} >
                            <td>{prod.product_ref}</td>
                            <td>{prod.product_name}</td>
                            <td>{prod.product_category}</td>
                            <td><EditProduct product={prod} /></td>
                            <td>
                                <button className="btn btn-danger"
                                    onClick={() => deleteProduct(prod.product_id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListProduct
