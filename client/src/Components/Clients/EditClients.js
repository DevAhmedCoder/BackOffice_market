import React, { Fragment, useState, useEffect } from 'react';
import { HashRouter as Link } from 'react-router-dom';

const EditClients = (props) => {

    const user_id = props.match.params.id;

    const [user, setUser] = useState({});

    // Show user
    const getUser = async () => {
        try {
            const response = await fetch(`http://localhost:5000/users/${user_id}`)
           .then(response =>response.json()) 
                .then(jsonData => setUser(jsonData[0]));

        }
        catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    // edit description 
    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:5000/users/${user_id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(user)
            });
            window.location = "/#/users";
        }
        catch (err) { console.error(err.message); }
    }

    return (
        <Fragment>
            <div className="mt-2 p-5">
                <h4 className="text-center mb-5">Edit user</h4>

                <div className="mb-4" >
                    <label>FirstName:</label>
                    <input type="text"
                        className="form-control mt-2"
                        placeholder="Please put the Firstname"
                        required
                        defaultValue={user.first_name}
                        onChange={e => setUser({ ...user, first_name: e.target.value })}
                    />
                </div>
                <div className="mb-4"  >
                    <label>Lastname: </label>
                    <input type="text"
                        className="form-control mt-2"
                        placeholder="Please put the Lastname"
                        required
                        defaultValue={user.last_name}
                        onChange={e => setUser({ ...user, last_name: e.target.value})}
                    />
                </div>
                <div className="mb-4" >
                    <label>Email: </label>
                    <input type="email"
                        className="form-control mt-2"
                        placeholder="Please put the Email address"
                        required
                        defaultValue={user.email}
                        onChange={e => setUser({...user, email: e.target.value})}
                    />
                </div>

                <label>Age: </label>
                <input type="number"
                    min="0"
                    className="form-control mt-2"
                    placeholder="Please put the age"
                    required
                    defaultValue={user.age}
                    onChange={e => setUser({...user, age: e.target.value})}
                />

                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={e => updateUser(e)}
                    >Save</button>

                    <Link to="/clients" ><button
                        type="button"
                        className="btn btn-danger"
                    >Close</button></Link>
                </div>
            </div>
        </Fragment>
    )
}
export default EditClients
