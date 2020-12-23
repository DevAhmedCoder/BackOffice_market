import React, { Fragment, useState } from 'react'

const InputProduct = () => {

    const [product_ref, setProduct_ref] = useState("");
    const [product_name, setProduct_name] = useState("");
    const [product_category, setProduct_category] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { product_ref, product_name, product_category };
            fetch("http://localhost:5000/product", {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(body)
            });
          
            window.location = "/";

        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <Fragment>
            <h1 className="text-center mt-5">Products List</h1>

            <form className="  p-3 m-5" onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label >Reference of product</label>
                    <input
                        type="text"
                        className="form-control"
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
                        className="form-control"
                        placeholder="Please put the Name"
                        required
                        value={product_name}
                        onChange={e => setProduct_name(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Category of product</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Please put the category"
                        required
                        value={product_category}
                        onChange={e => setProduct_category(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

export default InputProduct
