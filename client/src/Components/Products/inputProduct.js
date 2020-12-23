import React, { Fragment, useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'

const InputProduct = () => {

    const [product_ref, setProduct_ref] = useState("");
    const [product_name, setProduct_name] = useState("");
    const [product_price, setProduct_price] = useState("");
    const [product_category, setProduct_category] = useState("");
    const [categories, setCategories] = useState([]);

    // New product
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { product_ref, product_name, product_category, product_price };
            fetch("http://localhost:5000/product", {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/#/products";

        } catch (err) {
            console.error(err.message);
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
        getCategory()
    }, [])


    return (
        <Fragment>
            <h1 className="text-center mt-5">New product</h1>

            <form className="  p-3 m-5" onSubmit={onSubmitForm}>
                <div className="">
                    <label >Reference of product</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Please put the Ref"
                        required
                        value={product_ref}
                        onChange={e => setProduct_ref(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Name of product</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Please put the Name"
                        required
                        value={product_name}
                        onChange={e => setProduct_name(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Category of product</label>

                    <select
                        className="form-select"
                        aria-label="Default select example"
                        required
                        onChange={(e) => setProduct_category(e.target.value)} 
                    >
                        <option selected disabled value="">Open this select menu</option>
                        {categories.map(category => (
                            <option  key={category.category_id} value={category.category} >{category.category}</option>

                        ))}
                    </select>

                </div>
                <div className="form-group">
                    <label>Price of product</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Please put the price"
                        required
                        value={product_price}
                        onChange={e => setProduct_price(e.target.value)}
                    />
                </div>
                <button type="submit" className="mt-2 btn btn-success">Save</button>
            </form>
        </Fragment>
    )
}

export default InputProduct
