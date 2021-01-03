import React from 'react'
import { HashRouter as Switch, Link } from 'react-router-dom';
import ListCategories from './ListCategories';

const Categories = () => {
    return (
        <div>
            <Link to='/categories/input' >
                <button type="button" className="btn btn-primary mt-5 mb-5">+  Add</button>
            </Link>
            <ListCategories />
        </div>
    )
}
export default Categories;
