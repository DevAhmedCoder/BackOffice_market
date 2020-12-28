import React, { Fragment, useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'

const Add = () => {

    const [reference, setReference] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category_id, setCategory_id] = useState("");
    const [categories, setCategories] = useState([]);
  
    // New product
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            fetch("http://localhost:5000/products", {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify({ reference, name, category_id, price })
            });
            window.location = "/#/products";

        } catch (err) {
            console.error(err.message);
        }
    }

    // Categories list
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

    useEffect(() => {
        getCategories()
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
                        value={reference}
                        onChange={e => setReference(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Name of product</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Please put the Name"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Category of product</label>

                    <select className="form-select"
                        aria-label="Default select example"
                        required
                        onChange={(e) => setCategory_id(e.target.value)} 
                    >
                        <option selected disabled value="">Open this select menu</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id} >{category.name}</option>

                        ))}
                    </select>

                </div>
                <div className="form-group">
                    <label>Price of product</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="form-control mb-2"
                        placeholder="Please put the price"
                        required
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <button type="submit" className="mt-2 btn btn-success">Save</button>
            </form>
        </Fragment>
    )
}

export default Add
