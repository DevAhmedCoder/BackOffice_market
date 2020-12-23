import React, { Fragment, useState, useEffect } from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

const EditCategories = (props) => {

    const { hash } = props.location;

    const category_id = hash.substring(1);

    const [category, setCategory] = useState('')


 // Show category
 const getCategory = async () => {

    try {
        const response = await fetch(`http://localhost:5000/categories/${category_id }`);
        const jsonData = await response.json();
        setCategory(jsonData.category);
      
    }
    catch (err) {
        console.error(err.message)
    }
}


   
    // edit category
    const updateCategory = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:5000/categories/${category_id }`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({category})
            });
            setTimeout(()=>{ window.location = "/#/categories"}, 50);
            
        }
        catch (err) { console.error(err.message); }
    }

    const handleClose = () => {

        setCategory("");
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
                        value={category}
                        onChange={e => setCategory(e.target.value)}
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
                        onClick={handleClose}
                    >Close</button></Link>
                </div>

            </div>

        </Fragment>
    )
}

export default EditCategories
