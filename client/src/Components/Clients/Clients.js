import React from 'react'
import ListClients from './ListClients'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'

const Clients = () => {
    return (
        <div>
            <Link to='/clients/input' ><button type="button" className="btn btn-primary mt-5">+  Add</button></Link>
            <ListClients />
            
        </div>
    )
}

export default Clients
