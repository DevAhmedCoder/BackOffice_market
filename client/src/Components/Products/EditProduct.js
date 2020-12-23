import React, { Fragment, useState, useEffect } from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'

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
console.log(product.product_ref);

    const [product_ref, setProduct_ref] = useState(product.product_ref);
    const [product_name, setProduct_name] = useState(product.product_name);
    const [product_category, setProduct_category] = useState(product.product_category);
    const [product_price, setProduct_price] = useState(product.product_price);
   

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
    const [categories, setCategories] = useState();
  

    // edit description 
    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            const body = { product_ref, product_name, product_category, product_price };
            await fetch(`http://localhost:5000/product/${product.product_ref}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/";
        }
        catch (err) { console.error(err.message); }
    }
    useEffect(() => {
        getCategory();
        getProduct();
    }, [])

console.log(product_ref);

    return (
        <Fragment>
            <div className="mt-2 p-5">

                <h4 className="text-center mb-5">Edit Product</h4>

                <input type="text"
                    className="form-control mt-2"
                    placeholder="Please put the Ref"
                    required
                    value={product_ref}
                    onChange={e => setProduct_ref(e.target.value)}
                />
                <input type="text"
                    className="form-control mt-2"
                    placeholder="Please put the name"
                    required
                    value={product_name}
                    onChange={e => setProduct_name(e.target.value)}
                />
{/* 
                <select
                    className="form-select"
                    aria-label="Default select example"
                    required
                    value={product_category}
                    onChange={(e) => setProduct_category(e.target.value)}
                >
                 <option  disabled>Open this select menu</option>
                    {categories.map(category => (
                        <option key={category.category_id} value={category.category} >
                        {category.category}
                        </option>
                    ))
                    }
                </select> */}

                <input type="text"
                    className="form-control mt-2"
                    placeholder="Please put the Email address"
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
