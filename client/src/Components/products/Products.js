import React, {Fragment, useEffect, useState} from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'

const Products = () => {
    const [products, setProducts] = useState([])

    // Show database
    const getProducts = async () => {
        try {
            const response = await fetch("http://localhost:5000/products");
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
            await fetch(`http://localhost:5000/products/${id}`, {
                method: "DELETE"
            });
            getProducts();
        }
        catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getProducts();

    }, [])
    return (
        <div>
            <Link to='/products/add' ><button type="button" className="btn btn-primary mt-5">+  Add</button></Link>
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
                    {products.map(product => (
                        <tr key={product.id} >
                            <td>{product.reference}</td>
                            <td>{product.name}</td>
                            <td>{product.category_name}</td>
                            <td>{product.price}</td>
                            <td>
                                <Link to={"/products/edit/".concat(product.id)}>
                                    <button className="btn btn-warning">Edit</button>
                                </Link>
                            </td>
                            <td>
                                <button className="btn btn-danger"
                                        onClick={() => deleteProduct(product.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Fragment>
        </div>
    )
}

export default Products
