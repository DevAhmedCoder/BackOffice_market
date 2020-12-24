import React, { Fragment, useEffect, useState } from 'react';
import { HashRouter as Switch, Link } from 'react-router-dom';
import EditClients from './EditClients';
// import Editclientuct from './Editclientuct';


const ListClients = () => {

    const [clients, setClients] = useState([])

    // Show database 
    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/users");
            const jsonData = await response.json();
            setClients(jsonData);
        }
        catch (err) {
            console.error(err.message)
        }
    }
    // Delete user
    const deleteUser = async (id) => {
        try {
            await fetch(`http://localhost:5000/users/${id}`, {
                method: "DELETE"
            });
            getUsers()
        }
        catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {

        setTimeout(() => getUsers(), 100);
    }, [])

    console.log(clients);
    return (
        <Fragment>
            <table className="table  mt-5 text-center">
                <thead className="table-dark" >
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>email</th>
                        <th>age</th>
                        <th>Edition</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody className=" border-dark "  >
                    {clients.map(client => (
                        <tr key={client.user_id} >
                            <td>{client.firstname}</td>
                            <td>{client.lastname}</td>
                            <td>{client.email}</td>
                            <td>{client.age}</td>
                            <td>
                                <Link to={"/clients/edit/#".concat(client.user_id)}>
                                    <button className="btn btn-warning">Edit</button>
                                </Link>
                            </td>
                            <td>
                                <button className="btn btn-danger"
                                    onClick={() => deleteUser(client.user_id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListClients
