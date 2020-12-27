import React, { Fragment, useState, useEffect } from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

const EditCategories = (props) => {

    const category_id = props.match.params.id;
    const [category, setCategory] = useState('')
    
    // Get category
    const getCategory = async () => {

        try {
            const response = await fetch(`http://localhost:5000/categories/${category_id }`)
            .then( response=>response.json())
                .then(jsonData => setCategory(jsonData));
        }
        catch (err) {
            console.error(err.message)
        }
    }

    // update category
    const updateCategory = async (e) => {
        e.preventDefault();
        try {
            const category_name = category.category;
            await fetch(`http://localhost:5000/categories/${category_id }`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({category_name})
            });
            window.location = "/#/categories";
            
        }
        catch (err) { console.error(err.message); }
    }

    useEffect(() => {
        getCategory();
    }, [])
   
    return (
        <Fragment>
            <div className="mt-5 p-5">
                <h4 >Edit Category</h4>
                <div >
                    <input type="text"
                        className="form-control"
                        placeholder="Please put the category"
                        defaultValue={category.category}
                        onChange={e => setCategory({...category, category:e.target.value})}
                    />
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={e => updateCategory(e)}
                    >Save</button>

                    <Link to="/categories" ><button
                        type="button"
                        className="btn btn-danger"
                    >Close</button></Link>
                </div>
            </div>
        </Fragment>
    )
}
export default EditCategories
