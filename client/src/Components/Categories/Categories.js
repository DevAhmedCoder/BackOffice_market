import React from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import InputCategories from './inputCategories';
import ListCategories from './ListCategories';


const Categories = () => {
    return (
        <div>
            <Link to='/categories/input' ><button type="button" className="btn btn-primary mt-5">+  Add</button></Link>

            <ListCategories />
        </div>
    )
}

export default Categories
