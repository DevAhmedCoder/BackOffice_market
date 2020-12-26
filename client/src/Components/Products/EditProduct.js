import React, { Fragment, useState, useEffect } from 'react'
import { HashRouter as Switch, Link } from 'react-router-dom'

const EditProduct = (props) => {
  
    const product_id = props.match.params.id;

    // init variable product un categories
    // first execution, before running anything else
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);

    // it will replaced inline on the input

    // const [product_ref, setProduct_ref] = useState("");
    // const [product_name, setProduct_name] = useState("");
    // const [category_id, setCategory_id] = useState("");
    // const [product_price, setProduct_price] = useState(0);
  

    // get product
    const getProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5000/product/${product_id}`);
            const jsonData = await response.json();
            setProduct(jsonData);
        }
        catch (err) {
            console.error(err.message)
        }
    }

    // get categories
    const getCategories = async () => {
        try {
            const response = await fetch("http://localhost:5000/categories")
                .then(response => response.json())
                .then(resJSON => setCategories(resJSON))
        }
        catch (err) {
            console.error(err.message)
        }
    }
  
    // running function that will be user
    useEffect(() => {
        getProduct();
        getCategories();
    }, [])

    // update product 
    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            const { product_ref, product_name, category_id, product_price } = product;
            const body = { product_ref, product_name, category_id, product_price };
            console.log(product_id);
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

                <label>Ref</label>
                <input type="text"
                    className="form-control mt-2"
                    placeholder="Please put the Ref"
                    required
                    defaultValue={product.product_ref}
                    onChange={e => setProduct({...product, product_ref:e.target.value})}
                />

                <label>Name</label>
                <input type="text"
                    className="form-control mt-2"
                    placeholder="Please put the name"
                    required
                    defaultValue={product.product_name}
                    onChange={e => setProduct({ ...product, product_name: e.target.value })}
                />

                <label>Category</label>
                <select className="form-select mt-2" required value={product.category_id}
                    onChange={(e) => setProduct({ ...product, category_id: e.target.value })}>
                    {categories.map(category => (
                        <option
                            key={category.category_id}
                            value={category.category_id} >
                            {category.category}
                        </option>
                    ))
                    }
                </select>

                <label>Price</label>
                <input type="text"
                    className="form-control mt-2"
                    placeholder="Please put the price"
                    required
                    defaultValue={product.product_price}
                    onChange={e => setProduct({ ...product, product_price: e.target.value })}
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
