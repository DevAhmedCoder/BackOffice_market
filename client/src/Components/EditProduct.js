import React, { Fragment, useState } from 'react'

const EditProduct = ({ product }) => {

    const [product_ref, setProduct_ref] = useState(product.product_ref);
    const [product_name, setProduct_name] = useState(product.product_name);
    const [product_category, setProduct_category] = useState(product.product_category);

    // edit description 
    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            const body = { product_ref, product_name, product_category };
            await fetch(`http://localhost:5000/product/${product.product_ref}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/";
        }
        catch (err) { console.error(err.message); }
    }

    const handleClose = () => {
        setProduct_ref(product.product_ref);
        setProduct_name(product.product_name);
        setProduct_category(product.product_category);
    }

    return (
        <Fragment>
            {/* Button to Open the Modal */}
            <button type="button"
                className="btn btn-warning"
                data-toggle="modal"
                data-target={`#id${product.product_id}`}>
                Edit
            </button>

            {/* The Modal */}
            <div className="modal" id={`id${product.product_id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        {/* <!-- Modal Header --> */}
                        <div className="modal-header">
                            <h4 className="modal-title ">Edit Product</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div className="modal-body">
                            <input type="text"
                                className="form-control"
                                placeholder="Please put the Ref"
                                value={product_ref}
                                onChange={e => setProduct_ref(e.target.value)}
                            />
                            <input type="text"
                                className="form-control"
                                placeholder="Please put the name"
                                value={product_name}
                                onChange={e => setProduct_name(e.target.value)}
                            />
                            <input type="text"
                                className="form-control"
                                placeholder="Please put the category"
                                value={product_category}
                                onChange={e => setProduct_category(e.target.value)}
                            />
                        </div>

                        {/* <!-- Modal footer --> */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-dismiss="modal"
                                onClick={e => updateProduct(e)}
                            >Edit</button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={handleClose}
                            >Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditProduct
