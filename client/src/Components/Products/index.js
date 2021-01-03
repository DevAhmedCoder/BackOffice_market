import React from 'react'
import ListProduct from './ListProduct'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'

const Products = () => {
    return (
        <div>
            <Link to='/products/input' ><button type="button" className="btn btn-primary mt-5">+  Add</button></Link>
            <ListProduct />
        </div>
    )
}

export default Products
