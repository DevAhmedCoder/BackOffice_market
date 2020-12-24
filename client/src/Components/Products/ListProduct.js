import React, { Fragment, useEffect, useState } from 'react';
import { HashRouter as Switch, Link } from 'react-router-dom';



const ListProduct = () => {

    const [products, setProducts] = useState([])

    // Show database 
    const getProduct = async () => {
        try {
            const response = await fetch("http://localhost:5000/product");
            const jsonData = await response.json();
            setProducts(jsonData);
            console.log(products);
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
            window.location.reload();
        }
        catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getProduct();
     
    }, [])


    return (
        <Fragment>
            <table className="table  mt-5 text-center">
                <thead>
                    <tr className="table-dark" >
                        <th>Reference</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody className=" border-dark "  >
                    {products.map(prod => (
                        <tr key={prod.product_id} >
                            <td>{prod.product_ref}</td>
                            <td>{prod.product_name}</td>
                            <td>{prod.product_category}</td>
                            <td>{prod.product_price}</td>
                            <td>
                                <Link to={"/products/edit/#".concat(prod.product_id)}>
                                    <button className="btn btn-warning">Edit</button>
                                </Link>
                            </td>
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
