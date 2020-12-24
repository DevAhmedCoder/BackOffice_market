import React, { Fragment, useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

const EditClients = (props) => {

    const user_id = props.match.params.id;

    const [user, setuser] = useState("");

    // Show user
    const getUser = async () => {
        try {
            const response = await fetch(`http://localhost:5000/users/${user_id}`);
            const jsonData = await response.json();
            setuser(jsonData[0]);

        }
        catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [age, setage] = useState("");



    // edit description 
    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const body = { firstName, lastName, email, age };
            await fetch(`http://localhost:5000/users/${user_id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/#/clients";
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
                        defaultValue={user.firstname}
                        onChange={e => setfirstName(e.target.value)}
                    />
                </div>
                <div className="mb-4"  >
                    <label>Lastname: </label>
                    <input type="text"
                        className="form-control mt-2"
                        placeholder="Please put the Lastname"
                        required
                        defaultValue={user.lastname}
                        onChange={e => setlastName(e.target.value)}
                    />
                </div>
                <div className="mb-4" >
                    <label>Email: </label>
                    <input type="email"
                        className="form-control mt-2"
                        placeholder="Please put the Email address"
                        required
                        defaultValue={user.email}
                        onChange={e => setemail(e.target.value)}
                    />
                </div>

                <label>Age: </label>
                <input type="number"
                    min="0"
                    className="form-control mt-2"
                    placeholder="Please put the age"
                    required
                    defaultValue={user.age}
                    onChange={e => setage(e.target.value)}
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
