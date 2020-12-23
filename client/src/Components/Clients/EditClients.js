import React, { Fragment, useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

const EditClients = (props) => {

    const { hash } = props.location;

    const user_id = hash.substring(1);

    const [user, setuser] = useState("");

    // Show user

    // Show database 
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

    const [firstName, setfirstName] = useState(user.firstname);
    const [lastName, setlastName] = useState(user.lastname);
    const [email, setemail] = useState(user.email);
    const [age, setage] = useState(user.age);
    // console.log(user.firstname);

    // edit description 
    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const body = { firstName, lastName, email, age };
            await fetch(`http://localhost:5000/client/${user_id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/#/clients";
        }
        catch (err) { console.error(err.message); }
    }


    useEffect(() => {
        getUser()
    }, [])



    return (
        <Fragment>
            <div className="mt-2 p-5">

                <h4 className="text-center mb-5">Edit user</h4>

                <input type="text"
                    className="form-control mt-2"
                    placeholder="Please put the Firstname"
                    required
                    value={firstName}
                    onChange={e => setfirstName(e.target.value)}
                />
                <input type="text"
                    className="form-control mt-2"
                    placeholder="Please put the Lastname"
                    required
                    value={lastName}
                    onChange={e => setlastName(e.target.value)}
                />
                <input type="text"
                    className="form-control mt-2"
                    placeholder="Please put the Email address"
                    required
                    value={email}
                    onChange={e => setemail(e.target.value)}
                />
                <input type="text"
                    className="form-control mt-2"
                    placeholder="Please put the age"
                    required
                    value={age}
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
