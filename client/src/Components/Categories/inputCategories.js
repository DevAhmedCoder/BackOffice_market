import React, { Fragment, useState } from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

const InputCategories = () => {

    const [category, setCategory] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { category };
            fetch("http://localhost:5000/categories", {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            setTimeout(()=>{ window.location = "/#/categories"}, 50);

        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <Fragment>
            <form className="  p-3 m-5" onSubmit={onSubmitForm}>

                <h4>New category</h4>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Please put the category"
                    required
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                />

                <div className="modal-footer">
                    <button type="submit" className="btn btn-success">Add</button>
                    <Link to='/categories' ><button className="btn btn-danger">Cancel</button></Link>
                </div>

            </form>
        </Fragment>
    )
}

export default InputCategories
