import React from 'react';
import ListUsers from './ListUsers';
import { HashRouter as Switch, Link } from 'react-router-dom';

const Users = () => {
    return (
        <div>
            <Link to='/users/input' ><button type="button" className="btn btn-primary mt-5">+  Add</button></Link>
            <ListUsers />
            
        </div>
    )
}

export default Users
