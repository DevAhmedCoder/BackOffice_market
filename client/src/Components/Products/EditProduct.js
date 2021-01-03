import React, { Fragment, useState, useEffect } from 'react'
import { HashRouter as Switch, Link } from 'react-router-dom'

const EditProduct = (props) => {
  
    const product_id = props.match.params.id;
    
    const [product, setproduct] = useState("");

    const [product_ref, setProduct_ref] = useState("");
    const [product_name, setProduct_name] = useState("");
    const [category_id, setCategory_id] = useState("");
    const [product_price, setProduct_price] = useState();
    const [categories, setCategories] = useState([]);
    
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
        // console.log(product)
        setCategory_id(product.category_id);
    }, [])

    // edit description 
    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            console.log(category_id == "");
            const body = {product_ref, product_name, category_id, product_price };
            console.log(category_id);
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
                <label>Category: {product.category}</label>
                <select
                    className="form-select mt-2"
                    required
                    defaultValue={product.category_id}
                    onChange={(e) => setCategory_id(e.target.value)}>
                
                    {categories.map(category => (
                        <option
                            key={category.category_id}
                            selected={category.category_id == product.category_id}
                            value={category.category_id} >
                            {category.category}
                        </option>
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
