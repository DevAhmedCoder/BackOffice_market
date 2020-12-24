import React, { Fragment, useState, useEffect } from 'react'
import { HashRouter as Switch, Link } from 'react-router-dom'

const EditProduct = (props) => {

    const { hash } = props.location;

    const product_id = hash.substring(1);

    const [product, setproduct] = useState("");

    // Show product
    const getProduct = async () => {

        try {
            const response = await fetch(`http://localhost:5000/product/${product_id}`);
            const jsonData = await response.json();
            setproduct(jsonData);

        }
        catch (err) {
            console.error(err.message)
        }
    }
   

    const [product_ref, setProduct_ref] = useState("");
    const [product_name, setProduct_name] = useState("");
    const [product_category, setProduct_category] = useState("");
    const [product_price, setProduct_price] = useState();
    const [categories, setCategories] = useState([]);

    // Categories list
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
  
    useEffect(() => {
        getCategory();
        getProduct();
    }, [])

    // edit description 
    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            const body = { product_ref, product_name, product_category, product_price };
            await fetch(`http://localhost:5000/product/${product_id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/#/products";
        }
        catch (err) { console.error(err.message); }
    }




    return (
        <Fragment>
            <div className="mt-2 p-5">

                <h4 className="text-center mb-5">Edit Product</h4>

                <label>Ref: {product.product_ref}</label>
                <input type="text"
                    className="form-control mt-2"
                    placeholder="Please put the Ref"
                    required
                    value={product_ref}
                    onChange={e => setProduct_ref(e.target.value)}
                />

                <label>Name: {product.product_name}</label>
                <input type="text"
                    className="form-control mt-2"
                    placeholder="Please put the name"
                    required
                    value={product_name}
                    onChange={e => setProduct_name(e.target.value)}
                />
                <label>Category: {product.product_category}</label>
                <select
                    className="form-select mt-2"
                    aria-label="Default select example"
                    required
                    onChange={(e) => setProduct_category(e.target.value)}>
                    
                    <option selected disabled value="">Open this select menu</option>
                    {categories.map(category => (
                        <option key={category.category_id} value={category.category} >{category.category}</option>

                    ))}
                </select>
            
            <label>Price: {product.product_price}</label>
                <input type="text"
                    className="form-control mt-2"
                    placeholder="Please put the price"
                    required
                    value={product_price}
                    onChange={e => setProduct_price(e.target.value)}
                />


                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={e => updateProduct(e)}
                    >Save</button>

                    <Link to="/clients" ><button
                        type="button"
                        className="btn btn-danger"
                    >Close</button></Link>
                </div>

            </div>
        </Fragment>
    )
}

export default EditProduct
