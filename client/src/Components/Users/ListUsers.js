import React, { Fragment, useEffect, useState } from 'react';
import { HashRouter as Switch, Link } from 'react-router-dom';


const ListUsers = () => {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    // Show database 
    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/users");
            const jsonData = await response.json();
            setUsers(jsonData);
        }
        catch (err) {
            console.error(err.message);
            setError(err.message);
        }
    }
    // Delete user
    const deleteUser = async (id) => {
        try {
            await fetch(`http://localhost:5000/users/${id}`, {
                method: "DELETE"
            });

            getUsers();
        }
        catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {

        getUsers();
    }, [])

    return (
        <Fragment>

            <p>{error}</p>

            <table className="table  mt-5 text-center">
                <thead className="table-dark" >
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>email</th>
                        <th>age</th>
                        <th>Edition</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody className=" border-dark "  >
                    {users.map(user => (
                        <tr key={user.id} >
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>
                                <Link to={"/users/edit/".concat(user.id)}>
                                    <button className="btn btn-warning">Edit</button>
                                </Link>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >Delete
                                </button>

                                <div className="modal fade" id="exampleModal"
                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Delete user</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                Are you sure you want to delete this client ?
                                             </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => deleteUser(user.id)}
                                                    data-bs-dismiss="modal"
                                                >Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListUsers


